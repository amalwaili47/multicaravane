import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  /* The analytics brief names the measurement ID NEXT_PUBLIC_GA_ID. Vite only
     exposes variables matching its envPrefix to client code, so the prefix is
     widened rather than the variable renamed. */
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
})
