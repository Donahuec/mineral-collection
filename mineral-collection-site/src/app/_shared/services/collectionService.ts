'use server';
import qroq from 'groq';

import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_ORDER,
} from '@/app/_shared/constants/constants';
import { sanityFetch } from '@/sanity/live';
import { COLLECTIONS_QUERYResult } from '@/sanity/types';

export interface CollectionQueryFilters {
  sortOrder: string;
  page: number;
  pageSize: number;
  search?: string;
}

const DEFAULT_FILTERS: CollectionQueryFilters = {
  sortOrder: DEFAULT_SORT_ORDER,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function getCollections(
  inputFilters: any
): Promise<COLLECTIONS_QUERYResult> {
  const filters = { ...DEFAULT_FILTERS, ...inputFilters };

  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;

  const QUERYTEMPLATE = qroq`
  *[
    _type == "collection"
    && defined(slug.current)
    ${filters.search ? `&& name match "*${filters.search.toLowerCase()}*"` : ''}
  ]
  | order(name ${filters.sortOrder})[${start}...${end}]
  {_id, name, slug, previewImage}`;

  const { data: collections } = await sanityFetch({
    query: QUERYTEMPLATE,
  });
  return collections;
}
