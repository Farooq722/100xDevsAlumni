import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@repo/zustand": path.resolve(__dirname, "../../packages/zustand/src"),
      "@repo/tailwind-config": path.resolve(
        __dirname,
        "../../packages/tailwind-config/src",
      ),
    },
  },
  base: "./",
  build: {
    outDir: "dist",
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@tabler/icons-react")) {
            return "tabler-icons";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["@tabler/icons-react"],
  },
});
