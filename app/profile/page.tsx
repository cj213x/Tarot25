'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface UserProfile {
  fullName: string
  birthday: string
  birthTime?: string
  birthLocation: string
  sex: 'male' | 'female' | 'other'
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserProfile | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        
        // Get current session and user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError) throw userError

        if (!user) {
          router.push('/auth/login')
          return
        }

        // Get profile data from user metadata
        const metadata = user.user_metadata as UserProfile
        const profileData: UserProfile = {
          fullName: metadata?.fullName || '',
          birthday: metadata?.birthday || '',
          birthTime: metadata?.birthTime || '',
          birthLocation: metadata?.birthLocation || '',
          sex: metadata?.sex || 'other'
        }
        
        setProfile(profileData)
        setFormData(profileData)
      } catch (error) {
        console.error('Profile error:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({
        data: formData
      })

      if (updateError) throw updateError

      setProfile(formData)
      setIsEditing(false)
    } catch (err) {
      console.error('Profile update error:', err)
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // If not logged in, redirect will happen automatically via middleware
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile</h1>
            
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData?.fullName || ''}
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
                    value={formData?.birthday || ''}
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
                    value={formData?.birthTime || ''}
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
                    value={formData?.birthLocation || ''}
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
                    value={formData?.sex || 'other'}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{profile?.fullName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                      <dd className="mt-1 text-sm text-gray-900">{profile?.birthday}</dd>
                    </div>
                    {profile?.birthTime && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Birth Time</dt>
                        <dd className="mt-1 text-sm text-gray-900">{profile.birthTime}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Birth Location</dt>
                      <dd className="mt-1 text-sm text-gray-900">{profile?.birthLocation}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Sex</dt>
                      <dd className="mt-1 text-sm text-gray-900">{profile?.sex}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
