import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './',
  resolve: {
    alias: [
      { find: /^three$/, replacement: 'three/webgpu' },
      { find: '@', replacement: path.resolve(__dirname, './src') }
    ]
  },
  server: { host: '0.0.0.0', port: 3000 },
  preview: { host: '0.0.0.0', port: 3000 },
  build: {
    target: 'esnext',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: { manualChunks: { three: ['three'], bvh: ['three-mesh-bvh'] } }
    }
  }
});
