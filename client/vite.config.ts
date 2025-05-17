import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseInt(env.VITE_FRONTEND_PORT) || 5173;

  return {
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      port,
      host: true,
    },
  };
});
