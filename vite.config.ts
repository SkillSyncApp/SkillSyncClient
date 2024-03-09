import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  //TODO - remove from github
  server: {
    port: 443,
    https: {
      key: fs.readFileSync('./client-key.pem'),
      cert: fs.readFileSync('./client-cert.pem'),
    },
  },
  plugins: [react()],
})