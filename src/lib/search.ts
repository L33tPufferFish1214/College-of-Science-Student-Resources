import Fuse from "fuse.js";
import type { Resource } from "../data/resources";

export const normalizeSearchText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export const getResourceSearchFields = (resource: Resource) =>
  [
    resource.name,
    resource.description,
    resource.category,
    resource.subcategory ?? "",
    resource.department ?? "",
    resource.sourceLabel ?? "",
    resource.deadline ?? "",
    resource.contact ?? "",
    ...resource.relevanceTags
  ].map(normalizeSearchText);

export const getResourceSearchRank = (resource: Resource, rawQuery: string, fuzzyScore = 1) => {
  const query = normalizeSearchText(rawQuery);
  if (!query) return 1;

  const fields = getResourceSearchFields(resource);
  const name = normalizeSearchText(resource.name);
  const category = normalizeSearchText(resource.category);
  const subcategory = normalizeSearchText(resource.subcategory ?? "");
  const department = normalizeSearchText(resource.department ?? "");
  const tags = resource.relevanceTags.map(normalizeSearchText);
  const queryTokens = query.split(/\s+/).filter(Boolean);
  const compactQuery = query.replace(/\s+/g, "");
  const hasExactTag = tags.some((tag) => tag === query);
  const hasTagStart = tags.some((tag) => tag.startsWith(query));
  const hasTagIncludes = tags.some((tag) => tag.includes(query));
  const hasNameTokenMatch = queryTokens.every((token) => name.split(/\s+/).includes(token));
  const hasCompactNameMatch =
    queryTokens.length > 1 && compactQuery.length >= 4 && name.replace(/\s+/g, "").includes(compactQuery);

  if (name === query) return 0;
  if (hasExactTag) return 0.01;
  if (hasNameTokenMatch) return 0.02;
  if (name.startsWith(query)) return 0.03;
  if (hasCompactNameMatch) return 0.04;
  if (hasTagStart) return 0.06;
  if (name.includes(query)) return 0.08;
  if (hasTagIncludes) return 0.1;
  if (department === query) return 0.12;
  if (category === query || subcategory === query) return 0.14;
  if (fields.some((field) => field.startsWith(query))) return 0.18;
  if (fields.some((field) => field.includes(query))) return 0.24;

  return 0.6 + fuzzyScore;
};

export function createResourceSearch(resources: Resource[]) {
  return new Fuse(resources, {
    keys: [
      { name: "name", weight: 0.4 },
      { name: "relevanceTags", weight: 0.3 },
      { name: "category", weight: 0.1 },
      { name: "subcategory", weight: 0.1 },
      { name: "department", weight: 0.1 },
      { name: "description", weight: 0.1 }
    ],
    threshold: 0.34,
    ignoreLocation: true, // match keywords anywhere in the field, not just near the start
    minMatchCharLength: 2,
    includeScore: true // used to rank results by relevance (0 = perfect match)
  });
}
