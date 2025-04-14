import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/TrabajoFinal_Python/',

  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // Asegúrate de que este archivo exista
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    tailwindcss(),
  ],
  
})
