import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteSvgIcons from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1212,
  },
  plugins: [
    vue(),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
