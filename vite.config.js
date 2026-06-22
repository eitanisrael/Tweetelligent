import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/Tweetelligent/',

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
            id: '/Tweetelligent/',
            name: 'Tweetelligent',
            short_name: 'Tweetelligent',
            display: 'standalone',
            start_url: '/Tweetelligent/',
            background_color: '#ffffff',
            theme_color: '#000000',

        screenshots: [
          {
            src: 'screenshot1.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: 'screenshot2.png',
            sizes: '720x1280',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ],

        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})