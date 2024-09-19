import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000', // URL do seu backend
        changeOrigin: true,
        ws: true, // Habilita WebSocket
      },
    },
  },
});
