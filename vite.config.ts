import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
  plugins: [
    Icons({ compiler: 'jsx', jsx: 'react' }),
  ],
})
