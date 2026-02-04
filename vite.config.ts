import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base path configuration
  // Vercel: use '/' (default)
  // GitLab Pages: use '/ai-lab/Zoom_Docs_2_0/' when CI is true
  // base: process.env.VERCEL ? '/' : (process.env.CI ? '/ai-lab/Zoom_Docs_2_0/' : '/'),
  base: '/',
  server: {
    proxy: {
      '/llm-api': {
        target: 'https://llm-gateway-zmdev-aws-us-east-1.ai.zoomdev.us',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/llm-api/, ''),
        secure: true,
      },
    },
  },
})

