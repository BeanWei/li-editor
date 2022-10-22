import { defineConfig } from 'vite'
import UnoCss from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    },
  },
  plugins: [
    UnoCss({
      mode: 'per-module',
      include: [/\.ts$/],
      presets: [
        presetAttributify(),
        presetUno()
      ],
    }),
  ]
})
