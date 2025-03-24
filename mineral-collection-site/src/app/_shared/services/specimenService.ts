'use server';
import qroq from 'groq';

import { sanityFetch } from '@/sanity/live';
import { SPECIMENS_QUERYResult } from '@/sanity/types';

import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_ORDER } from '../constants/constants';

export interface SpecimenQueryFilters {
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize: number;
  favorites: boolean;
  search?: string;
}

const DEFAULT_FILTERS: SpecimenQueryFilters = {
  sortBy: 'numericId',
  sortOrder: DEFAULT_SORT_ORDER,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  favorites: false,
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function getSpecimens(
  inputFilters: any
): Promise<SPECIMENS_QUERYResult> {
  const filters = { ...DEFAULT_FILTERS, ...inputFilters };

  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;

  const QUERYTEMPLATE = qroq`
  *[
    _type == "specimen"
    && defined(slug.current) && defined(previewImage)
    ${filters.favorites ? '&& favorite == true' : ''}
    ${filters.search ? `&& [name, minerals[]->name, rocks[]->name] match "*${filters.search.toLowerCase()}*"` : ''}
  ]
  | order(${filters.sortBy} ${filters.sortOrder}, numericId asc)[${start}...${end}]
  {_id,  name, numericId, slug, previewImage}`;

  const { data: specimens } = await sanityFetch({
    query: QUERYTEMPLATE,
  });
  return specimens;
}
