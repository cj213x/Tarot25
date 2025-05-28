/app
  /api
    /auth
      - login.ts
      - signup.ts
    /horoscope
      - generate.ts
    /user
      - profile.ts
  /components
    /layout
      - Header.tsx
      - Footer.tsx
      - Sidebar.tsx
    /horoscope
      - HoroscopeForm.tsx
      - HoroscopeResult.tsx
    /common
      - Loader.tsx
      - Button.tsx
  /lib
    - supabaseClient.ts
    - llamaApi.ts
  /store
    - userStore.ts
    - horoscopeStore.ts
  /utils
    - validators.ts
    - formatDate.ts
  /styles
    - globals.css
    - theme.css
  /types
    - index.d.ts
  /hooks
    - useAuth.ts
    - useHoroscope.ts
  - page.tsx (main entry page)
  - layout.tsx (app-wide layout)
  - error.tsx (global error boundary)

.env.local
next.config.js
tailwind.config.js
package.json
README.md
