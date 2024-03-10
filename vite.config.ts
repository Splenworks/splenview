import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"
import { CommitHashPlugin } from "vite-plugin-commit-hash"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    CommitHashPlugin({ noPrefix: false, noVirtual: false }),
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
