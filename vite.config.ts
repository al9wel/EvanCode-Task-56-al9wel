import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined
          }
          if (
            id.includes("recharts") ||
            id.includes("d3-") ||
            id.includes("victory-vendor")
          ) {
            return "charts-vendor"
          }
          if (id.includes("@tanstack")) {
            return "tanstack-vendor"
          }
          if (id.includes("zod") || id.includes("react-hook-form") || id.includes("@hookform")) {
            return "forms-vendor"
          }
          if (id.includes("motion")) {
            return "motion-vendor"
          }
          if (id.includes("radix-ui") || id.includes("@radix-ui") || id.includes("sonner")) {
            return "ui-vendor"
          }
          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("node_modules/react/") ||
            id.includes("node_modules\\react\\")
          ) {
            return "react-vendor"
          }
          return undefined
        },
      },
    },
  },
})
