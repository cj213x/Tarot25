import { NextResponse } from 'next/server'

const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions'
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY

export async function POST(request: Request) {
  console.log('API route called')
  try {
    const body = await request.json()
    console.log('Request body:', body)
    
    const { question, birthday, birthTime, birthLocation } = body

    if (!TOGETHER_API_KEY) {
      console.error('Together API key not found')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    console.log('Sending request to Together.ai...')
    let lastError: any
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Attempt ${attempt} of ${MAX_RETRIES}...`)
        const response = await fetch(TOGETHER_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${TOGETHER_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            messages: [
              {
                role: 'system',
                content: "You are an experienced tarot reader. For each reading, return a valid JSON object with exactly 3 cards (past, present, future). Each card must have: name (the cards name), position (Past/Present/Future), meaning (short interpretation), description (detailed interpretation), and imageUrl (leave as empty string). Include an overall interpretation and practical advice. Format as valid JSON only."
              },
              {
                role: 'user',
                content: `Question: "${question}"
Birth details: ${birthday} at ${birthTime || 'unknown time'} in ${birthLocation}

Provide a tarot reading as a JSON object with this exact structure:
{
  "cards": [
    {
      "position": "Past",
      "name": "[card name]",
      "meaning": "[short interpretation]",
      "description": "[detailed interpretation]",
      "imageUrl": ""
    },
    {
      "position": "Present",
      "name": "[card name]",
      "meaning": "[short interpretation]",
      "description": "[detailed interpretation]",
      "imageUrl": ""
    },
    {
      "position": "Future",
      "name": "[card name]",
      "meaning": "[short interpretation]",
      "description": "[detailed interpretation]",
      "imageUrl": ""
    }
  ],
  "interpretation": "[overall reading interpretation]",
  "advice": "[practical advice]"
}`
              }
            ],
            max_tokens: 1000,
            temperature: 0.7,
            top_p: 0.95
          })
        })

        const responseText = await response.text()
        console.log(`Attempt ${attempt} response:`, responseText)

        if (!response.ok) {
          lastError = new Error(`Together.ai API error: ${response.status} ${response.statusText}`)
          if (response.status === 503 && attempt < MAX_RETRIES) {
            console.log(`Retrying in ${RETRY_DELAY}ms...`)
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
            continue
          }
          throw lastError
        }

        try {
          const content = JSON.parse(responseText)
          const result = content.choices?.[0]?.message?.content
          if (!result) {
            throw new Error('Invalid response format from Together.ai')
          }

          const reading = JSON.parse(result)
          if (!reading.cards || !Array.isArray(reading.cards) || reading.cards.length !== 3 || !reading.interpretation || !reading.advice) {
            throw new Error('Invalid reading format')
          }

          return NextResponse.json(reading)
        } catch (error) {
          lastError = error
          if (attempt < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
            continue
          }
          throw error
        }
      } catch (error) {
        lastError = error
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
          continue
        }
      }
    }
    
    return NextResponse.json({ 
      error: lastError?.message || 'Service unavailable after retries',
      details: lastError
    }, { status: 500 })
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
