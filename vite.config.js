import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync } from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: "copy-assets",
      writeBundle() {
        // assets/img 폴더를 dist/img로 복사
        try {
          mkdirSync("dist/img", { recursive: true });
          copyFileSync("src/assets/img/profile.png", "dist/img/profile.png");
          copyFileSync("src/assets/img/gobooke.png", "dist/img/gobooke.png");
        } catch (error) {
          console.log("Assets already copied or not found");
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      external: ["webgl-fluid"],
    },
  },
});
