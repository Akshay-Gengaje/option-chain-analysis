import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // This imports the plugin for React support

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.proto'], // Tell Vite to treat .proto files as assets
});
