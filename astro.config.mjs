import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://munatsi.ziumbe.com/",
  integrations: [tailwind(), mdx(), icon()],
  vite: {
    ssr: {
      external: ["svgo"]
    }
  }
});