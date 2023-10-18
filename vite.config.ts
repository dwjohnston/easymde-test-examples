import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.DEBUG_PRINT_LIMIT": 10000
  }, 
  test: {
    globals: true,
    setupFiles: 'src/setupTests.js',
    environment: 'jsdom',
  },
  
})
