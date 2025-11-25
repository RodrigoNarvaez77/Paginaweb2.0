import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  test: {
    environment: "jsdom", // Para simular el DOM en Node
    globals: true, // Para usar funciones como describe, it, expect sin importar
    setupFiles: "./src/setupTests.js", // Archivo para cargar jest-dom
  },
});
