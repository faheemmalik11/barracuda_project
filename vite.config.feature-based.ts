import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Updated Vite config for feature-based architecture
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
      // Existing alias
      "@": path.resolve(__dirname, "./src"),
      
      // New aliases for feature-based structure
      "@features": path.resolve(__dirname, "./src/features"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      
      // Feature-specific aliases (optional, for convenience)
      "@payments": path.resolve(__dirname, "./src/features/payments"),
      "@merchants": path.resolve(__dirname, "./src/features/merchants"),
      "@customers": path.resolve(__dirname, "./src/features/customers"),
      "@orders": path.resolve(__dirname, "./src/features/orders"),
      "@refunds": path.resolve(__dirname, "./src/features/refunds"),
      "@disputes": path.resolve(__dirname, "./src/features/disputes"),
      "@billing": path.resolve(__dirname, "./src/features/billing"),
      "@auth": path.resolve(__dirname, "./src/features/auth"),
    },
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Enhanced manual chunks for feature-based structure
        manualChunks: {
          // Core vendor libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          
          // UI framework
          ui: [
            '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 
            '@radix-ui/react-select', '@radix-ui/react-switch', 
            '@radix-ui/react-tooltip', '@radix-ui/react-tabs'
          ],
          
          // Shared utilities
          shared: ['date-fns', 'clsx', 'tailwind-merge', 'zod'],
          
          // State & forms
          state: ['zustand', 'react-hook-form', '@hookform/resolvers'],
          
          // Feature chunks (lazy loaded)
          'feature-payments': ['./src/features/payments'],
          'feature-merchants': ['./src/features/merchants'],
          'feature-customers': ['./src/features/customers'],
          'feature-billing': ['./src/features/billing'],
          'feature-orders': ['./src/features/orders'],
          'feature-refunds': ['./src/features/refunds'],
          'feature-disputes': ['./src/features/disputes'],
          'feature-settlements': ['./src/features/settlements'],
          'feature-products': ['./src/features/products'],
          'feature-risk': ['./src/features/risk'],
          'feature-analytics': ['./src/features/analytics'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
    emptyOutDir: true,
  }
})