import { RESOURCES_DATA, type Resource } from "../src/data/resources";
import {
  createResourceSearch,
  getResourceSearchFields,
  getResourceSearchRank,
  normalizeSearchText
} from "../src/lib/search";

type SearchExpectation = {
  query: string;
  expectedId: string;
  maxRank: number;
};

const EXPECTATIONS: SearchExpectation[] = [
  { query: "UROP", expectedId: "urop-undergrad-research", maxRank: 1 },
  { query: "volunteering", expectedId: "bennion-center-students", maxRank: 4 },
  { query: "volunteer", expectedId: "bennion-volunteer-interest-form", maxRank: 4 },
  { query: "Bennion Center", expectedId: "bennion-center-students", maxRank: 4 },
  { query: "fitness", expectedId: "campus-recreation-services", maxRank: 4 },
  { query: "Student Life Center", expectedId: "campus-recreation-services", maxRank: 4 },
  { query: "group fitness", expectedId: "campus-recreation-services", maxRank: 4 },
  { query: "Campus Recreation", expectedId: "campus-recreation-services", maxRank: 4 },
  { query: "Campus Wellness", expectedId: "center-for-campus-wellness", maxRank: 4 },
  { query: "physical wellness", expectedId: "center-for-campus-wellness", maxRank: 4 },
  { query: "Learning Assistant", expectedId: "learning-assistant-program", maxRank: 4 },
  { query: "LA Program", expectedId: "learning-assistant-program", maxRank: 4 },
  { query: "Campus Connect", expectedId: "campus-connect-student-organizations", maxRank: 4 },
  { query: "get involved", expectedId: "campus-connect-student-organizations", maxRank: 4 },
  { query: "clubs", expectedId: "campus-connect-student-organizations", maxRank: 4 },
  { query: "groups", expectedId: "campus-connect-student-organizations", maxRank: 4 },
  { query: "Chemistry Tutoring Center", expectedId: "chemistry-tutoring-center", maxRank: 4 },
  { query: "study rooms", expectedId: "chemistry-tutoring-center", maxRank: 4 },
  { query: "graduate student tutoring", expectedId: "chemistry-tutoring-center", maxRank: 4 },
  { query: "Chemistry Academic Advising", expectedId: "chemistry-academic-advising", maxRank: 4 },
  { query: "Chemistry Permission Codes", expectedId: "chemistry-permission-codes", maxRank: 4 },
  { query: "AP lab notebook", expectedId: "chemistry-ap-lab-notebook-evaluation", maxRank: 4 },
  { query: "ChemSAC", expectedId: "chemistry-student-engagement", maxRank: 4 },
  { query: "lab attendant", expectedId: "chemistry-ta-lab-attendant-jobs", maxRank: 4 },
  { query: "Chemistry Research Internships", expectedId: "chemistry-research-internships-guide", maxRank: 4 },
  { query: "Biology Academic Advising", expectedId: "biology-academic-advising", maxRank: 4 },
  { query: "Biology Permission Codes", expectedId: "biology-permission-codes", maxRank: 4 },
  { query: "BIOL 4955", expectedId: "biology-permission-codes", maxRank: 4 },
  { query: "Biology Transfer Course Petition", expectedId: "biology-transfer-course-petitions", maxRank: 4 },
  { query: "Biology Degree Options", expectedId: "biology-degree-options", maxRank: 4 },
  { query: "Biology Research Pathways", expectedId: "biology-undergraduate-research-pathways", maxRank: 4 },
  { query: "Biology Honors Thesis", expectedId: "biology-honors-thesis-research", maxRank: 4 },
  { query: "BIOL 4965", expectedId: "biology-internships-biol-4965", maxRank: 4 },
  { query: "Biology Internships", expectedId: "biology-internships-biol-4965", maxRank: 4 },
  { query: "Biology Field Stations", expectedId: "biology-facilities-field-stations", maxRank: 4 },
  { query: "Biology Scholarships", expectedId: "biology-scholarships", maxRank: 4 },
  { query: "Math Center", expectedId: "mathematics-tutoring-center", maxRank: 4 },
  { query: "Math online tutoring", expectedId: "mathematics-tutoring-center", maxRank: 4 },
  { query: "Math lecture videos", expectedId: "math-online-lecture-videos", maxRank: 4 },
  { query: "WeBWorK", expectedId: "math-webwork-course-logins", maxRank: 4 },
  { query: "ALEKS", expectedId: "math-placement", maxRank: 4 },
  { query: "Math Academic Advising", expectedId: "math-academic-advising", maxRank: 4 },
  { query: "Math Majors Minors", expectedId: "math-majors-minors", maxRank: 4 },
  { query: "Math Permission Codes", expectedId: "math-permission-codes-registration", maxRank: 4 },
  { query: "prerequisite appeal", expectedId: "math-department-forms", maxRank: 4 },
  { query: "Math Course Textbooks", expectedId: "math-courses-textbooks-schedules", maxRank: 4 },
  { query: "Math Undergraduate Research", expectedId: "math-undergraduate-research-opportunities", maxRank: 4 },
  { query: "MATH 4800", expectedId: "math-undergraduate-research-opportunities", maxRank: 4 },
  { query: "Directed Reading Program", expectedId: "math-directed-reading-program", maxRank: 4 },
  { query: "Math Student Involvement", expectedId: "math-student-involvement-groups", maxRank: 4 },
  { query: "Pi Mu Epsilon", expectedId: "math-student-involvement-groups", maxRank: 4 },
  { query: "Math Undergraduate Employment", expectedId: "math-undergraduate-employment", maxRank: 4 },
  { query: "Math Careers", expectedId: "math-careers-in-mathematics", maxRank: 4 },
  { query: "Mathematics Scholarships", expectedId: "mathematics-scholarships", maxRank: 4 },
  { query: "Physics Help Lab", expectedId: "physics-astronomy-tutoring", maxRank: 4 },
  { query: "Physics Academic Advising", expectedId: "physics-academic-advising", maxRank: 4 },
  { query: "Physics Majors Emphases", expectedId: "physics-majors-emphases-minors", maxRank: 4 },
  { query: "Physics Permission Codes", expectedId: "physics-permission-codes-transfer-evaluations", maxRank: 4 },
  { query: "Physics Transfer Course Evaluation", expectedId: "physics-permission-codes-transfer-evaluations", maxRank: 4 },
  { query: "Physics Undergraduate Handbook", expectedId: "physics-undergraduate-handbook", maxRank: 4 },
  { query: "Physics Honors Thesis", expectedId: "physics-honors-program", maxRank: 4 },
  { query: "Physics Scholarships", expectedId: "physics-astronomy-scholarships", maxRank: 4 },
  { query: "Physics Undergraduate Research", expectedId: "physics-undergraduate-research", maxRank: 4 },
  { query: "Physics Research Areas", expectedId: "physics-research-areas", maxRank: 4 },
  { query: "Astroparticle Physics", expectedId: "physics-research-areas", maxRank: 4 },
  { query: "Physics REU", expectedId: "physics-reu-opportunities", maxRank: 4 },
  { query: "Physics SURF", expectedId: "physics-surf-opportunities", maxRank: 4 },
  { query: "Physics SRI", expectedId: "physics-sri-stream", maxRank: 4 },
  { query: "Physics Student Involvement", expectedId: "physics-student-involvement-groups", maxRank: 4 },
  { query: "Society of Physics Students", expectedId: "organzation-sps", maxRank: 4 },
  { query: "Physics USAC", expectedId: "organzation-physics-usac", maxRank: 4 },
  { query: "Willard Eccles Astronomy Observatory", expectedId: "willard-eccles-astronomy-observatory", maxRank: 4 },
  { query: "Physics Careers", expectedId: "physics-career-resources", maxRank: 4 },
  { query: "PHYS 3980", expectedId: "physics-career-resources", maxRank: 4 },
  { query: "Physics TA", expectedId: "physics-ta-employment", maxRank: 4 },
  { query: "Physics Campus Resources", expectedId: "physics-campus-resources", maxRank: 4 },
  { query: "Atmos Undergraduate", expectedId: "atmos-undergraduate-students", maxRank: 4 },
  { query: "Atmos Prospective Transfer", expectedId: "atmos-prospective-transfer-students", maxRank: 4 },
  { query: "Atmos Academic Advising", expectedId: "atmos-academic-advising-permission-codes", maxRank: 4 },
  { query: "Atmos Permission Code", expectedId: "atmos-academic-advising-permission-codes", maxRank: 4 },
  { query: "Professional Meteorology", expectedId: "atmos-major-emphases-degree-plans", maxRank: 4 },
  { query: "Snow and Water Sciences", expectedId: "atmos-major-emphases-degree-plans", maxRank: 4 },
  { query: "Atmospheric Sciences Minor", expectedId: "atmos-minor-requirements", maxRank: 4 },
  { query: "ATMOS Course Catalog", expectedId: "atmos-course-catalog", maxRank: 4 },
  { query: "Atmos Capstone", expectedId: "atmos-capstone-experiential-learning", maxRank: 4 },
  { query: "ATMOS 5800", expectedId: "atmos-capstone-experiential-learning", maxRank: 4 },
  { query: "Atmospheric Sciences Scholarships", expectedId: "atmos-science-scholarships", maxRank: 4 },
  { query: "conference travel funds", expectedId: "atmos-science-scholarships", maxRank: 4 },
  { query: "REALM REU", expectedId: "atmos-realm-reu", maxRank: 4 },
  { query: "REALM Research Themes", expectedId: "atmos-realm-research-themes", maxRank: 4 },
  { query: "Atmos Research Areas", expectedId: "atmos-research-areas", maxRank: 4 },
  { query: "Air Quality Research", expectedId: "atmos-research-areas", maxRank: 4 },
  { query: "American Meteorological Society", expectedId: "atmos-ams-student-chapter", maxRank: 4 },
  { query: "Utah Weather Center", expectedId: "utah-weather-center", maxRank: 4 },
  { query: "Atmos Internships", expectedId: "atmos-internships-overview", maxRank: 4 },
  { query: "Atmos Local Internships", expectedId: "atmos-local-internships-weather-center", maxRank: 4 },
  { query: "NWS Salt Lake City", expectedId: "atmos-local-internships-weather-center", maxRank: 4 },
  { query: "NOAA Student Opportunities", expectedId: "atmos-national-internship-resources", maxRank: 4 },
  { query: "Meteorology Internships", expectedId: "atmos-internship-search-resources", maxRank: 4 },
  { query: "Atmos Careers", expectedId: "atmos-career-information", maxRank: 4 },
  { query: "Geology Current Undergraduate", expectedId: "geology-current-undergraduate-students", maxRank: 4 },
  { query: "Geology Permission Code", expectedId: "geology-permission-codes-advising", maxRank: 4 },
  { query: "Geophysics Permission Code", expectedId: "geology-permission-codes-advising", maxRank: 4 },
  { query: "Geology Transfer Student", expectedId: "geology-prospective-transfer-students", maxRank: 4 },
  { query: "Mines Earth Sciences Student Epicenter", expectedId: "mines-earth-epicenter", maxRank: 4 },
  { query: "Geology Scholarships", expectedId: "geology-geophysics-scholarships", maxRank: 4 },
  { query: "Geology Research Areas", expectedId: "geology-geophysics-research-areas", maxRank: 4 },
  { query: "Geophysics Labs", expectedId: "geology-geophysics-labs", maxRank: 4 },
  { query: "Geology Student Groups", expectedId: "geology-student-groups", maxRank: 4 },
  { query: "Refreshment Hour", expectedId: "geology-events-refreshment-hour", maxRank: 4 },
  { query: "Geology Internships", expectedId: "geology-cmes-internships", maxRank: 4 },
  { query: "Geology Ethics", expectedId: "geology-professional-ethics-policy", maxRank: 4 },
  { query: "Mining Engineering Advising", expectedId: "mining-undergraduate-program-advising", maxRank: 4 },
  { query: "Mining Undergraduate Program", expectedId: "mining-undergraduate-program-advising", maxRank: 4 },
  { query: "Mining Major Map", expectedId: "mining-engineering-major-map", maxRank: 4 },
  { query: "Mining Scholarships", expectedId: "mining-engineering-scholarships", maxRank: 4 },
  { query: "Explore More Scholarship", expectedId: "mining-engineering-scholarships", maxRank: 4 },
  { query: "Mining Internships", expectedId: "mining-engineering-internships", maxRank: 4 },
  { query: "Mining Department", expectedId: "hub-mining", maxRank: 4 },
  { query: "Metallurgical Engineering Advising", expectedId: "metallurgical-engineering-advising", maxRank: 4 },
  { query: "Metallurgical Engineering BS Program", expectedId: "metallurgical-engineering-bs-program", maxRank: 4 },
  { query: "Metallurgical Prospective Students", expectedId: "metallurgical-engineering-prospective-students", maxRank: 4 },
  { query: "MSE BS MS Program", expectedId: "mse-bs-ms-program", maxRank: 4 },
  { query: "Metallurgical Scholarships", expectedId: "metallurgical-engineering-scholarships", maxRank: 4 },
  { query: "Metallurgical Undergraduate Research", expectedId: "metallurgical-engineering-undergraduate-research", maxRank: 4 },
  { query: "MSE Faculty Research", expectedId: "metallurgical-engineering-faculty-research", maxRank: 4 },
  { query: "Metallurgical Internships", expectedId: "metallurgical-engineering-internships", maxRank: 4 },
  { query: "Metallurgical Department", expectedId: "hub-metallurgical", maxRank: 4 }
];

const BROKEN_URLS = ["https://chem.utah.edu/undergraduate/resources/index.php"];
const fuse = createResourceSearch(RESOURCES_DATA);

function rankedMatches(queryText: string) {
  const query = normalizeSearchText(queryText);
  const compactQuery = query.replace(/\s+/g, "");
  const allowCompactMatch = query.includes(" ") && compactQuery.length >= 4;
  const fuzzyScores = new Map(fuse.search(queryText).map((result) => [result.item.id, result.score ?? 1]));

  return RESOURCES_DATA
    .map((resource) => {
      const fields = getResourceSearchFields(resource);
      const directMatch = fields.some((field) => field.includes(query));
      const compactMatch =
        allowCompactMatch &&
        fields.some((field) => field.replace(/\s+/g, "").includes(compactQuery));
      const fuzzyScore = fuzzyScores.get(resource.id);

      if (!directMatch && !compactMatch && fuzzyScore === undefined) {
        return null;
      }

      return {
        resource,
        rankScore: getResourceSearchRank(resource, queryText, fuzzyScore)
      };
    })
    .filter((match): match is { resource: Resource; rankScore: number } => match !== null)
    .sort((matchA, matchB) => {
      if (matchA.rankScore !== matchB.rankScore) {
        return matchA.rankScore - matchB.rankScore;
      }

      return matchA.resource.name.localeCompare(matchB.resource.name);
    });
}

const failures: string[] = [];

for (const expectation of EXPECTATIONS) {
  const matches = rankedMatches(expectation.query);
  const index = matches.findIndex((match) => match.resource.id === expectation.expectedId);

  if (index === -1 || index + 1 > expectation.maxRank) {
    const topMatches = matches.slice(0, 5).map((match) => match.resource.name).join(" | ") || "(no matches)";
    failures.push(
      `"${expectation.query}" expected ${expectation.expectedId} in top ${expectation.maxRank}, got top: ${topMatches}`
    );
  }
}

for (const brokenUrl of BROKEN_URLS) {
  const offenders = RESOURCES_DATA.filter((resource) => resource.url === brokenUrl);

  if (offenders.length > 0) {
    failures.push(`${brokenUrl} is still used by: ${offenders.map((resource) => resource.name).join(", ")}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Survey search checks passed (${EXPECTATIONS.length} queries).`);
