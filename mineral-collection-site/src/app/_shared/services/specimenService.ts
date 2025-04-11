'use server';
import qroq from 'groq';

import {
  DEFAULT_PAGE_SIZE,
  DESCENDING,
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
  hideManMade?: boolean;
  hideArtificial?: boolean;
  hideLowInterest?: boolean;
  manMade?: boolean;
  artificiallyModified?: boolean;
  lowInterest?: boolean;
}

const DEFAULT_FILTERS: SpecimenQueryFilters = {
  sortBy: 'numericId',
  sortOrder: DESCENDING,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  favorites: false,
  hideManMade: true,
  hideArtificial: true,
  hideLowInterest: true,
};

function convertStringToBoolean(value: string): boolean {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }
  return false;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function formatInputFilters(inputFilters: any): SpecimenQueryFilters {
  if (inputFilters.favorites) {
    inputFilters.favorites = convertStringToBoolean(inputFilters.favorites);
  }
  if (inputFilters.hideManMade) {
    inputFilters.hideManMade = convertStringToBoolean(inputFilters.hideManMade);
  }
  if (inputFilters.hideArtificial) {
    inputFilters.hideArtificial = convertStringToBoolean(
      inputFilters.hideArtificial
    );
  }
  if (inputFilters.hideLowInterest) {
    inputFilters.hideLowInterest = convertStringToBoolean(
      inputFilters.hideLowInterest
    );
  }
  if (inputFilters.manMade) {
    inputFilters.manMade = convertStringToBoolean(inputFilters.manMade);
  }
  if (inputFilters.artificiallyModified) {
    inputFilters.artificiallyModified = convertStringToBoolean(
      inputFilters.artificiallyModified
    );
  }
  if (inputFilters.lowInterest) {
    inputFilters.lowInterest = convertStringToBoolean(inputFilters.lowInterest);
  }
  return inputFilters as SpecimenQueryFilters;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function getSpecimens(
  inputFilters: any
): Promise<SPECIMENS_QUERYResult> {
  inputFilters = formatInputFilters(inputFilters);

  const filters = {
    ...DEFAULT_FILTERS,
    ...inputFilters,
  } as SpecimenQueryFilters;

  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;

  const QUERY_FILTERS = qroq`
    _type == "specimen"
    && defined(slug.current) && defined(previewImage)
    ${filters.favorites ? '&& favorite == true' : ''}
    ${!filters.hideManMade || filters.manMade ? '' : '&& manMade != true'}
    ${!filters.hideArtificial || filters.artificiallyModified ? '' : '&& artificiallyModified != true'}
    ${!filters.hideLowInterest || filters.lowInterest ? '' : '&& lowInterest != true'}
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
