import { defineLive } from 'next-sanity';

import { client } from '@/sanity/client';

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: '2025-03-11' }),
});
