"use server";
import { sanityFetch } from "@/sanity/live";
import { SPECIMENS_QUERYResult } from "@/sanity/types";
import { defineQuery } from "next-sanity";

const SPECIMENS_QUERY = defineQuery(`*[
  _type == "specimen"
  && defined(slug.current) && defined(previewImage) && numericId > $lastId
]{_id,  name, numericId, slug, previewImage}|order(numericId asc)`);

export async function getSpecimens({ lastId = 0 }): Promise<SPECIMENS_QUERYResult> {
  const { data: specimens } = await sanityFetch({
    query: SPECIMENS_QUERY,
    params: { lastId },
  });
  return specimens;
}