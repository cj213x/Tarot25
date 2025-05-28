'use client'

import { useState } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import { HoroscopeResult } from './HoroscopeResult'

interface HoroscopeFormData {
  question: string
  useProfileData: boolean
  birthday?: string
  birthTime?: string
  birthLocation?: string
}

export function HoroscopeForm() {
  const { user, loading } = useAuth()
  const [formData, setFormData] = useState<HoroscopeFormData>({
    question: '',
    useProfileData: true
  })
  const [error, setError] = useState('')
  const [showResult, setShowResult] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const [reading, setReading] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsGenerating(true)

    try {
      const metadata = user?.user_metadata
      const dataToSubmit = {
        question: formData.question,
        birthday: formData.useProfileData ? metadata?.birthday : formData.birthday,
        birthTime: formData.useProfileData ? metadata?.birthTime : formData.birthTime,
        birthLocation: formData.useProfileData ? metadata?.birthLocation : formData.birthLocation
      }

      console.log('Sending request with data:', dataToSubmit)

      const response = await fetch('/api/tarot/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit)
      })

      const data = await response.json()
      console.log('Response from API:', data)
      
      if (!response.ok) {
        console.error('API error:', data)
        throw new Error(data.error || 'Failed to generate reading')
      }

      // For testing - log the successful response
      console.log('Successful response:', data)
      setReading(data)
      setShowResult(true)
    } catch (err) {
      console.error('Horoscope request error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (showResult && reading) {
    return (
      <div>
        <HoroscopeResult question={formData.question} reading={reading} />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
          What would you like to know?
        </label>
        <textarea
          id="question"
          name="question"
          required
          value={formData.question}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Enter your question here..."
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="useProfileData"
          name="useProfileData"
          checked={formData.useProfileData}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="useProfileData" className="ml-2 block text-sm text-gray-700">
          Use my profile data
        </label>
      </div>

      {!formData.useProfileData && (
        <div className="space-y-4">
          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-2">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              required={!formData.useProfileData}
              value={formData.birthday || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="birthTime" className="block text-sm font-medium text-gray-700 mb-2">
              Birth Time (if known)
            </label>
            <input
              type="time"
              id="birthTime"
              name="birthTime"
              value={formData.birthTime || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="birthLocation" className="block text-sm font-medium text-gray-700 mb-2">
              Birth Location
            </label>
            <input
              type="text"
              id="birthLocation"
              name="birthLocation"
              required={!formData.useProfileData}
              value={formData.birthLocation || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g., Los Angeles, CA, USA"
            />
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isGenerating ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Generating Reading...
            </>
          ) : (
            'Get Your Reading'
          )}
        </button>
      </div>
    </form>
  )
}
