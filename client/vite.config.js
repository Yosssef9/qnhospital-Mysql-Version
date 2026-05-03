import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ده يخلي السيرفر يستمع لكل الـ IPs مش بس localhost
    port: 5173, // البورت اللي انت عايزه، ممكن تغيره
    allowedHosts: ["https://h6cntfzw-1337.euw.devtunnels.ms/"],
  },
});
