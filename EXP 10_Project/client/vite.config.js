// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// REMOVE: import tailwindcss from 'tailwindcss';
// REMOVE: import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  // ⬅️ REMOVE THE ENTIRE 'css' BLOCK 
});