import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/ㄴ
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080', // 백엔드 서버 주소로 대체
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/socket.io': {
                target: 'ws://localhost:8080',
                ws: true,
            },
        },
    },
});
