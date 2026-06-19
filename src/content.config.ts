import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    // Core
    title: z.string(),
    subtitle: z.string().optional(),
    // SEO: keep description 120–160 chars for ideal SERP snippet
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['leadership', 'mindset']).default('leadership'),
    draft: z.boolean().default(false),

    // SEO controls
    // canonicalUrl: ONLY set this if the canonical lives off-site (rare).
    // Leave empty -> the post self-canonicalizes to kacperwerema.com (preferred for domain authority).
    canonicalUrl: z.string().url().optional(),
    // If you ALSO publish on Substack, put the link here. It renders a
    // "also on Substack" note but does NOT change the canonical.
    crossPostedUrl: z.string().url().optional(),
    // Per-post social share image (1200x630). Falls back to site default.
    ogImage: z.string().optional(),
    // Override the auto keyword list if needed.
    keywords: z.array(z.string()).optional(),
  }),
});

export const collections = { writing };
