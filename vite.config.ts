// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/tektonikaaa/',   // например "/tectonika-react/"
  plugins: [react()],
})