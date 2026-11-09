import { defineCollection, z } from 'astro:content';

const preprints = defineCollection({
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    id: z.string(),
    pdf: z.string(),
    abstract: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

export const collections = { preprints };
