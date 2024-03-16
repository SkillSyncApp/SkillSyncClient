import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import fs from 'fs';

export default defineConfig({
  // server: {
  //   port: 443,
  //   https: {
  //     key: fs.readFileSync('../client-key.pem'),
  //     cert: fs.readFileSync('../client-cert.pem'),
  //   },
  // },
  base: "./public/client",
  plugins: [react()],
})