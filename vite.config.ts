import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    base: "https://node03.cs.colman.ac.il/public/client",
    plugins: [react()],
    define: {
      "__APP_OPENAI_API_KEY__": `"${process.env.VITE_REACT_APP_OPENAI_API_KEY}"`,
      "__APP_API_URL__": `"${process.env.VITE_REACT_APP_API_URL}"`,
      "__APP_GOOGLE_CLIENT_ID__": `"${process.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}"`
    }
  })
}