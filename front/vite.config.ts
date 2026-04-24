import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Uni from '@uni-helper/plugin-uni'

import Components from '@uni-helper/vite-plugin-uni-components'
import { uViewProResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    // https://uni-helper.js.org/plugin-uni
    Components({
      resolvers: [ uViewProResolver() ]
    }),
    Uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 将 uview-pro 主题变量注入每一个 scss 文件编译过程
        additionalData: `@import "uview-pro/theme.scss";`
      }
    }
  }
})


