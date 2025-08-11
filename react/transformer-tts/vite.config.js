import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 为 Hugging Face 模型文件设置代理
      '/hf': {
        target: 'https://huggingface.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hf/, ''),
        secure: true
      },
      // 为模型文件的特定路径设置代理
      '/Xenova': {
        target: 'https://huggingface.co',
        changeOrigin: true,
        secure: true
      }
    }
  }
})