import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3004,
    open: false,
    strictPort: true,
    watch: {
      // Watch ux-zion-library for changes
      ignored: ['!**/ux-zion-library/**']
    }
  },
  preview: {
    port: 3004
  },
  optimizeDeps: {
    // Force Vite to always use fresh ux-zion-library source files
    exclude: ['ux-zion-library']
  }
})
