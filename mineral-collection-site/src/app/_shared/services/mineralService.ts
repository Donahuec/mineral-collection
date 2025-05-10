'use server';
import qroq from 'groq';

import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_ORDER,
} from '@/app/_shared/constants/constants';
import { sanityFetch } from '@/sanity/live';
import { MINERALS_QUERYResult } from '@/sanity/types';

export interface MineralQueryFilters {
  sortOrder: string;
  page: number;
  pageSize: number;
  search?: string;
}

const DEFAULT_FILTERS: MineralQueryFilters = {
  sortOrder: DEFAULT_SORT_ORDER,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function getMinerals(
  inputFilters: any
): Promise<MINERALS_QUERYResult> {
  const filters = { ...DEFAULT_FILTERS, ...inputFilters };

  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;

  const QUERYTEMPLATE = qroq`
  *[
    _type == "mineral"
    && defined(slug.current) 
    && count(*[_type == "specimen" && references(^._id)]) > 0
    ${filters.search ? `&& [name, parent->name, parent->parent->name, array::join(altNames, " ") ] match "*${filters.search.toLowerCase()}*"` : ''}
  ]
  | order(name ${filters.sortOrder})[${start}...${end}]
  {_id, name, slug, previewImage}`;

  const { data: minerals } = await sanityFetch({
    query: QUERYTEMPLATE,
  });
  return minerals;
}

export async function getMineralDescendants(
  id: string,
  depth: number = 0
): Promise<MINERALS_QUERYResult> {
  let parentDepthFilter = '';
  for (let i = 1; i <= depth; i++) {
    let parentPrefix = '';
    // add a number of 'parent->' equal to i
    for (let j = 0; j < i; j++) {
      parentPrefix += 'parent->';
    }
    parentDepthFilter += ` || ${parentPrefix}parent._ref == '${id}'`;
  }
  const QUERYTEMPLATE = qroq`
    *[
      _type == "mineral"
      && defined(slug.current)
      && ((parent._ref == '${id}' ${parentDepthFilter}) && count(*[_type == "specimen" && references(^._id)]) > 0)
    ]
    | order(name asc)
    {_id, name, slug, previewImage}`;

  const { data: minerals } = await sanityFetch({
    query: QUERYTEMPLATE,
  });
  return minerals;
}
