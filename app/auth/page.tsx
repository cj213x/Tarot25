'use client'

import { useState } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignupForm } from '@/components/auth/SignupForm'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <div className="mt-2 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

        {mode === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  )
}
