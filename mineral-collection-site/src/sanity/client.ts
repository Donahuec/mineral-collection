import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "rg81x492",
  dataset: "production",
  apiVersion: "2025-03-11",
  useCdn: false,
});
