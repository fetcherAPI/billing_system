import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import path from 'path';
import tsConfigPaths from 'vite-tsconfig-paths';
import FullReload from 'vite-plugin-full-reload';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    base: '/billing',
    preview: {
        port: 3015,
        strictPort: false,
    },
    server: {
        port: 3015,
        strictPort: false,
        host: true,
        hmr: true,
    },
    define: {
        'process.env': {},
    },
    plugins: [
        react(),
        replace({
            'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
            'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
        }),
        tsConfigPaths(),
        FullReload(['src/**/*']),
    ],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
});
