'use server';
import qroq from 'groq';

import { sanityFetch } from '@/sanity/live';
import { ROCKS_QUERYResult } from '@/sanity/types';

import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_ORDER } from '../constants/constants';

export interface RockQueryFilters {
  sortOrder: string;
  page: number;
  pageSize: number;
}

const DEFAULT_FILTERS: RockQueryFilters = {
  sortOrder: DEFAULT_SORT_ORDER,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function getRocks(inputFilters: any): Promise<ROCKS_QUERYResult> {
  const filters = { ...DEFAULT_FILTERS, ...inputFilters };

  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;

  const QUERYTEMPLATE = qroq`*[
    _type == "rock"
  && defined(slug.current) 
  && count(*[_type == "specimen" && references(^._id)]) > 0
  ]
  | order(name ${filters.sortOrder})[${start}...${end}]
  {_id, name, slug, previewImage}`;

  const { data: rocks } = await sanityFetch({
    query: QUERYTEMPLATE,
  });
  return rocks;
}
