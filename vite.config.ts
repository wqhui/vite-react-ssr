import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
  },
  css: {
    //css模块化 文件以.module.[css|less|scss]结尾
    modules: {
      generateScopedName: '[local]',
    },
    //预编译支持less
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [postcssPresetEnv],
    },
  },
})
