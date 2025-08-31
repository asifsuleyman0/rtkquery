import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Tailwind artıq require() vasitəsi ilə çağırılacaq PostCSS pluginində işləyir
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
});
