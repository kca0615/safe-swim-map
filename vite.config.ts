import react from "@vitejs/plugin-react";
import { createLogger, defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3002,
    hmr: {
      port: 3002,
      clientPort: 3002,
    },
  },
  plugins: [react()],
  customLogger: createLogger("info", { prefix: "[coderpad]" }),

});
