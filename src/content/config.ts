// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define a schema for each collection you'd like to validate.
const blog = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string().max(60, { message: "Title too long!" }),
    description: z.string().max(200, { message: "Description too long!" }),
    date: z.date(),
    author: z.enum([
      "Munatsi Ziumbe",
      "Sophia Imogen Ziumbe",
      "Kundai Ziumbe ",
    ]),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog,
};
