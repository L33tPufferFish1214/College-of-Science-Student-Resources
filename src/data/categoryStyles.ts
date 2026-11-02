export type CategoryStyle = {
  accent: string;
  background: string;
  border: string;
  text: string;
};

// The U's palette has no secondary accent hue, the whole system is crimson,
// black, white and grey. Eleven per-category colours competed with the resource
// text they were labelling, so this collapses to two tones: neutral ink for
// every category, crimson reserved for the one that is genuinely urgent.
const NEUTRAL: CategoryStyle = {
  accent: "#372c2c",
  background: "#f5f4f2",
  border: "#d5d5d5",
  text: "#372c2c"
};

const URGENT: CategoryStyle = {
  accent: "#be0000",
  background: "#f3dddd",
  border: "#e8bcbc",
  text: "#8c0000"
};

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "Academic Help": NEUTRAL,
  "Scholarships & Financial Aid": NEUTRAL,
  "Research & Internships": NEUTRAL,
  "Advising & Course Planning": NEUTRAL,
  "Wellness & Mental Health": URGENT,
  "Community & Student Orgs": NEUTRAL,
  "Career Development": NEUTRAL,
  "Housing & Campus Life": NEUTRAL,
  "Emergency & Safety": URGENT,
  "Student Access & Support": NEUTRAL,
  "Department Hubs": NEUTRAL
};

export const getCategoryStyle = (category: string) => CATEGORY_STYLES[category] ?? NEUTRAL;
