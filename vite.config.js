import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3004,
    open: false,
    strictPort: true
  },
  preview: {
    port: 3004
  }
})
