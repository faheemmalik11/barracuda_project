import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/warehouse': {
        target: process.env.VITE_WAREHOUSE_API_TARGET || 'http://localhost:5970',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/warehouse/, ''),
      },
      '/merchants/organizations': {
        target: process.env.VITE_MERCHANTS_API_TARGET || 'http://localhost:5902',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/merchants/, ''),
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI component library
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          // Heavy third-party libraries
          animations: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
})
