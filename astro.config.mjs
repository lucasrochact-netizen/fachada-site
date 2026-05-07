// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Permite acesso via tunnel (cloudflared/ngrok) e qualquer host.
      // OK pra dev local — não é exposto em prod (build é estático).
      allowedHosts: true
    }
  }
});
