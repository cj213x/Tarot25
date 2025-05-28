'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Card {
  name: string
  position: string
  meaning: string
  description: string
  imageUrl: string
}

interface HoroscopeResultProps {
  question: string
  reading: {
    cards: Card[]
    interpretation: string
    advice: string
  }
}

// Dummy data for now
const dummyReading = {
  cards: [
    {
      name: 'The Fool',
      position: 'Past',
      meaning: 'New beginnings, innocence, spontaneity',
      description: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
      imageUrl: '/cards/fool.jpg' // We'll add actual images later
    },
    {
      name: 'The High Priestess',
      position: 'Present',
      meaning: 'Intuition, mystery, spirituality',
      description: 'The High Priestess represents secrets, mystery, intuition, wisdom, making the impossible possible, and believing in your inner voice.',
      imageUrl: '/cards/high-priestess.jpg'
    },
    {
      name: 'The Star',
      position: 'Future',
      meaning: 'Hope, inspiration, generosity',
      description: 'The Star represents hope, faith, purpose, renewal, spirituality and being inspired. It suggests a refreshing new perspective and a sense that help is available.',
      imageUrl: '/cards/star.jpg'
    }
  ],
  interpretation: 'Your journey begins with a leap of faith, guided by pure intentions and openness to new experiences. Currently, you\'re in a phase of deep intuition and inner knowing - trust your gut feelings. The future holds bright promise, with inspiration and hope lighting your path forward.',
  advice: 'Trust in your journey and stay open to guidance from your intuition. The universe is supporting your path forward, and better times are ahead. Keep faith in yourself and maintain hope for the future.'
}

export function HoroscopeResult({ question = "What does my future hold?", reading }: { question?: string, reading: { cards: Card[], interpretation: string, advice: string } }) {
  const [activeCard, setActiveCard] = useState<Card | null>(null)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow space-y-8">
      {/* Question Section */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Your Question</h2>
        <p className="mt-2 text-lg text-gray-600 italic">&quot;{question}&quot;</p>
      </div>

      {/* Cards Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reading.cards.map((card, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                activeCard?.name === card.name ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setActiveCard(activeCard?.name === card.name ? null : card)}
            >
              <div className="aspect-[2/3] relative bg-gray-200 rounded-lg mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  [Card Image]
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">{card.name}</h4>
              <p className="text-sm text-gray-600">{card.position}</p>
              <p className="text-sm text-indigo-600 mt-1">{card.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Card Details */}
      {activeCard && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mt-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{activeCard.name}</h4>
          <p className="text-gray-600">{activeCard.description}</p>
        </div>
      )}

      {/* Interpretation Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Interpretation</h3>
          <p className="text-gray-600 leading-relaxed">{reading.interpretation}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Advice</h3>
          <p className="text-gray-600 leading-relaxed">{reading.advice}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
          onClick={() => window.print()}
        >
          Save Reading
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium"
          onClick={() => {/* TODO: New reading */}}
        >
          New Reading
        </button>
      </div>
    </div>
  )
}
