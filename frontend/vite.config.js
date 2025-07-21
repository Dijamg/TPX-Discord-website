import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
  plugins: [
    tailwindcss(),
  ],
})