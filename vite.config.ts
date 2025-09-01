import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/frankydraw/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'FrankyDraw',
        short_name: 'FrankyDraw',
        description: 'Simple drawing app for kids',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'fullscreen',
        orientation: 'any'
      }
    })
  ]
})