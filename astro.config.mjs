import { defineConfig } from "astro/config";
import node from '@astrojs/node';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import db from "@astrojs/db";
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(), 
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react(), db()],
});