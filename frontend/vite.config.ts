import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = Number(env.VITE_FRONTEND_PORT) || 8080;
  // console.log("PORT", PORT);
  return {
    plugins: [react()],
    server: {
      host: true,
      port: PORT,
    },
    resolve: {
      alias: {
        src: "/src",
      },
    },
  };
});
