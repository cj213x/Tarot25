'use client'

import { useState } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import { createClient } from '@/lib/supabase'

interface SignupFormData {
  fullName: string
  birthday: string
  birthTime?: string
  birthLocation: string
  email: string
  password: string
  sex: 'male' | 'female' | 'other'
}

export function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    birthday: '',
    birthTime: '',
    birthLocation: '',
    email: '',
    password: '',
    sex: 'other'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()

      // First, sign up the user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullName: formData.fullName,
            birthday: formData.birthday,
            birthTime: formData.birthTime,
            birthLocation: formData.birthLocation,
            sex: formData.sex
          }
        }
      })

      if (signUpError) throw signUpError
      if (!user) throw new Error('Signup failed - no user returned')

      // Show success message
      alert('Please check your email to confirm your account')
    } catch (err) {
      console.error('Signup error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    return <p>You are already logged in.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
          Birthday
        </label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          required
          value={formData.birthday}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="birthTime" className="block text-sm font-medium text-gray-700">
          Birth Time (optional)
        </label>
        <input
          id="birthTime"
          name="birthTime"
          type="time"
          value={formData.birthTime}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="birthLocation" className="block text-sm font-medium text-gray-700">
          Birth Location
        </label>
        <input
          id="birthLocation"
          name="birthLocation"
          type="text"
          required
          placeholder="City, Country"
          value={formData.birthLocation}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
          Sex
        </label>
        <select
          id="sex"
          name="sex"
          required
          value={formData.sex}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  )
}
