import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext", // For modern browsers
    minify: "esbuild", // Faster minification
    sourcemap: false, // Avoid large source maps
    chunkSizeWarningLimit: 500, // Show warning if any chunk exceeds this
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into a separate vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      // Add only the exact packages you use
      "@tabler/icons-react",
    ],
  },
});
