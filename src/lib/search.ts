import Fuse from "fuse.js";
import type { Resource } from "../data/resources";

export function createResourceSearch(resources: Resource[]) {
  return new Fuse(resources, {
    keys: [
      { name: "name", weight: 0.4 },
      { name: "relevanceTags", weight: 0.3 },
      { name: "category", weight: 0.1 },
      { name: "subcategory", weight: 0.1 },
      { name: "description", weight: 0.1 }
    ],
    threshold: 0.4, // ponytail: tolerates ~1-2 typo'd chars per word, raise if results feel too loose
    ignoreLocation: true, // match keywords anywhere in the field, not just near the start
    minMatchCharLength: 2,
    includeScore: true // used to rank results by relevance (0 = perfect match)
  });
}
