import { defineQuery } from 'next-sanity';

/* eslint-disable  @typescript-eslint/no-unused-vars */
const MINERALS_QUERY = defineQuery(`*[
  _type == "mineral"
  && defined(slug.current) 
  && count(*[_type == "specimen" && references(^._id)]) > 0
]{_id, name, slug, previewImage}|order(name asc)`);

/* eslint-disable  @typescript-eslint/no-unused-vars */
const ROCKS_QUERY = defineQuery(`*[
  _type == "rock"
  && defined(slug.current) 
  && count(*[_type == "specimen" && references(^._id)]) > 0
]{_id, name, slug, previewImage}|order(name asc)`);

/* eslint-disable  @typescript-eslint/no-unused-vars */
const SPECIMENS_QUERY = defineQuery(`*[
  _type == "specimen"
  && defined(slug.current) && defined(previewImage)
]{_id,  name, numericId, slug, previewImage}|order(numericId asc)[0...3]`);
