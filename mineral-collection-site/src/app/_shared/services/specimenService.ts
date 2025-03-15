"use server";
import { sanityFetch } from "@/sanity/live";
import { SPECIMENS_QUERYResult } from "@/sanity/types";
import { defineQuery } from "next-sanity";
import qroq from "groq";

export interface SpecimenQueryFilters {
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize: number;
}

const DEFAULT_FILTERS: SpecimenQueryFilters = {
  sortBy: "numericId",
  sortOrder: "asc",
  page: 1,
  pageSize: 10
};

/* eslint-disable  @typescript-eslint/no-unused-vars */
const SPECIMENS_QUERY = defineQuery(`*[
  _type == "specimen"
  && defined(slug.current) && defined(previewImage)
]{_id,  name, numericId, slug, previewImage}|order(numericId asc)[0...3]`);

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function getSpecimens(inputFilters: any): Promise<SPECIMENS_QUERYResult> {

  const filters = { ...DEFAULT_FILTERS, ...inputFilters };

  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;

  const QUERYTEMPLATE = qroq`*[
    _type == "specimen"
    && defined(slug.current) && defined(previewImage)
  ]
  | order(${filters.sortBy} ${filters.sortOrder}, numericId asc)[${start}...${end}]
  {_id,  name, numericId, slug, previewImage}`;

  const { data: specimens } = await sanityFetch({
    query: QUERYTEMPLATE
  });
  return specimens;
}