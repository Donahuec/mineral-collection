'use server';
import qroq from 'groq';

import { sanityFetch } from '@/sanity/live';
import { MINERALS_QUERYResult } from '@/sanity/types';

export interface MineralQueryFilters {
  sortOrder: string;
  page: number;
  pageSize: number;
}

const DEFAULT_FILTERS: MineralQueryFilters = {
  sortOrder: 'asc',
  page: 1,
  pageSize: 12,
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function getMinerals(
  inputFilters: any
): Promise<MINERALS_QUERYResult> {
  const filters = { ...DEFAULT_FILTERS, ...inputFilters };

  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;

  const QUERYTEMPLATE = qroq`*[
    _type == "mineral"
    && defined(slug.current) 
    && count(*[_type == "specimen" && references(^._id)]) > 0
  ]
  | order(name ${filters.sortOrder})[${start}...${end}]
  {_id, name, slug, previewImage}`;

  const { data: minerals } = await sanityFetch({
    query: QUERYTEMPLATE,
  });
  return minerals;
}
