import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls to Spring Boot during development
    // This means /api/* → http://localhost:8080/api/*
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Code splitting for better performance
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
