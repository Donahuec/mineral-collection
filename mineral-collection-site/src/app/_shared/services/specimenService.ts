'use server';
import qroq from 'groq';

import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_ORDER,
} from '@/app/_shared/constants/constants';
import { sanityFetch } from '@/sanity/live';
import { SPECIMENS_QUERYResult } from '@/sanity/types';

export interface SpecimenQueryFilters {
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize: number;
  search?: string;
  favorites: boolean;
  showManMade?: boolean;
  showArtificial?: boolean;
  showLowInterest?: boolean;
  manMade?: boolean;
  artificiallyModified?: boolean;
  lowInterest?: boolean;
}

const DEFAULT_FILTERS: SpecimenQueryFilters = {
  sortBy: 'numericId',
  sortOrder: DEFAULT_SORT_ORDER,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  favorites: false,
  showManMade: false,
  showArtificial: false,
  showLowInterest: false,
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function getSpecimens(
  inputFilters: any
): Promise<SPECIMENS_QUERYResult> {
  const filters = { ...DEFAULT_FILTERS, ...inputFilters };

  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;

  const QUERY_FILTERS = qroq`
    _type == "specimen"
    && defined(slug.current) && defined(previewImage)
    ${filters.favorites ? '&& favorite == true' : ''}
    ${filters.showManMade || filters.manMade ? '' : '&& manMade != true'}
    ${filters.showArtificial || filters.artificiallyModified ? '' : '&& artificiallyModified != true'}
    ${filters.showLowInterest || filters.lowInterest ? '' : '&& lowInterest != true'}
    ${filters.manMade ? '&& manMade == true' : ''}
    ${filters.artificiallyModified ? '&& artificiallyModified == true' : ''}
    ${filters.lowInterest ? '&& lowInterest == true' : ''}
    ${filters.search ? `&& [name, string(numericId), minerals[]->name, rocks[]->name] match "*${filters.search.toLowerCase()}*"` : ''}
  `;

  const QUERYTEMPLATE = qroq`
  *[
    ${QUERY_FILTERS}
  ]
  | order(${filters.sortBy} ${filters.sortOrder}, numericId asc)[${start}...${end}]
  {_id,  name, numericId, slug, previewImage}`;

  const { data: specimens } = await sanityFetch({
    query: QUERYTEMPLATE,
  });
  return specimens;
}
