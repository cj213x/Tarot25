🟩 Setup & Basic Environment
✅ Task 1
Title: Initialize Next.js 14 app
Start: Create project folder, run npx create-next-app@latest with TypeScript, Tailwind CSS.
End: A working Next.js app with Tailwind CSS, no extra logic.

✅ Task 2
Title: Initialize Git repo
Start: Run git init in project folder.
End: Local git repo with initial commit.

✅ Task 3
Title: Set up Supabase project & connect client
Start: Create Supabase project in dashboard, get project URL & anon key.
End: Save keys to .env.local and test initializing Supabase in lib/supabaseClient.ts.

✅ Task 4
Title: Create basic /app/layout.tsx
Start: Build out header/footer layout.
End: Layout renders on all pages with dummy content.

✅ Task 5
Title: Implement globals.css with Tailwind base
Start: Edit globals.css to include Tailwind @base, @components, @utilities.
End: Global styling renders on pages.

🟨 Auth & User Management
✅ Task 6
Title: Build Supabase Auth sign-up API (/api/auth/signup.ts)
Start: Create handler that signs up user with email & password via Supabase.
End: Test by sending a POST request with dummy credentials.

✅ Task 7
Title: Build Supabase Auth login API (/api/auth/login.ts)
Start: Create handler that logs in user and returns Supabase session.
End: Test by sending POST with correct credentials.

✅ Task 8
Title: Create useAuth.ts hook
Start: Hook uses Supabase client to track session (listen to onAuthStateChange).
End: Logs session to console on login/signup.

✅ Task 9
Title: Create simple login form in components/auth/LoginForm.tsx
Start: Basic email/password fields and submit button.
End: Calls /api/auth/login.ts and logs result.

✅ Task 10
Title: Create simple signup form in components/auth/SignupForm.tsx
Start: Basic email/password fields and submit button.
End: Calls /api/auth/signup.ts and logs result.

🟩 User Profile
✅ Task 11
Title: Create /api/user/profile.ts GET endpoint
Start: Returns user profile (birthdate, location) from Supabase DB.
End: Test via API call; returns dummy data for now.

✅ Task 12
Title: Add user profile table in Supabase
Start: Create profiles table: id, user_id, birthdate, location.
End: Table exists and connected to Supabase.

✅ Task 13
Title: Add profile update endpoint in /api/user/profile.ts (POST)
Start: Accepts birthdate/location and updates profile.
End: Test via API call to update dummy data.

✅ Task 14
Title: Create userStore.ts in /store
Start: Store user session & profile data (empty state for now).
End: Exports reactive state (e.g., using Zustand).

🟧 Horoscope Input & Output
✅ Task 15
Title: Create HoroscopeForm.tsx
Start: Form for birthdate, location, and specific question.
End: Captures data & logs it to console.

✅ Task 16
Title: Create HoroscopeResult.tsx
Start: Placeholder component that displays result data.
End: Static dummy result data for now.

✅ Task 17
Title: Create horoscopeStore.ts
Start: State to hold form data & result.
End: Exports reactive state.

✅ Task 18
Title: Create /api/horoscope/generate.ts endpoint
Start: Accepts birthdate, location, question; returns dummy horoscope JSON.
End: Test via API call.

✅ Task 19
Title: Create useHoroscope.ts hook
Start: Uses store + provides methods to call /api/horoscope/generate.ts.
End: Logs generated horoscope to console.

✅ Task 20
Title: Connect form to useHoroscope
Start: On form submit, call generateHoroscope and update store.
End: Dummy result displayed in HoroscopeResult.tsx.

🟩 Llama AI Integration
✅ Task 21
Title: Create llamaApi.ts in /lib
Start: Basic function generateHoroscopeData with dummy Llama AI request.
End: Logs to console that it’s calling Llama AI.

✅ Task 22
Title: Connect /api/horoscope/generate.ts to llamaApi.ts
Start: Instead of dummy data, use real Llama API call (or mock call).
End: Return generated horoscope JSON to frontend.

✅ Task 23
Title: Format Llama response for display
Start: Map Llama’s response into structured JSON (Tarot, I Ching, Saju).
End: HoroscopeResult.tsx displays real data.

🟨 Testing & Deployment
✅ Task 24
Title: Test entire flow: signup, login, profile, generate horoscope
Start: Use Postman or browser to manually test each endpoint & form.
End: User can log in, update profile, and generate personalized reading.

✅ Task 25
Title: Deploy to Vercel
Start: Connect GitHub repo to Vercel, set env vars (NEXT_PUBLIC_SUPABASE_URL, etc.).
End: Live site with working Supabase + Llama integration.

🎯 Summary of Tasks (Checklist Format)
 Next.js app setup

 Supabase Auth endpoints (signup, login)

 User profile API

 User store & hooks

 Horoscope input form

 Horoscope store & hook

 Llama API integration

 Frontend display

 Full end-to-end test

 Deployment