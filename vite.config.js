import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/components/Pages"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@Users": path.resolve(__dirname, "src/components/Pages/Users/Users.jsx"),
      "@Todos": path.resolve(__dirname, "src/components/Pages/Todos/Todos.jsx"),
      "@LoginPage": path.resolve(
        __dirname,
        "src/components/Pages/LoginPage/LoginPage.jsx"
      ),
      "@SingleProduct": path.resolve(
        __dirname,
        "src/components/Pages/Single-Product/SingleProduct.jsx"
      ),
    },
  },
});
