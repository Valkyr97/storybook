import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: 'janymaro-storybook-components',
            fileName: "index"
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    }
})
