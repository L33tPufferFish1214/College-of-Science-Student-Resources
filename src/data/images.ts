// College of Science photography, referenced from science.utah.edu.
//
// ponytail: one module so the whole site's imagery swaps in one edit. When the
// College grants permission (or we switch to neutral stock), download the files
// into public/img/ and change only the CDN constant + paths below, no component
// touches an image URL directly.
//
// All <img>/background usages pass referrerPolicy="no-referrer"; verified loading
// cross-origin 2026-09-21.

const CDN = "https://science.utah.edu/wp-content/uploads";
const THEME = "https://science.utah.edu/wp-content/themes/umctheme3/img";

export const U_LOGO_HORIZONTAL = `${THEME}/uu-logo-hrz.png`;
export const U_LOGO_INSTITUTIONAL = `${THEME}/uu-institutional.png`;

export const IMAGES = {
  studentsChemLab: `${CDN}/2019/09/2000x1333-Students-ChemLab-E.jpg`,
  studentsCandid: `${CDN}/2020/12/CollegeofScience_Students-303-scaled.jpg`,
  studentsAdvising: `${CDN}/2021/01/CollegeofScience_Students-318-scaled.jpg`,
  advisingHive: `${CDN}/2021/01/Advising-Hive-Collage2-3.png`,
  crockerExterior: `${CDN}/2025/11/Crocker-Exterior.jpg`,
  bioinformatics: `${CDN}/2025/11/BioinformaticsWeb-scaled-1.jpg`,
  labStock: `${CDN}/2020/09/2000x1333-STOCK-Lab-A.jpg`,
  beckmanLogo: `${CDN}/2020/03/2000x1333_Beckman-Logo-A.jpg`,
  campusStock: `${CDN}/2019/09/iStock-2134367155-scaled.jpg`,
  pattern: `${CDN}/2019/05/pattern1.png`
} as const;

export type ImageKey = keyof typeof IMAGES;
