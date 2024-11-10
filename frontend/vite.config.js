import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://www.nseindia.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        secure: true, // Ensure secure HTTPS requests
        cookieDomainRewrite: "localhost", // Rewrites cookies to be compatible with localhost
      },
    },
  },
});
