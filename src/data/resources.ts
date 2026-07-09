export type ResourceCategory =
  | "Academic Help"
  | "Advising & Course Planning"
  | "Scholarships & Financial Aid"
  | "Research & Internships"
  | "Wellness & Mental Health"
  | "Community & Student Orgs"
  | "Career Development"
  | "Housing & Campus Life"
  | "Emergency & Safety"
  | "Student Access & Support"
  | "Department Hubs";

export type ResourceDepartment =
  | "Atmospheric Sciences"
  | "Biology"
  | "Chemistry"
  | "Earth & Environmental Science"
  | "Geology"
  | "Mathematics"
  | "Metallurgical Engineering"
  | "Mining Engineering"
  | "Physics & Astronomy";

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ResourceCategory;
  subcategory?: string;
  department?: ResourceDepartment;
  sourceUrl?: string;
  sourceLabel?: string;
  tier: 1 | 2 | "all"; // 1 = Freshman/Sophomore, 2 = Junior/Senior/Graduate, "all" = Useful at all levels
  deadline?: string | null;
  contact?: string | null;
  relevanceTags: string[];
}

export interface Advisor {
  department: string;
  advisor: string;
  email: string;
}

export interface CareerOutlook {
  career: string;
  medianSalary: number;
  growth: number; // as percentage, e.g. 33 for 33%
  sector: "Education & Research" | "Healthcare" | "Government" | "Industry";
  metricType: "growth" | "salary";
}

export const ADVISOR_DIRECTORY: Advisor[] = [
  { department: "Atmospheric Sciences", advisor: "Marcus Smith", email: "marcus.smith@utah.edu" },
  { department: "Biology", advisor: "Mark Campbell", email: "mark.a.campbell@utah.edu" },
  { department: "Biology", advisor: "Bree Molinari", email: "bree.molinari@utah.edu" },
  { department: "Chemistry", advisor: "Braydon Rawlings", email: "braydon.rawlings@utah.edu" },
  { department: "Chemistry", advisor: "Nat Eastwood", email: "nat.eastwood@utah.edu" },
  { department: "Earth & Environmental Science", advisor: "Kelsie Richards", email: "kelsie.richards@utah.edu" },
  { department: "Geology", advisor: "Kelsie Richards", email: "kelsie.richards@utah.edu" },
  { department: "Mathematics", advisor: "Jeff Badger", email: "jeff.badger@utah.edu" },
  { department: "Mathematics", advisor: "Marcus Smith", email: "marcus.smith@utah.edu" },
  { department: "Mining Engineering", advisor: "Savannah Manwill", email: "savannah.manwill@utah.edu" },
  { department: "Physics & Astronomy", advisor: "Stacie Cuadro", email: "s.cuadro@utah.edu" },
  { department: "Honors College", advisor: "Karleton Munn", email: "k.munn@honors.utah.edu" }
];

export const CAREER_OUTLOOK_DATA: CareerOutlook[] = [
  // Highest Job Growth (10-Year Outlook)
  { career: "Mathematician", medianSalary: 110860, growth: 33, sector: "Education & Research", metricType: "growth" },
  { career: "Healthcare Administration", medianSalary: 104280, growth: 32, sector: "Healthcare", metricType: "growth" },
  { career: "Epidemiologist", medianSalary: 74560, growth: 30, sector: "Government", metricType: "growth" },
  { career: "Data Scientist", medianSalary: 98230, growth: 28, sector: "Industry", metricType: "growth" },
  { career: "Actuary", medianSalary: 111030, growth: 24, sector: "Industry", metricType: "growth" },
  { career: "Software Engineer", medianSalary: 110140, growth: 22, sector: "Industry", metricType: "growth" },
  { career: "Physical Therapist", medianSalary: 91010, growth: 21, sector: "Healthcare", metricType: "growth" },
  { career: "Medical Scientist", medianSalary: 91510, growth: 17, sector: "Healthcare", metricType: "growth" },
  { career: "Veterinarian", medianSalary: 99250, growth: 17, sector: "Healthcare", metricType: "growth" },
  { career: "Forensic Scientist", medianSalary: 60590, growth: 16, sector: "Government", metricType: "growth" },
  { career: "Industrial Engineer", medianSalary: 88950, growth: 14, sector: "Industry", metricType: "growth" },
  { career: "Pilot", medianSalary: 160970, growth: 13, sector: "Industry", metricType: "growth" },

  // Highest Median Salaries
  { career: "Medical Doctor / Orthodontist", medianSalary: 208000, growth: 5, sector: "Healthcare", metricType: "salary" },
  { career: "Pilot (Advanced Seat)", medianSalary: 160970, growth: 13, sector: "Industry", metricType: "salary" },
  { career: "Lab Manager", medianSalary: 137940, growth: 6, sector: "Education & Research", metricType: "salary" },
  { career: "Lawyer", medianSalary: 126930, growth: 9, sector: "Industry", metricType: "salary" },
  { career: "Physicist", medianSalary: 129850, growth: 8, sector: "Education & Research", metricType: "salary" },
  { career: "Astronomer", medianSalary: 119730, growth: 8, sector: "Education & Research", metricType: "salary" },
  { career: "Aerospace Engineer", medianSalary: 118610, growth: 8, sector: "Industry", metricType: "salary" },
  { career: "Optometrist", medianSalary: 118050, growth: 9, sector: "Healthcare", metricType: "salary" },
  { career: "Chemical Engineer", medianSalary: 108540, growth: 9, sector: "Industry", metricType: "salary" },
  { career: "Actuary (High Tenure)", medianSalary: 111030, growth: 24, sector: "Industry", metricType: "salary" },
  { career: "Software Lead", medianSalary: 110140, growth: 22, sector: "Industry", metricType: "salary" }
];

const ATMOS_HOME_URL = "https://atmos.utah.edu/";
const ATMOS_UNDERGRAD_URL = "https://atmos.utah.edu/undergraduate/";
const ATMOS_PROSPECTIVE_URL = "https://atmos.utah.edu/undergraduate/undergraduate-prospective.php";
const ATMOS_ADVISING_URL = "https://atmos.utah.edu/undergraduate/academics/academic-advising.php";
const ATMOS_MAJOR_URL = "https://atmos.utah.edu/undergraduate/academics/degrees/major.php";
const ATMOS_MINOR_URL = "https://atmos.utah.edu/undergraduate/academics/degrees/minor.php";
const ATMOS_COURSES_URL = "https://catalog.utah.edu/courses?subjectCode=ATMOS&page=1&cq=%20";
const ATMOS_CAPSTONE_URL = "https://atmos.utah.edu/undergraduate/academics/capstone.php";
const ATMOS_INTERNSHIPS_URL = "https://atmos.utah.edu/undergraduate/opportunities/internships_overview.php";
const ATMOS_LOCAL_INTERNSHIPS_URL = "https://atmos.utah.edu/undergraduate/opportunities/internships_local.php";
const ATMOS_NATIONAL_INTERNSHIPS_URL = "https://atmos.utah.edu/undergraduate/opportunities/internship-opportunities.php";
const ATMOS_INTERNSHIP_RESOURCES_URL = "https://atmos.utah.edu/undergraduate/opportunities/internships_resources.php";
const ATMOS_SCHOLARSHIPS_URL = "https://atmos.utah.edu/undergraduate/academics/scholarships.php";
const ATMOS_CAREERS_URL = "https://atmos.utah.edu/undergraduate/opportunities/careers.php";
const ATMOS_AMS_URL = "https://atmos.utah.edu/get_involved/ametsoc/index.php";
const ATMOS_UTE_WEATHER_URL = "https://atmos.utah.edu/ute-weather/index.php";
const ATMOS_REU_URL = "https://atmos.utah.edu/get_involved/reu/index.php";
const ATMOS_REU_THEMES_URL = "https://atmos.utah.edu/get_involved/reu/research-themes.php";
const ATMOS_RESEARCH_URL = "https://atmos.utah.edu/about/research/index.php";
const CHEMISTRY_HOME_URL = "https://www.chemistry.utah.edu/";
const CHEMISTRY_ADVISING_URL = "https://www.chemistry.utah.edu/academic-advising/";
const CHEMISTRY_PERMISSION_CODES_URL = "https://www.chemistry.utah.edu/permission-codes/";
const CHEMISTRY_STUDENT_ENGAGEMENT_URL = "https://www.chemistry.utah.edu/student-engagement/";
const CHEMISTRY_JOBS_URL = "https://www.chemistry.utah.edu/ta-job-opportunities/";
const CHEMISTRY_UNDERGRAD_AWARDS_URL =
  "https://www.chemistry.utah.edu/awards-and-scholarships/undergraduate-awards-and-scholarships/";
const BIOLOGY_HOME_URL = "https://www.biology.utah.edu/";
const BIOLOGY_UNDERGRAD_URL = "https://www.biology.utah.edu/undergraduate-students/";
const BIOLOGY_ADVISING_URL = "https://www.biology.utah.edu/undergraduate-advising/";
const BIOLOGY_DEGREE_OPTIONS_URL = "https://www.biology.utah.edu/undergraduate-biology-degree-options/";
const BIOLOGY_PERMISSION_CODES_URL = "https://www.biology.utah.edu/permission-codes/";
const BIOLOGY_TRANSFER_URL = "https://www.biology.utah.edu/transfer-students/";
const BIOLOGY_HONORS_URL = "https://www.biology.utah.edu/biology-honors-program/";
const BIOLOGY_INTERNSHIPS_URL = "https://www.biology.utah.edu/internships/";
const BIOLOGY_RESEARCH_URL = "https://www.biology.utah.edu/research/";
const BIOLOGY_FACILITIES_URL = "https://www.biology.utah.edu/facilities/";
const BIOLOGY_CENTERS_FIELD_STATIONS_URL = "https://www.biology.utah.edu/centers-field-stations/";
const BIOLOGY_SCHOLARSHIPS_URL = "https://www.biology.utah.edu/scholarships-financial-aid/";
const MATH_HOME_URL = "https://www.math.utah.edu/";
const MATH_UNDERGRAD_URL = "https://www.math.utah.edu/undergraduate/index.php";
const MATH_ADVISING_URL = "https://www.math.utah.edu/undergraduate/advising.php";
const MATH_CENTER_URL = "https://www.math.utah.edu/undergraduate/mathcenter.php";
const MATH_RESEARCH_URL = "https://www.math.utah.edu/undergraduate/research.php";
const MATH_INVOLVEMENT_URL = "https://www.math.utah.edu/undergraduate/involvement-employ.php";
const MATH_SCHOLARSHIPS_URL = "https://www.math.utah.edu/undergraduate/scholarships.php";
const MATH_CAREERS_URL = "https://www.math.utah.edu/undergraduate/careers.php";
const MATH_PLACEMENT_URL = "https://www.math.utah.edu/undergraduate/placement.php";
const MATH_REGISTRATION_URL = "https://www.math.utah.edu/undergraduate/registration.php";
const MATH_FORMS_URL = "https://www.math.utah.edu/resources/forms.php";
const MATH_COURSES_URL = "https://www.math.utah.edu/schedule/";
const MATH_LECTURES_URL = "https://www.math.utah.edu/lectures/index.php";
const MATH_WEBWORK_URL = "https://www.math.utah.edu/online/ww/classes.php";
const PHYSICS_HOME_URL = "https://www.physics.utah.edu/";
const PHYSICS_UNDERGRAD_URL = "https://www.physics.utah.edu/undergraduate-program/";
const PHYSICS_ADVISING_URL = "https://www.physics.utah.edu/undergraduate-program/academic-advising/";
const PHYSICS_CAMPUS_RESOURCES_URL = "https://www.physics.utah.edu/undergraduate-program/campus-resources/";
const PHYSICS_CAREER_URL = "https://www.physics.utah.edu/undergraduate-program/career-resources/";
const PHYSICS_HONORS_URL = "https://www.physics.utah.edu/undergraduate-program/honors-program/";
const PHYSICS_DEGREES_URL = "https://www.physics.utah.edu/undergraduate-program/majors-emphases-minors/";
const PHYSICS_PERMISSIONS_URL =
  "https://www.physics.utah.edu/undergraduate-program/permissions-codes-transfer-evaluations/";
const PHYSICS_SCHOLARSHIPS_URL = "https://www.physics.utah.edu/undergraduate-program/scholarships/";
const PHYSICS_INVOLVEMENT_URL = "https://www.physics.utah.edu/undergraduate-program/student-employment-and-involvement/";
const PHYSICS_TUTORING_URL = "https://www.physics.utah.edu/undergraduate-program/tutoring-resources/";
const PHYSICS_HANDBOOK_URL = "https://www.physics.utah.edu/wp-content/uploads/sites/65/2024/05/Handbook-2024-2025.pdf";
const PHYSICS_UNDERGRAD_RESEARCH_URL = "https://www.physics.utah.edu/undergraduate-program/undergraduate-research/";
const PHYSICS_RESEARCH_URL = "https://www.physics.utah.edu/research/";
const PHYSICS_SRI_URL = "https://www.physics.utah.edu/research/the-science-research-initiative/";
const PHYSICS_REU_URL = "https://www.physics.utah.edu/reu-opportunities/";
const PHYSICS_SURF_URL = "https://www.physics.utah.edu/surf-opportunities/";
const PHYSICS_WEAO_URL = "https://www.physics.utah.edu/weao/";
const GEOLOGY_HOME_URL = "https://earth.utah.edu/";
const GEOLOGY_CURRENT_UNDERGRAD_URL = "https://earth.utah.edu/undergrad_current/index.php";
const GEOLOGY_PROSPECTIVE_UNDERGRAD_URL = "https://earth.utah.edu/students/prospective-undergrads.php";
const GEOLOGY_SCHOLARSHIPS_URL = "https://earth.utah.edu/financial_aid/undergraduate-scholarships.php";
const GEOLOGY_RESEARCH_URL = "https://earth.utah.edu/research/";
const GEOLOGY_LABS_URL = "https://earth.utah.edu/research/labs.php";
const GEOLOGY_STUDENT_GROUPS_URL = "https://earth.utah.edu/get-involved/student-groups.php";
const GEOLOGY_EVENTS_URL = "https://earth.utah.edu/events/";
const GEOLOGY_ETHICS_URL = "https://earth.utah.edu/student_success/geo-ethics-policy.php";
const CMES_INTERNSHIPS_URL = "https://www.mines.utah.edu/internships/internship-postings.php";
const MINING_HOME_URL = "https://mining.utah.edu/";
const MINING_UNDERGRAD_URL = "https://mining.utah.edu/undergraduate-program/";
const MINING_SCHOLARSHIPS_URL = "https://mining.utah.edu/scholarships/";
const MINING_MAJOR_MAP_URL = "https://majormaps.utah.edu/majors_list/view-major-map.php?plan_code=MGEN";
const MSE_HOME_URL = "https://mse.utah.edu/";
const MSE_ADVISING_URL = "https://mse.utah.edu/undergraduate-academic-advising/";
const METALLURGICAL_BS_URL = "https://mse.utah.edu/met-e-bs-program-of-study/";
const MSE_PROSPECTIVE_URL = "https://mse.utah.edu/prospective-students-page/";
const MSE_BSMS_URL = "https://mse.utah.edu/bsms-program-of-study/";
const MSE_INTERNSHIPS_URL = "https://mse.utah.edu/internship/";
const MSE_RESEARCH_URL = "https://mse.utah.edu/research-2/";
const MSE_FACULTY_RESEARCH_URL = "https://mse.utah.edu/faculty-research/";
const MSE_SCHOLARSHIPS_URL = "https://mse.utah.edu/materials-science-engineering-scholarships/";

export const RESOURCES_DATA: Resource[] = [
  // --- TIER 1 - FRESHMAN & SOPHOMORE ---
  // Academic Support
  {
    id: "academic-resources-hub",
    name: "Academic Resources Hub",
    description: "Central College of Science hub with top advisor tips, peer tutoring connections, and effective academic support tools.",
    url: "https://science.utah.edu/students/academic_resources/",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["tutoring", "advising", "help", "tips", "resources"]
  },
  {
    id: "the-learning-center",
    name: "The Learning Center",
    description: "Note-taking strategies, customized study skills workshops, and personalized general academic coaching to keep you organized.",
    url: "https://learningcenter.utah.edu",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["study skills", "coaching", "learning", "tutoring"]
  },
  {
    id: "writing-center",
    name: "Writing Center",
    description: "One-on-one writing assistance and supportive feedback for term papers, scientific reports, and any creative assignments.",
    url: "https://writingcenter.utah.edu",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["writing", "help", "papers", "reports"]
  },
  {
    id: "e-tutoring-online",
    name: "E-Tutoring (Online)",
    description: "Remote expert tutoring available online across a massive range of general education and early science subjects.",
    url: "https://etutoringonline.org/index.cfm?e=10",
    category: "Academic Help",
    tier: 1,
    relevanceTags: ["online tutoring", "remote", "chemistry", "math", "physics"]
  },
  {
    id: "student-success-advocates",
    name: "Student Success Advocates",
    description: "Compassionate, personalized mentor support to help navigate first-year transition challenges and campus bureaucracy.",
    url: "https://studentsuccess.utah.edu/",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["advocates", "support", "first-gen", "mentorship", "success", "freshman", "first year", "new student"]
  },
  {
    id: "trio-program",
    name: "TRIO Student Support Services",
    description: "Dedicated resources and supportive community for first-generation, low-income college students, and students with disabilities.",
    url: "https://trio.utah.edu/",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["first-generation", "low-income", "disability", "trio", "community"]
  },
  {
    id: "chemistry-tutoring-center",
    name: "Chemistry Tutoring & Study Rooms",
    description: "General chemistry and organic chemistry study rooms in the Henry Eyring Building with free help for concepts, homework, lab prep, and exam study. Upper-division students can ask an advisor about graduate-student tutoring.",
    url: CHEMISTRY_ADVISING_URL,
    category: "Academic Help",
    subcategory: "Tutoring, Writing & Study Skills",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: "all",
    relevanceTags: [
      "chemistry",
      "chemistry tutoring center",
      "chemistry tutoring",
      "study rooms",
      "organic chemistry",
      "general chemistry",
      "henry eyring building",
      "graduate student tutoring",
      "lab prep",
      "exam study"
    ]
  },
  {
    id: "chemistry-academic-advising",
    name: "Chemistry Academic Advising & Drop-In Help",
    description: "Chemistry and Biochemistry advisors for declaring a major or minor, degree planning, transfer credits, graduation requirements, course timing, appointments, and drop-in routing.",
    url: CHEMISTRY_ADVISING_URL,
    category: "Advising & Course Planning",
    subcategory: "Advising & Appointments",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: "all",
    contact: "Braydon Rawlings / Nat Eastwood",
    relevanceTags: [
      "chemistry advising",
      "chemistry advisor",
      "biochemistry advising",
      "drop-in help",
      "schedule appointment",
      "declare chemistry major",
      "chemistry minor",
      "transfer credits",
      "degree planning"
    ]
  },
  {
    id: "chemistry-permission-codes",
    name: "Chemistry Permission Codes",
    description: "Direct Chemistry route for requesting permission codes, class overrides, and registration help when a course needs department approval.",
    url: CHEMISTRY_PERMISSION_CODES_URL,
    category: "Advising & Course Planning",
    subcategory: "Registration & Placement",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: "all",
    relevanceTags: [
      "chemistry permission codes",
      "permission code",
      "request permission code",
      "class override",
      "registration",
      "add class",
      "chemistry courses"
    ]
  },
  {
    id: "chemistry-ap-lab-notebook-evaluation",
    name: "Chemistry AP Lab Notebook Evaluation",
    description: "Instructions for students submitting AP lab notebooks for Chemistry lab credit review, including drop-off expectations and evaluation criteria.",
    url: CHEMISTRY_ADVISING_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: 1,
    relevanceTags: [
      "ap lab notebook",
      "ap chemistry lab",
      "chem 1215",
      "lab credit",
      "prior credit",
      "evaluation criteria",
      "new student",
      "first year",
      "freshman"
    ]
  },
  {
    id: "biology-undergraduate-students",
    name: "Biology Undergraduate Student Hub",
    description: "Biology undergraduate landing page that points students toward advising, degree options, research, scholarships, financial aid, forms, and core student resources.",
    url: BIOLOGY_UNDERGRAD_URL,
    category: "Advising & Course Planning",
    subcategory: "Advising & Appointments",
    department: "Biology",
    sourceUrl: BIOLOGY_HOME_URL,
    sourceLabel: "Biology home",
    tier: "all",
    relevanceTags: [
      "biology undergraduate students",
      "biology student resources",
      "biology forms",
      "biology advising",
      "biology scholarships",
      "biology research",
      "new student",
      "first year"
    ]
  },
  {
    id: "biology-academic-advising",
    name: "Biology Academic Advising & Drop-In Help",
    description: "Biology advising appointments, drop-in advising, prospective-student advising, major requirement help, transfer questions, and advisor contacts in Crocker Science Center.",
    url: BIOLOGY_ADVISING_URL,
    category: "Advising & Course Planning",
    subcategory: "Advising & Appointments",
    department: "Biology",
    sourceUrl: BIOLOGY_HOME_URL,
    sourceLabel: "Biology home",
    tier: "all",
    contact: "Biology Advising Team / biosciadvising@utah.edu",
    relevanceTags: [
      "biology advising",
      "biology advisor",
      "biological sciences advising",
      "drop-in advising",
      "schedule appointment",
      "major requirements",
      "prospective biology students",
      "transfer questions",
      "crocker science center"
    ]
  },
  {
    id: "biology-degree-options",
    name: "Biology Degree Options & Emphases",
    description: "Direct Biology degree-option guide for BS/BA paths, emphases, teaching degrees, minors, combined BS/MS and M.Ed. programs, and older degree requirements.",
    url: BIOLOGY_DEGREE_OPTIONS_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Biology",
    sourceUrl: BIOLOGY_HOME_URL,
    sourceLabel: "Biology home",
    tier: "all",
    relevanceTags: [
      "biology degree options",
      "biology bs",
      "biology ba",
      "biology emphasis",
      "health anatomy physiology",
      "cell molecular biology",
      "ecology evolution environmental biology",
      "integrative organismal biology",
      "biology minor",
      "teaching major",
      "combined bs ms"
    ]
  },
  {
    id: "biology-permission-codes",
    name: "Biology Permission Codes",
    description: "Biology permission-code page for BIOL registration issues, Fall permission-code forms, co-requisites, prerequisite errors, and BIOL 4955 research contract routing.",
    url: BIOLOGY_PERMISSION_CODES_URL,
    category: "Advising & Course Planning",
    subcategory: "Registration & Placement",
    department: "Biology",
    sourceUrl: BIOLOGY_HOME_URL,
    sourceLabel: "Biology home",
    tier: "all",
    contact: "Biology Permission Code Team",
    relevanceTags: [
      "biology permission codes",
      "biol permission code",
      "permission code",
      "registration error",
      "prerequisite error",
      "co-requisite",
      "biol 4955",
      "research contract",
      "individual research",
      "course override"
    ]
  },
  {
    id: "biology-transfer-course-petitions",
    name: "Biology Transfer Course Petitions",
    description: "Biology transfer-course guidance for in-state and out-of-state courses, Transferology, petition timing, degree-audit exceptions, and permission-code follow-up.",
    url: BIOLOGY_TRANSFER_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Biology",
    sourceUrl: BIOLOGY_HOME_URL,
    sourceLabel: "Biology home",
    tier: "all",
    contact: "bioscitransfers@utah.edu",
    relevanceTags: [
      "biology transfer",
      "transfer course petition",
      "transferology",
      "in-state transfer guide",
      "out-of-state transfer",
      "degree audit exception",
      "biology lab transfer",
      "transfer credits"
    ]
  },
  {
    id: "chemistry-research-internships-guide",
    name: "Chemistry Research & Internships Guide",
    description: "Chemistry-specific guidance for finding faculty research, internship experience, UROP funding, and ways to connect research or internships to degree progress.",
    url: CHEMISTRY_ADVISING_URL,
    category: "Research & Internships",
    subcategory: "Getting Started in Research",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: "all",
    relevanceTags: [
      "chemistry research",
      "chemistry internships",
      "research and internships",
      "faculty research",
      "urop funding path",
      "undergraduate research",
      "internship credit",
      "chemistry major"
    ]
  },
  {
    id: "biology-undergraduate-research-pathways",
    name: "Biology Undergraduate Research Pathways",
    description: "Biology research guide for finding faculty labs across ecology, genomics, molecular biology, neurobiology, conservation biology, and other SBS research areas.",
    url: BIOLOGY_RESEARCH_URL,
    category: "Research & Internships",
    subcategory: "Getting Started in Research",
    department: "Biology",
    sourceUrl: BIOLOGY_HOME_URL,
    sourceLabel: "Biology home",
    tier: "all",
    relevanceTags: [
      "biology research",
      "biological sciences research",
      "faculty labs",
      "research interest areas",
      "ecology",
      "genomics",
      "molecular biology",
      "neurobiology",
      "conservation biology",
      "undergraduate research"
    ]
  },
  {
    id: "biology-honors-thesis-research",
    name: "Biology Honors Thesis Research",
    description: "Biology Honors track details for students planning a research-oriented curriculum, BIOL 4995 independent research, thesis preparation, and public thesis presentation.",
    url: BIOLOGY_HONORS_URL,
    category: "Research & Internships",
    subcategory: "Present & Publish",
    department: "Biology",
    sourceUrl: BIOLOGY_HOME_URL,
    sourceLabel: "Biology home",
    tier: 2,
    contact: "Biology Honors Advisor: Naina Phadnis",
    relevanceTags: [
      "biology honors",
      "honors thesis",
      "biology thesis",
      "biol 4995",
      "biol 4999",
      "independent research",
      "honors college",
      "public presentation"
    ]
  },
  {
    id: "biology-internships-biol-4965",
    name: "Biology Internships & BIOL 4965 Credit",
    description: "Biology internship page for real-world experience, biology-focused internship listings, academic credit, BIOL 4965 independent study, and internship coordinator contact.",
    url: BIOLOGY_INTERNSHIPS_URL,
    category: "Research & Internships",
    subcategory: "Research Programs & Internships",
    department: "Biology",
    sourceUrl: BIOLOGY_HOME_URL,
    sourceLabel: "Biology home",
    tier: "all",
    contact: "Naina Phadnis / biology internship coordinator",
    relevanceTags: [
      "biology internships",
      "biol 4965",
      "internship credit",
      "biology-focused internships",
      "professional experience",
      "field experience",
      "career experience",
      "current internships"
    ]
  },
  {
    id: "biology-facilities-field-stations",
    name: "Biology Facilities, Centers & Field Stations",
    description: "Biology facilities and field-station resources covering research centers, DNA sequencing, microscopy, SIRFER, greenhouses, Rio Mesa, and Red Butte Canyon.",
    url: BIOLOGY_CENTERS_FIELD_STATIONS_URL,
    category: "Research & Internships",
    subcategory: "Labs & Research Centers",
    department: "Biology",
    sourceUrl: BIOLOGY_FACILITIES_URL,
    sourceLabel: "Biology facilities",
    tier: "all",
    relevanceTags: [
      "biology facilities",
      "field stations",
      "centers and field stations",
      "dna sequencing",
      "advanced microscopy",
      "sirfer",
      "greenhouse",
      "rio mesa",
      "red butte canyon",
      "research facilities"
    ]
  },
  {
    id: "chemistry-ta-lab-attendant-jobs",
    name: "Chemistry TA & Lab Attendant Jobs",
    description: "Department job paths for Chemistry students, including teaching assistant roles, undergraduate laboratory support, and department-posted chemistry opportunities.",
    url: CHEMISTRY_JOBS_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: "all",
    contact: "TA roles: Prof. Jeff Statler / Lab attendant roles: Ashlie Kinross",
    relevanceTags: [
      "chemistry jobs",
      "chemistry ta",
      "teaching assistant",
      "lab attendant",
      "department job opportunities",
      "undergraduate laboratories",
      "chemistry employment"
    ]
  },
  {
    id: "chemistry-student-engagement",
    name: "Chemistry Student Engagement",
    description: "Department engagement page for ACSSC, Curie Club, ChemSAC, outreach, mentoring, chemistry community, and student professional development.",
    url: CHEMISTRY_STUDENT_ENGAGEMENT_URL,
    category: "Community & Student Orgs",
    subcategory: "Student Organizations",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: "all",
    relevanceTags: [
      "chemistry student engagement",
      "chemsac",
      "chem sac",
      "acssc",
      "curie club",
      "chemistry clubs",
      "chemistry outreach",
      "chemistry mentoring",
      "student professional development"
    ]
  },
  {
    id: "mathematics-tutoring-center",
    name: "Mathematics Tutoring Center",
    description: "T. Benny Rushing Math Center with free drop-in tutoring, online tutoring, group study rooms, computer lab access, and support for algebra, calculus, statistics, linear algebra, ODEs, PDEs, and more.",
    url: MATH_CENTER_URL,
    category: "Academic Help",
    subcategory: "Tutoring, Writing & Study Skills",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    contact: "ugrad_services@math.utah.edu",
    relevanceTags: [
      "math",
      "mathematics tutoring",
      "math center",
      "tutoring",
      "online tutoring",
      "group study rooms",
      "computer lab",
      "calculus",
      "linear algebra",
      "statistics",
      "odes",
      "pdes"
    ]
  },
  {
    id: "math-online-lecture-videos",
    name: "Math Online Lecture Videos",
    description: "Department lecture-video library for common lower-division math courses, including quantitative reasoning, college algebra, trigonometry, and Calculus I-III.",
    url: MATH_LECTURES_URL,
    category: "Academic Help",
    subcategory: "Tutoring, Writing & Study Skills",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    relevanceTags: [
      "math lecture videos",
      "online math lectures",
      "math 1030",
      "math 1050",
      "math 1060",
      "math 1210",
      "math 1220",
      "math 2210",
      "calculus videos"
    ]
  },
  {
    id: "math-webwork-course-logins",
    name: "Math WeBWorK Course Logins",
    description: "Math department WeBWorK page listing active homework login links by course and instructor, plus notes on using WeBWorK effectively.",
    url: MATH_WEBWORK_URL,
    category: "Academic Help",
    subcategory: "Tutoring, Writing & Study Skills",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    relevanceTags: [
      "webwork",
      "math homework",
      "homework login",
      "math 1030",
      "math 1050",
      "math 1210",
      "math 1220",
      "math 2210",
      "online homework"
    ]
  },
  {
    id: "physics-astronomy-tutoring",
    name: "Physics Help Lab & Tutoring Resources",
    description: "Physics tutoring page with Help Lab details in the Stewart Building, TA-supported homework help, Math Center routing, and eTutoring links for extra course support.",
    url: PHYSICS_TUTORING_URL,
    category: "Academic Help",
    subcategory: "Tutoring, Writing & Study Skills",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    relevanceTags: [
      "physics",
      "astronomy",
      "physics help lab",
      "physics tutoring",
      "stewart building",
      "ta help",
      "homework help",
      "etutoring",
      "math center",
      "tutoring resources"
    ]
  },
  {
    id: "mines-earth-epicenter",
    name: "Mines & Earth Sciences Student Epicenter",
    description: "Specialized student lounge and focused tutoring support for Geology, Mining, and Metallurgical students.",
    url: "https://www.mines.utah.edu/students/studentepicenter.php",
    category: "Academic Help",
    department: "Geology",
    tier: "all",
    relevanceTags: ["geology", "mining", "metallurgical", "support", "epicenter", "student lounge", "study help"]
  },
  {
    id: "center-disability-access",
    name: "Center for Disability & Access (CDA)",
    description: "Official student disability accommodations office for academic, exam, housing, and campus access support. Apply early because accommodations are not retroactive.",
    url: "https://disability.utah.edu/",
    category: "Academic Help",
    tier: "all",
    contact: "801-581-5020 / info@disability.utah.edu",
    relevanceTags: ["cda", "disability accommodations", "ada", "section 504", "exam accommodations"]
  },
  {
    id: "cda-student-portal",
    name: "CDA Student Portal & Intake",
    description: "Submit new intake forms, upload documentation, request approved accommodations, and connect with accessibility consultants.",
    url: "https://cdaportal.utah.edu",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["cda portal", "intake form", "documentation", "accessibility consultant"]
  },

  // Advising & Course Planning
  {
    id: "academic-advising-hub",
    name: "Advising Center",
    description: "Dedicated Science advisors to help with major selection, understanding graduation paths, and mapping courses.",
    url: "https://science.utah.edu/students/academic-advising/",
    category: "Advising & Course Planning",
    tier: "all",
    relevanceTags: ["advising", "advisors", "major selection", "grad planning"]
  },
  {
    id: "schedule-advising-appointment",
    name: "Schedule Advising Appointment",
    description: "Convenient online scheduler to book a constructive, one-on-one session with your department advisor.",
    url: "https://utah.campus.eab.com",
    category: "Advising & Course Planning",
    tier: "all",
    relevanceTags: ["schedule appointment", "book advisor", "appointments"]
  },
  {
    id: "drop-in-advising",
    name: "Drop-In Advising",
    description: "Get quick answers, clear petition signatures, and course add/drop assistance without needing an appointment.",
    url: "https://science.utah.edu/students/drop-in/",
    category: "Advising & Course Planning",
    tier: "all",
    relevanceTags: ["drop-in", "advising", "quick help", "signature"]
  },
  {
    id: "geology-current-undergraduate-students",
    name: "Geology & Geophysics Current Undergraduate Hub",
    description: "Department undergraduate page for advising reminders, permission-code routing, academic standing, graduation planning, and core student links.",
    url: GEOLOGY_CURRENT_UNDERGRAD_URL,
    category: "Advising & Course Planning",
    subcategory: "Department Advising",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: "all",
    contact: "kelsie.richards@utah.edu / thea.hatfield@utah.edu",
    relevanceTags: [
      "geology",
      "geophysics",
      "current undergraduate",
      "undergraduate students",
      "academic standing",
      "graduation planning",
      "department advising"
    ]
  },
  {
    id: "geology-permission-codes-advising",
    name: "Geology Permission Codes & Advising",
    description: "Geology route for permission codes, faculty approval, advisor follow-up, transfer questions, graduation checks, and undergraduate academic planning.",
    url: GEOLOGY_CURRENT_UNDERGRAD_URL,
    category: "Advising & Course Planning",
    subcategory: "Permission Codes & Registration",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: "all",
    contact: "Kelsie Richards / Thea Hatfield",
    relevanceTags: [
      "geology permission code",
      "geophysics permission code",
      "course override",
      "registration help",
      "faculty approval",
      "advisor",
      "kelsie richards",
      "thea hatfield",
      "transfer students",
      "graduating seniors"
    ]
  },
  {
    id: "geology-prospective-transfer-students",
    name: "Geology Prospective & Transfer Students",
    description: "Prospective undergraduate page for Geology and Geophysics majors, transfer planning, scholarship pointers, program fit, and starting points for new students.",
    url: GEOLOGY_PROSPECTIVE_UNDERGRAD_URL,
    category: "Advising & Course Planning",
    subcategory: "Prospective & Transfer Students",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: 1,
    relevanceTags: [
      "prospective geology student",
      "transfer geology student",
      "geophysics transfer",
      "incoming students",
      "field camp",
      "major planning",
      "new student"
    ]
  },
  {
    id: "mining-undergraduate-program-advising",
    name: "Mining Engineering Undergraduate Program & Advising",
    description: "Mining undergraduate page for program questions, advisor contacts, MAP appointments, course planning, scholarships, and core department student routes.",
    url: MINING_UNDERGRAD_URL,
    category: "Advising & Course Planning",
    subcategory: "Department Advising",
    department: "Mining Engineering",
    sourceUrl: MINING_HOME_URL,
    sourceLabel: "Mining home",
    tier: "all",
    contact: "Braydon Rawlings / Savannah Manwill",
    relevanceTags: [
      "mining engineering advising",
      "mining advisor",
      "mining undergraduate program",
      "map appointment",
      "course planning",
      "program questions",
      "savannah manwill",
      "braydon rawlings",
      "department advising"
    ]
  },
  {
    id: "mining-engineering-major-map",
    name: "Mining Engineering Major Map",
    description: "Major Map route for Mining Engineering milestones, course-planning prompts, internships, career treks, student ambassador opportunities, and four-year progress ideas.",
    url: MINING_MAJOR_MAP_URL,
    category: "Advising & Course Planning",
    subcategory: "Degree Planning",
    department: "Mining Engineering",
    sourceUrl: MINING_UNDERGRAD_URL,
    sourceLabel: "Mining undergrad",
    tier: 1,
    relevanceTags: [
      "mining major map",
      "mining degree plan",
      "mining engineering courses",
      "four year plan",
      "career trek",
      "mining student ambassador",
      "uma ambassador",
      "internships",
      "new student"
    ]
  },
  {
    id: "metallurgical-engineering-advising",
    name: "Metallurgical Engineering Undergraduate Advising",
    description: "MSE department advising page for Metallurgical Engineering students, including current-student appointments, advisor contact, office location, and program routing.",
    url: MSE_ADVISING_URL,
    category: "Advising & Course Planning",
    subcategory: "Department Advising",
    department: "Metallurgical Engineering",
    sourceUrl: MSE_HOME_URL,
    sourceLabel: "MSE home",
    tier: "all",
    contact: "Valerie Del Plain / valerie.del.plain@utah.edu",
    relevanceTags: [
      "metallurgical engineering advising",
      "metallurgical advisor",
      "materials science advising",
      "mse advising",
      "current student appointment",
      "valerie del plain",
      "cme 304",
      "department advising"
    ]
  },
  {
    id: "metallurgical-engineering-bs-program",
    name: "Metallurgical Engineering BS Program",
    description: "Program-of-study page for Metallurgical Engineering degree planning, major courses, program requirements, career context, and undergraduate research preparation.",
    url: METALLURGICAL_BS_URL,
    category: "Advising & Course Planning",
    subcategory: "Degree Planning",
    department: "Metallurgical Engineering",
    sourceUrl: MSE_HOME_URL,
    sourceLabel: "MSE home",
    tier: "all",
    relevanceTags: [
      "metallurgical engineering bs",
      "met e bs",
      "metallurgical degree plan",
      "program of study",
      "major requirements",
      "major courses",
      "physical metallurgy",
      "mineral processing",
      "chemical metallurgy",
      "degree planning"
    ]
  },
  {
    id: "metallurgical-engineering-prospective-students",
    name: "Metallurgical Engineering Prospective Students",
    description: "Prospective-student page for students considering Metallurgical Engineering or Materials Science & Engineering, with admissions, scholarship, research-area, and career-outlook context.",
    url: MSE_PROSPECTIVE_URL,
    category: "Advising & Course Planning",
    subcategory: "Prospective & Transfer Students",
    department: "Metallurgical Engineering",
    sourceUrl: MSE_HOME_URL,
    sourceLabel: "MSE home",
    tier: 1,
    relevanceTags: [
      "prospective metallurgical engineering",
      "prospective mse student",
      "materials science prospective",
      "admissions information",
      "scholarship information",
      "career outlook",
      "physical metallurgy",
      "nuclear materials",
      "recycling",
      "new student"
    ]
  },
  {
    id: "mse-bs-ms-program",
    name: "Materials Science & Engineering BS/MS Program",
    description: "Combined BS/MS route for Materials Science and related MSE department students interested in undergraduate research, junior-year application timing, and accelerated master’s progress.",
    url: MSE_BSMS_URL,
    category: "Advising & Course Planning",
    subcategory: "Degree Planning",
    department: "Metallurgical Engineering",
    sourceUrl: MSE_HOME_URL,
    sourceLabel: "MSE home",
    tier: 2,
    relevanceTags: [
      "bs ms program",
      "combined bs ms",
      "materials science bs ms",
      "mse bs ms",
      "accelerated masters",
      "undergraduate research",
      "junior year application",
      "graduate classes"
    ]
  },
  {
    id: "atmos-undergraduate-students",
    name: "Atmospheric Sciences Undergraduate Hub",
    description: "Atmos undergraduate landing page for the BS degree, minor, course information, scholarships, AMS student chapter, Utah Weather Center, and advising links.",
    url: ATMOS_UNDERGRAD_URL,
    category: "Advising & Course Planning",
    subcategory: "Advising & Appointments",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    relevanceTags: [
      "atmospheric sciences undergraduate",
      "atmos undergraduate",
      "atmos student resources",
      "weather center",
      "ams student chapter",
      "atmos advising",
      "atmos scholarships",
      "course information",
      "new student",
      "first year"
    ]
  },
  {
    id: "atmos-prospective-transfer-students",
    name: "Atmos Prospective & Transfer Students",
    description: "Prospective-student page explaining the Atmospheric Sciences BS, mountain weather and climate focus, National Weather Service preparation, transfer context, and advising contact.",
    url: ATMOS_PROSPECTIVE_URL,
    category: "Advising & Course Planning",
    subcategory: "Advising & Appointments",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: 1,
    contact: "atmos-advising@lists.utah.edu / 801-581-6136",
    relevanceTags: [
      "prospective atmos students",
      "transfer students",
      "atmospheric sciences major",
      "meteorology",
      "national weather service",
      "mountain weather",
      "climate",
      "freshman",
      "first year",
      "new student"
    ]
  },
  {
    id: "atmos-academic-advising-permission-codes",
    name: "Atmos Academic Advising & Permission Codes",
    description: "Atmos advising page for required annual advising, appointment scheduling, transfer course evaluations, permission-code requests, major/minor declarations, and graduation planning.",
    url: ATMOS_ADVISING_URL,
    category: "Advising & Course Planning",
    subcategory: "Advising & Appointments",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    contact: "Marcus Smith / marcus.smith@utah.edu / atmos-advising@lists.utah.edu",
    relevanceTags: [
      "atmos advising",
      "atmospheric sciences advising",
      "atmos advisor",
      "permission codes",
      "atmos permission code",
      "transfer course evaluation",
      "major declaration",
      "minor declaration",
      "graduation planning",
      "dars"
    ]
  },
  {
    id: "atmos-major-emphases-degree-plans",
    name: "Atmos Major, Emphases & Degree Plans",
    description: "Atmospheric Sciences BS page covering the major, Environmental Sciences, Professional Meteorology, Snow and Water Sciences emphases, degree plans, outcomes, and research or internship routes.",
    url: ATMOS_MAJOR_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    contact: "atmos-advising@lists.utah.edu",
    relevanceTags: [
      "atmos major",
      "atmospheric sciences major",
      "environmental sciences emphasis",
      "professional meteorology",
      "snow and water sciences",
      "degree plans",
      "program requirements",
      "meteorology degree",
      "weather forecasting",
      "climate science"
    ]
  },
  {
    id: "atmos-minor-requirements",
    name: "Atmospheric Sciences Minor",
    description: "Atmos minor requirements page covering the six-course minor, advisor consultation, science and engineering student routing, and minimum grade expectations.",
    url: ATMOS_MINOR_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    contact: "atmos-advising@lists.utah.edu / 801-581-6136",
    relevanceTags: [
      "atmos minor",
      "atmospheric sciences minor",
      "weather minor",
      "climate minor",
      "six courses",
      "advisor consultation",
      "minor requirements"
    ]
  },
  {
    id: "atmos-course-catalog",
    name: "ATMOS Course Catalog",
    description: "Catalog listing for Atmospheric Sciences courses, useful for course descriptions, ATMOS subject searches, prerequisites, credits, and schedule planning.",
    url: ATMOS_COURSES_URL,
    category: "Advising & Course Planning",
    subcategory: "Registration & Placement",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_UNDERGRAD_URL,
    sourceLabel: "Atmos undergrad",
    tier: "all",
    relevanceTags: [
      "atmos courses",
      "atmos course catalog",
      "atmos course information",
      "course descriptions",
      "meteorology courses",
      "climate courses",
      "registration",
      "prerequisites"
    ]
  },
  {
    id: "atmos-capstone-experiential-learning",
    name: "Atmos Capstone & Experiential Learning",
    description: "Capstone page for required Atmospheric Sciences experiential learning through ATMOS 5800/5810, undergraduate research projects, or career-focused internships.",
    url: ATMOS_CAPSTONE_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: 2,
    contact: "atmos-advising@lists.utah.edu",
    relevanceTags: [
      "atmos capstone",
      "experiential learning",
      "atmos 5800",
      "atmos 5810",
      "undergraduate research project",
      "career-focused internship",
      "capstone project",
      "graduation requirement"
    ]
  },
  {
    id: "math-placement",
    name: "Math Placement Guide",
    description: "Math placement guide covering ALEKS, ACT/SAT, AP/IB, concurrent enrollment, transfer courses, testing options, score tables, and first math-course decisions.",
    url: MATH_PLACEMENT_URL,
    category: "Advising & Course Planning",
    subcategory: "Registration & Placement",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: 1,
    relevanceTags: [
      "math placement",
      "aleks",
      "aleks math placement",
      "act math",
      "sat math",
      "ap ib math",
      "transfer math",
      "starting calculus",
      "first math course",
      "new student",
      "first year"
    ]
  },
  {
    id: "math-academic-advising",
    name: "Math & Bioinformatics Academic Advising",
    description: "Mathematics advising for declaring a major or minor, academic plans, prerequisites, graduation requirements, course availability, transfer timing, and drop-in advising.",
    url: MATH_ADVISING_URL,
    category: "Advising & Course Planning",
    subcategory: "Advising & Appointments",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    contact: "advisor@math.utah.edu",
    relevanceTags: [
      "math advising",
      "mathematics advising",
      "bioinformatics advising",
      "math advisor",
      "declare math major",
      "math minor",
      "drop-in advising",
      "schedule appointment",
      "graduation requirements",
      "course prerequisites"
    ]
  },
  {
    id: "math-majors-minors",
    name: "Math Majors, Minors & Combined Programs",
    description: "Mathematics major/minor guide for math, applied math, statistics emphasis, teaching, bioinformatics, honors, combined BS/MS, and advisor routing.",
    url: MATH_UNDERGRAD_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    relevanceTags: [
      "math majors",
      "math minors",
      "mathematics major",
      "applied mathematics",
      "statistics emphasis",
      "bioinformatics major",
      "math teaching major",
      "math honors",
      "combined bs ms",
      "degree options"
    ]
  },
  {
    id: "math-permission-codes-registration",
    name: "Math Permission Codes & Registration Issues",
    description: "Math registration page for prerequisite enforcement, permission-code requests, transfer course evaluations, AP/IB questions, repeat-course situations, and restricted-section issues.",
    url: MATH_REGISTRATION_URL,
    category: "Advising & Course Planning",
    subcategory: "Registration & Placement",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    contact: "advisor@math.utah.edu",
    relevanceTags: [
      "math permission codes",
      "permission code",
      "registration issues",
      "math registration",
      "transfer course evaluation",
      "prerequisite error",
      "restricted section",
      "repeat course",
      "ap ib scores",
      "course override"
    ]
  },
  {
    id: "math-department-forms",
    name: "Mathematics Department Forms",
    description: "Math department forms page for undergraduate permission-code prerequisite appeals, department event calendar requests, and other department forms.",
    url: MATH_FORMS_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    relevanceTags: [
      "math forms",
      "mathematics forms",
      "permission appeal",
      "prerequisite appeal",
      "undergraduate permission code",
      "department event calendar",
      "forms"
    ]
  },
  {
    id: "math-courses-textbooks-schedules",
    name: "Math Courses, Textbooks & Schedules",
    description: "Math department schedule page for textbook information, current and future course offerings, university schedule links, important dates, final exams, and catalog/course-description links.",
    url: MATH_COURSES_URL,
    category: "Advising & Course Planning",
    subcategory: "Registration & Placement",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    relevanceTags: [
      "math courses",
      "course schedules",
      "textbook information",
      "math textbooks",
      "math course descriptions",
      "important dates",
      "final exams",
      "catalog",
      "registration"
    ]
  },
  {
    id: "physics-academic-advising",
    name: "Physics & Astronomy Academic Advising",
    description: "Physics advising page for appointments, drop-in routing, declaring a major or minor, academic plans, graduation requirements, prerequisites, and advisor contact.",
    url: PHYSICS_ADVISING_URL,
    category: "Advising & Course Planning",
    subcategory: "Advising & Appointments",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    contact: "Stacie Cuadro / uadvising@physics.utah.edu",
    relevanceTags: [
      "physics advising",
      "astronomy advising",
      "physics advisor",
      "uadvising physics",
      "declare physics major",
      "physics minor",
      "drop-in advising",
      "schedule appointment",
      "graduation requirements",
      "course prerequisites"
    ]
  },
  {
    id: "physics-majors-emphases-minors",
    name: "Physics Majors, Emphases & Minors",
    description: "Degree planning page for Physics major options, emphases, minors, course requirements, four-year plans, catalog links, and future teaching schedules.",
    url: PHYSICS_DEGREES_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    contact: "uadvising@physics.utah.edu",
    relevanceTags: [
      "physics majors",
      "physics emphases",
      "physics minors",
      "astronomy emphasis",
      "physics degree",
      "four year teaching plan",
      "course requirements",
      "degree options",
      "physics catalog",
      "new student"
    ]
  },
  {
    id: "physics-permission-codes-transfer-evaluations",
    name: "Physics Permission Codes & Transfer Evaluations",
    description: "Physics registration page for permission-code requests, transfer course evaluations, late-add procedures, prerequisite issues, section-specific codes, and processing timing.",
    url: PHYSICS_PERMISSIONS_URL,
    category: "Advising & Course Planning",
    subcategory: "Registration & Placement",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    contact: "uadvising@physics.utah.edu",
    relevanceTags: [
      "physics permission codes",
      "permission code",
      "physics transfer evaluation",
      "transfer course evaluation",
      "late add",
      "prerequisite issue",
      "section number",
      "registration help",
      "course override",
      "physics registration"
    ]
  },
  {
    id: "physics-undergraduate-handbook",
    name: "Physics & Astronomy Undergraduate Handbook",
    description: "Archived undergraduate handbook PDF for Physics & Astronomy degree requirements, policies, advising references, research routes, and student planning context.",
    url: PHYSICS_HANDBOOK_URL,
    category: "Advising & Course Planning",
    subcategory: "Requirements & Policies",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_UNDERGRAD_URL,
    sourceLabel: "Physics undergrad",
    tier: "all",
    relevanceTags: [
      "physics handbook",
      "undergraduate handbook",
      "physics requirements",
      "astronomy requirements",
      "degree policies",
      "student handbook",
      "course planning"
    ]
  },
  {
    id: "physics-honors-program",
    name: "Physics & Astronomy Honors Program",
    description: "Honors pathway for Physics students, including accelerated coursework, serious research engagement, GPA expectations, thesis work, and public presentation requirements.",
    url: PHYSICS_HONORS_URL,
    category: "Research & Internships",
    subcategory: "Present & Publish",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: 2,
    relevanceTags: [
      "physics honors",
      "astronomy honors",
      "honors thesis",
      "physics thesis",
      "honors college",
      "public presentation",
      "accelerated curriculum",
      "research thesis"
    ]
  },
  {
    id: "writing-placement",
    name: "Writing Placement Guide",
    description: "Guides and diagnostic metrics to identify the absolute best writing class for your current college preparation stage.",
    url: "https://writing.utah.edu/undergraduate/writingplacement.php",
    category: "Advising & Course Planning",
    tier: 1,
    relevanceTags: ["writing placement", "english code", "writing requirement"]
  },
  {
    id: "major-maps",
    name: "Major Maps Finder",
    description: "Interactive general education & major course timelines. Get semester-by-semester visual recommendations.",
    url: "https://majormaps.utah.edu/",
    category: "Advising & Course Planning",
    tier: "all",
    relevanceTags: ["major map", "degree plan", "interactive roadmap"]
  },
  {
    id: "graduation-worksheet",
    name: "Graduation Requirement Worksheet",
    description: "Self-tracking spreadsheet guide to easily audit your own general education, diversity, and degree milestones.",
    url: "https://generaleducation.utah.edu/_resources/documents/new-grad-req-worksheet-updated.pdf",
    category: "Advising & Course Planning",
    tier: "all",
    relevanceTags: ["graduation worksheet", "audit requirements", "gen-ed tracking"]
  },
  {
    id: "ap-ib-prior-credit",
    name: "AP/IB Prior Learning Credit",
    description: "Apply your Advanced Placement or International Baccalaureate test results toward college-recognized gen-ed credits.",
    url: "https://admissions.utah.edu/information-resources/prior-learning-credit/",
    category: "Advising & Course Planning",
    tier: 1,
    relevanceTags: ["ap", "ib", "transfer credits", "prior learning"]
  },
  {
    id: "how-to-register-video",
    name: "How to Register (Video Tutorial)",
    description: "Comforting video series guiding first-time students step-by-step through the university online course registration portal.",
    url: "https://www.youtube.com/playlist?list=PLRSfrtU7WcZRnjyLsMjco1KSf-KIb_TVd",
    category: "Advising & Course Planning",
    tier: 1,
    relevanceTags: ["register info", "how-to video", "enroll guide", "classes"]
  },
  {
    id: "first-semester-planning",
    name: "First Semester Course Planning",
    description: "Helpful setup templates curated specifically for newly admitted science freshmen to plan an eye-opening first schedule.",
    url: "https://science.utah.edu/orientation/",
    category: "Advising & Course Planning",
    tier: 1,
    relevanceTags: ["first semester", "orientation", "planning template", "freshman", "first year", "first-year", "new student"]
  },
  {
    id: "academic-catalogs",
    name: "Official Academic Catalogs",
    description: "The complete textbook legal record of all course profiles, credit breakdowns, and university academic code policies.",
    url: "https://science.utah.edu/academic-catalogs/",
    category: "Advising & Course Planning",
    tier: "all",
    relevanceTags: ["catalogs", "policies", "rules", "credits"]
  },
  {
    id: "gen-ed-petition",
    name: "General Education Course Petition",
    description: "Formally request transfer, AP, or alternative courses to satisfy specific general education core requirements.",
    url: "https://requirements.utah.edu/advising-resources/secure/petition-form.php",
    category: "Advising & Course Planning",
    tier: "all",
    relevanceTags: ["petition", "transfer match", "gen-ed waiver"]
  },
  {
    id: "late-withdrawal-petitions",
    name: "Late Academic Withdrawal Petitions",
    description: "Clear process guidance and forms to request extenuating exception withdrawals or section changes after standard deadlines.",
    url: "https://science.utah.edu/students/late-withdrawls/",
    category: "Advising & Course Planning",
    tier: "all",
    relevanceTags: ["late drop", "extenuating withdrawal", "petition exception"]
  },

  // Scholarships & Financial Aid (Start Early)
  {
    id: "scholarship-universe-portal",
    name: "ScholarshipUniverse Portal",
    description: "The ultimate single application software. Fill it out once to be instantly matched with ALL eligible university & College of Science scholarships.",
    url: "https://utah.scholarshipuniverse.com/student/application/25730/847257",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "Feb 15 annually",
    relevanceTags: ["scholarships", "centralized portal", "financial aid", "universe"]
  },
  {
    id: "fafsa-federal-aid",
    name: "FAFSA Federal Student Aid",
    description: "The essential annually updated federal application ensuring access to student loans, interest-subsidized work studies, and Pell Grants.",
    url: "https://financialaid.utah.edu/types-of-aid/fafsa.php",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "ASAP each fall",
    relevanceTags: ["fafsa", "loans", "pell grant", "government funding"]
  },
  {
    id: "financial-aid-counselor",
    name: "Financial Aid Counselor",
    description: "Speak with a compassionate representative one-on-one to evaluate emergency grants, payment timelines, or financial hurdles.",
    url: "https://financialaid.utah.edu/contact-us.php",
    category: "Scholarships & Financial Aid",
    tier: "all",
    relevanceTags: ["counselor", "financial help", "tuition timeline", "emergency fund"]
  },
  {
    id: "union-scholarships",
    name: "Union Scholarships",
    description: "Scholarship hub for A. Ray Olpin Student Union awards, application information, and ways Union involvement can connect to financial support.",
    url: "https://www.union.utah.edu/about-us/union-scholarships/",
    category: "Scholarships & Financial Aid",
    subcategory: "Scholarships",
    tier: "all",
    relevanceTags: ["union scholarships", "student union", "scholarship awards", "campus life funding"]
  },
  {
    id: "access-scholars-program",
    name: "ACCESS Scholars Program",
    description: "Multi-year cohort support network connecting women and underrepresented STEM leaders to monetary awards, peer mentors, and 800+ high-achieving alumnae.",
    url: "https://science.utah.edu/access/",
    category: "Scholarships & Financial Aid",
    tier: 1,
    deadline: "Feb 1 annually",
    relevanceTags: ["access scholars", "women in stem", "cohort scholarship", "outstanding"]
  },
  {
    id: "atmos-science-scholarships",
    name: "Atmospheric Sciences Scholarships",
    description: "Department scholarship page for declared Atmospheric Sciences majors, including GPA and full-time enrollment requirements, application routing, financial-aid links, and conference travel funds.",
    url: ATMOS_SCHOLARSHIPS_URL,
    category: "Scholarships & Financial Aid",
    subcategory: "Department Scholarships",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    deadline: "Feb 15",
    contact: "atmos-advising@lists.utah.edu / alex.munoz@utah.edu",
    relevanceTags: [
      "atmospheric sciences",
      "atmos scholarships",
      "atmospheric sciences scholarships",
      "meteorology funding",
      "weather science funding",
      "department scholarships",
      "travel funds",
      "conference travel",
      "financial aid",
      "tuition aid"
    ]
  },
  {
    id: "biology-scholarships",
    name: "Biology Scholarships & Research Support",
    description: "School of Biological Sciences scholarship page with Biology-major awards, undergraduate research support, ScholarshipUniverse routing, deadlines, and financial-aid advising links.",
    url: BIOLOGY_SCHOLARSHIPS_URL,
    category: "Scholarships & Financial Aid",
    subcategory: "Department Scholarships",
    department: "Biology",
    sourceUrl: BIOLOGY_HOME_URL,
    sourceLabel: "Biology home",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: [
      "biology",
      "biology scholarships",
      "biological sciences scholarships",
      "undergraduate research support",
      "scholarshipuniverse",
      "tuition aid",
      "biology awards",
      "financial aid counselor"
    ]
  },
  {
    id: "chemistry-scholarships",
    name: "Chemistry Undergraduate Awards & Scholarships",
    description: "Department award and scholarship page for undergraduate Chemistry students, including ACS division awards, mentor awards, department scholarships, and application-facing award details.",
    url: CHEMISTRY_UNDERGRAD_AWARDS_URL,
    category: "Scholarships & Financial Aid",
    subcategory: "Department Scholarships",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: [
      "chemistry",
      "chemistry scholarships",
      "chemistry awards",
      "undergraduate awards",
      "acs awards",
      "mentor awards",
      "department scholarships",
      "stipend help"
    ]
  },
  {
    id: "mathematics-scholarships",
    name: "Mathematics Undergraduate Scholarships",
    description: "Department of Mathematics scholarship page for math, applied math, and bioinformatics students, including department awards, ScholarshipUniverse routing, FAFSA notes, and application timing.",
    url: MATH_SCHOLARSHIPS_URL,
    category: "Scholarships & Financial Aid",
    subcategory: "Department Scholarships",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: [
      "math",
      "mathematics scholarships",
      "math scholarships",
      "applied mathematics scholarship",
      "bioinformatics scholarships",
      "department scholarships",
      "scholarshipuniverse",
      "fafsa",
      "tuition aid"
    ]
  },
  {
    id: "geology-geophysics-scholarships",
    name: "Geology & Geophysics Scholarships",
    description: "Department scholarship page for Geology and Geophysics undergraduates, including research-expense support, field-related funding, eligibility details, and ScholarshipUniverse routing.",
    url: GEOLOGY_SCHOLARSHIPS_URL,
    category: "Scholarships & Financial Aid",
    subcategory: "Department Scholarships",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: "all",
    deadline: "Feb 15",
    contact: "tonie.vandam@utah.edu",
    relevanceTags: [
      "geology scholarships",
      "geophysics scholarships",
      "earth science scholarships",
      "field work aid",
      "research expenses",
      "undergraduate research funding",
      "scholarshipuniverse",
      "department scholarships"
    ]
  },
  {
    id: "physics-astronomy-scholarships",
    name: "Physics & Astronomy Undergraduate Scholarships",
    description: "Department scholarship page for declared Physics & Astronomy majors, including ScholarshipUniverse application routing, FAFSA reminders, and department award descriptions.",
    url: PHYSICS_SCHOLARSHIPS_URL,
    category: "Scholarships & Financial Aid",
    subcategory: "Department Scholarships",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: [
      "physics",
      "astronomy scholarships",
      "physics scholarships",
      "physics astronomy scholarships",
      "department scholarships",
      "scholarshipuniverse",
      "fafsa",
      "tuition aid",
      "physics funding",
      "astronomy funding"
    ]
  },
  {
    id: "mining-engineering-scholarships",
    name: "Mining Engineering Scholarships",
    description: "Department scholarship page for Mining Engineering students, including Explore More, Browning, and other financial-support opportunities for qualified undergraduate students.",
    url: MINING_SCHOLARSHIPS_URL,
    category: "Scholarships & Financial Aid",
    subcategory: "Department Scholarships",
    department: "Mining Engineering",
    sourceUrl: MINING_HOME_URL,
    sourceLabel: "Mining home",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: [
      "mining engineering scholarships",
      "mining scholarships",
      "explore more scholarship",
      "browning scholarship",
      "department scholarships",
      "financial support",
      "resource development",
      "funding"
    ]
  },
  {
    id: "metallurgical-engineering-scholarships",
    name: "Metallurgical Engineering Scholarships",
    description: "MSE scholarship page explaining separate Metallurgical Engineering department and CMES scholarship routes, including department awards up to $10,000 and contact instructions.",
    url: MSE_SCHOLARSHIPS_URL,
    category: "Scholarships & Financial Aid",
    subcategory: "Department Scholarships",
    department: "Metallurgical Engineering",
    sourceUrl: MSE_HOME_URL,
    sourceLabel: "MSE home",
    tier: "all",
    deadline: "Feb 15",
    contact: "sara.j.wilson@utah.edu",
    relevanceTags: [
      "metallurgical engineering scholarships",
      "metallurgical scholarships",
      "met e scholarships",
      "materials science scholarships",
      "mse scholarships",
      "department scholarships",
      "cmes scholarships",
      "sara wilson",
      "engineering funding"
    ]
  },

  // Research - Get In Early
  {
    id: "science-research-initiative",
    name: "Science Research Initiative (SRI)",
    description: "The absolute gold standard for freshmen. Start working in real scientific laboratories with world-class faculty on day one, even with zero prior experience.",
    url: "https://science.utah.edu/sri/",
    category: "Research & Internships",
    tier: 1,
    deadline: "Start of freshman year",
    relevanceTags: ["sri", "freshman research", "laboratory experience", "no experience", "first year", "new student"]
  },
  {
    id: "sri-cap",
    name: "SRI Career Advancement Program (SRI-CAP)",
    description: "Bridge your fundamental SRI laboratory techniques directly into high-paying corporate internships and career networking tracks.",
    url: "https://science.utah.edu/sri/cap/",
    category: "Research & Internships",
    tier: 1,
    relevanceTags: ["sri-cap", "career bridge", "internships", "professional transition"]
  },
  {
    id: "urop-undergrad-research",
    name: "Undergraduate Research Opportunities Program (UROP)",
    description: "Receive direct paid funding or semester stipends to execute creative original research with a dedicated faculty advisor.",
    url: "https://our.utah.edu/urop/",
    category: "Research & Internships",
    tier: "all",
    deadline: "Varies by semester",
    relevanceTags: ["urop", "paid research", "stipends", "mentored study"]
  },
  {
    id: "spur-summer-research",
    name: "Summer Program for Undergraduate Research (SPUR)",
    description: "An intensive, immersive paid summer research experience connecting undergrads with faculty mentors, housing, and research lectures.",
    url: "https://our.utah.edu/spur/",
    category: "Research & Internships",
    tier: "all",
    deadline: "Spring deadline",
    relevanceTags: ["spur", "summer intensive", "paid stipend", "housing"]
  },
  {
    id: "undergrad-research-symposium",
    name: "Undergraduate Research Symposium (URS)",
    description: "Build confidence and earn credit. Present your emerging research findings via posters to the campus community in a supportive environment.",
    url: "https://our.utah.edu/education-events/urs/",
    category: "Research & Internships",
    tier: "all",
    deadline: "Spring semester",
    relevanceTags: ["symposium", "poster presentation", "academic credential"]
  },
  {
    id: "math-undergraduate-research-opportunities",
    name: "Math Undergraduate Research Opportunities",
    description: "Math department research page covering MATH 4800 research topics, introduction to research projects, independent REU projects, SRI routing, travel support, and URSD context.",
    url: MATH_RESEARCH_URL,
    category: "Research & Internships",
    subcategory: "Getting Started in Research",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    contact: "Tim Tribone / Sean Lawley",
    relevanceTags: [
      "math undergraduate research",
      "mathematics research",
      "math 4800",
      "undergraduate research topics",
      "math reu",
      "independent reu projects",
      "research travel support",
      "ursd",
      "faculty mentor",
      "research symposium"
    ]
  },
  {
    id: "math-directed-reading-program",
    name: "Math Directed Reading Program (DRP)",
    description: "Directed Reading Program that pairs undergraduates with graduate mentors for independent reading projects, weekly meetings, and a public presentation.",
    url: MATH_INVOLVEMENT_URL,
    category: "Research & Internships",
    subcategory: "Getting Started in Research",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    relevanceTags: [
      "directed reading program",
      "drp",
      "math drp",
      "graduate mentor",
      "independent reading",
      "public presentation",
      "math mentoring",
      "undergraduate math project"
    ]
  },
  {
    id: "physics-undergraduate-research",
    name: "Physics & Astronomy Undergraduate Research",
    description: "Department guide for finding Physics and Astronomy research through research matches, faculty groups, SPUR, UROP, SURF, REU programs, presentation routes, and conferences.",
    url: PHYSICS_UNDERGRAD_RESEARCH_URL,
    category: "Research & Internships",
    subcategory: "Getting Started in Research",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    contact: "uadvising@physics.utah.edu",
    relevanceTags: [
      "physics undergraduate research",
      "astronomy undergraduate research",
      "research match",
      "faculty mentor",
      "physics research",
      "astronomy research",
      "physics urop",
      "physics spur",
      "research presentations",
      "physics conferences"
    ]
  },
  {
    id: "geology-geophysics-research-areas",
    name: "Geology & Geophysics Research Areas",
    description: "Department research overview for students exploring faculty labs, geoscience research areas, Earth systems, geophysics, field research, and mentor fit.",
    url: GEOLOGY_RESEARCH_URL,
    category: "Research & Internships",
    subcategory: "Labs & Research Centers",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: "all",
    relevanceTags: [
      "geology research",
      "geophysics research",
      "earth science research",
      "faculty labs",
      "research areas",
      "field research",
      "geoscience",
      "faculty mentor"
    ]
  },
  {
    id: "geology-geophysics-labs",
    name: "Geology & Geophysics Labs",
    description: "Department lab directory for students looking for research groups, technical facilities, field and lab methods, and possible faculty research homes.",
    url: GEOLOGY_LABS_URL,
    category: "Research & Internships",
    subcategory: "Labs & Research Centers",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: "all",
    relevanceTags: [
      "geology labs",
      "geophysics labs",
      "research groups",
      "earth science labs",
      "technical facilities",
      "faculty research",
      "lab placement",
      "research mentor"
    ]
  },
  {
    id: "metallurgical-engineering-undergraduate-research",
    name: "Metallurgical Engineering Undergraduate Research",
    description: "MSE research route for Metallurgical Engineering students exploring undergraduate research, faculty areas, materials under extreme conditions, mineral processing, and structural materials.",
    url: MSE_RESEARCH_URL,
    category: "Research & Internships",
    subcategory: "Getting Started in Research",
    department: "Metallurgical Engineering",
    sourceUrl: MSE_HOME_URL,
    sourceLabel: "MSE home",
    tier: "all",
    relevanceTags: [
      "metallurgical engineering research",
      "mse undergraduate research",
      "materials science research",
      "faculty research",
      "materials under extreme conditions",
      "mineral processing",
      "metal production",
      "structural materials",
      "faculty mentor"
    ]
  },
  {
    id: "metallurgical-engineering-faculty-research",
    name: "Metallurgical Engineering Faculty Research",
    description: "Faculty research overview for students comparing MSE and Metallurgical Engineering research groups, lab interests, and possible mentor matches.",
    url: MSE_FACULTY_RESEARCH_URL,
    category: "Research & Internships",
    subcategory: "Labs & Research Centers",
    department: "Metallurgical Engineering",
    sourceUrl: MSE_HOME_URL,
    sourceLabel: "MSE home",
    tier: "all",
    relevanceTags: [
      "metallurgical faculty research",
      "mse faculty research",
      "materials faculty",
      "research groups",
      "lab placement",
      "faculty mentor",
      "materials labs",
      "metallurgy labs"
    ]
  },
  {
    id: "physics-research-areas",
    name: "Physics & Astronomy Research Areas",
    description: "Department research overview across astronomy, astroparticle physics, biophysics, condensed matter, high energy physics, and physics education research.",
    url: PHYSICS_RESEARCH_URL,
    category: "Research & Internships",
    subcategory: "Labs & Research Centers",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    relevanceTags: [
      "physics research areas",
      "astronomy research",
      "astroparticle physics",
      "biophysics",
      "condensed matter physics",
      "high energy physics",
      "particle physics",
      "physics education research",
      "cosmic rays",
      "neutrinos"
    ]
  },
  {
    id: "physics-reu-opportunities",
    name: "Physics & Astronomy REU Opportunities",
    description: "Department REU page for the 10-week summer research program with faculty mentors, weekly seminars, professional development, stipend, housing, and travel support.",
    url: PHYSICS_REU_URL,
    category: "Research & Internships",
    subcategory: "Research Programs & Internships",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    deadline: "2026 applications closed; watch next cycle",
    contact: "reu@physics.utah.edu",
    relevanceTags: [
      "physics reu",
      "astronomy reu",
      "research experiences for undergrads",
      "summer research",
      "faculty mentor",
      "stipend",
      "housing",
      "travel support",
      "nsf etap",
      "closing symposium"
    ]
  },
  {
    id: "physics-surf-opportunities",
    name: "Physics & Astronomy SURF",
    description: "Summer Undergraduate Research Fellowship for University of Utah physics and astronomy majors, with faculty research projects, seminars, workshops, hourly pay, and a closing poster symposium.",
    url: PHYSICS_SURF_URL,
    category: "Research & Internships",
    subcategory: "Research Programs & Internships",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    deadline: "2026 deadline passed; watch next cycle",
    contact: "reu@physics.utah.edu",
    relevanceTags: [
      "physics surf",
      "astronomy surf",
      "summer undergraduate research fellowship",
      "summer research",
      "hourly wage",
      "poster symposium",
      "faculty mentor",
      "office of undergraduate research",
      "physics majors",
      "astronomy majors"
    ]
  },
  {
    id: "physics-sri-stream",
    name: "Physics SRI Stream",
    description: "Physics department Science Research Initiative stream page, currently highlighting spintronics research and first-year access to lab-based research experience.",
    url: PHYSICS_SRI_URL,
    category: "Research & Internships",
    subcategory: "Getting Started in Research",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: 1,
    relevanceTags: [
      "physics sri",
      "spintronics sri",
      "science research initiative physics",
      "first year research",
      "freshman research",
      "new student research",
      "lab experience",
      "spintronics"
    ]
  },
  {
    id: "atmos-realm-reu",
    name: "Atmos REALM REU",
    description: "Research Experience in Alpine Meteorology summer program with full-time research, faculty mentoring, peer mentoring, field work, professional development, and weather, water, and climate enterprise exposure.",
    url: ATMOS_REU_URL,
    category: "Research & Internships",
    subcategory: "Research Programs & Internships",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    deadline: "Summer 2026 deadline: Feb 14, 2026",
    contact: "Maria Garcia / mag10@utah.edu",
    relevanceTags: [
      "realm reu",
      "atmos reu",
      "atmospheric sciences reu",
      "research experience in alpine meteorology",
      "summer research",
      "mountain meteorology",
      "weather research",
      "climate research",
      "field work",
      "professional development"
    ]
  },
  {
    id: "atmos-realm-research-themes",
    name: "REALM REU Research Themes",
    description: "REALM research themes and project examples covering mountain precipitation, snowpack, wildfire weather, air quality, urban heat, Great Salt Lake dust, and field instrumentation.",
    url: ATMOS_REU_THEMES_URL,
    category: "Research & Internships",
    subcategory: "Getting Started in Research",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_REU_URL,
    sourceLabel: "REALM REU",
    tier: "all",
    relevanceTags: [
      "realm research themes",
      "mountain precipitation",
      "snowpack",
      "wildfire weather",
      "air quality",
      "urban heat",
      "great salt lake dust",
      "field instrumentation",
      "weather equipment",
      "research projects"
    ]
  },
  {
    id: "atmos-research-areas",
    name: "Atmospheric Sciences Research Areas",
    description: "Department research overview for air quality, aerosols, clouds, precipitation and climate, mountain weather, global and regional climate, numerical modeling, and tropical meteorology.",
    url: ATMOS_RESEARCH_URL,
    category: "Research & Internships",
    subcategory: "Labs & Research Centers",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    relevanceTags: [
      "atmos research",
      "atmospheric sciences research",
      "air quality research",
      "cloud climate research",
      "mountain weather",
      "global climate",
      "regional climate",
      "numerical modeling",
      "tropical meteorology",
      "research groups"
    ]
  },

  // Student Organizations & Community
  {
    id: "atmos-ams-student-chapter",
    name: "American Meteorological Society Student Chapter",
    description: "Atmos student chapter for meteorology, air chemistry, climate change, environmental instrumentation, snow science, hikes, weather balloon launches, outreach, and peer connection.",
    url: ATMOS_AMS_URL,
    category: "Community & Student Orgs",
    subcategory: "Student Organizations",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    relevanceTags: [
      "ams student chapter",
      "american meteorological society",
      "atmos clubs",
      "meteorology club",
      "weather balloon",
      "climate change",
      "snow science",
      "outreach",
      "campus connect",
      "student organization"
    ]
  },
  {
    id: "utah-weather-center",
    name: "Utah Weather Center",
    description: "Student-run weather center with forecasting, real-time weather links, NWS products, volunteer opportunities, job and internship routing, and U of U Weather social channels.",
    url: ATMOS_UTE_WEATHER_URL,
    category: "Community & Student Orgs",
    subcategory: "Leadership, Mentoring & Outreach",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    relevanceTags: [
      "utah weather center",
      "ute weather",
      "weather forecasting",
      "forecasters",
      "volunteer opportunities",
      "weather internships",
      "nws products",
      "real-time weather",
      "student forecasting",
      "uofu weather"
    ]
  },
  {
    id: "geology-student-groups",
    name: "Geology & Geophysics Student Groups",
    description: "Department student-groups page for Geology and Geophysics students looking for clubs, peer community, outreach, and ways to get involved.",
    url: GEOLOGY_STUDENT_GROUPS_URL,
    category: "Community & Student Orgs",
    subcategory: "Student Organizations",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: "all",
    relevanceTags: [
      "geology student groups",
      "geology clubs",
      "geophysics clubs",
      "earth science clubs",
      "student organizations",
      "get involved",
      "peer community",
      "outreach"
    ]
  },
  {
    id: "geology-events-refreshment-hour",
    name: "Geology & Geophysics Events",
    description: "Department events page for distinguished lectures, Refreshment Hour, student-group activity, seminars, and current Geology and Geophysics community events.",
    url: GEOLOGY_EVENTS_URL,
    category: "Community & Student Orgs",
    subcategory: "Events & Department Community",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: "all",
    relevanceTags: [
      "geology events",
      "geophysics events",
      "refreshment hour",
      "distinguished lecture series",
      "seminars",
      "department events",
      "student community"
    ]
  },
  {
    id: "organzation-aises",
    name: "AISES Chapter",
    description: "American Indian Science & Engineering Society chapter fostering support, culture, and professional networks for indigenous STEM students.",
    url: "https://www.aises.org/directory/university-utah",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["aises", "indigenous", "native american", "cultural support"]
  },
  {
    id: "organzation-acs",
    name: "American Chemical Society (ACS) Chapter",
    description: "Fun, friendly campus chapter host to chemistry socials, laboratory tours, community science demonstrations, and peer study groups.",
    url: "https://linktr.ee/ACSUofU",
    category: "Community & Student Orgs",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_STUDENT_ENGAGEMENT_URL,
    sourceLabel: "Chemistry engagement",
    tier: "all",
    relevanceTags: ["chemistry", "acs", "acssc", "american chemical society", "social events", "outreach", "chemistry demos"]
  },
  {
    id: "organzation-awm",
    name: "Association for Women in Mathematics (AWM)",
    description: "Inspiring community of women and underrepresented mathematicians providing career mentoring, panel advice, and math tea sessions.",
    url: "https://www.math.utah.edu/awmchapter/",
    category: "Community & Student Orgs",
    department: "Mathematics",
    sourceUrl: MATH_INVOLVEMENT_URL,
    sourceLabel: "Math involvement",
    tier: "all",
    relevanceTags: ["awm", "association for women in mathematics", "women in math", "tea socials", "mentoring", "math community"]
  },
  {
    id: "math-student-involvement-groups",
    name: "Math Student Involvement & Groups",
    description: "Math involvement hub for AWM, Directed Reading Program, Discord community, Math USAC, Pi Mu Epsilon, SIAM, student events, mentoring, and outreach.",
    url: MATH_INVOLVEMENT_URL,
    category: "Community & Student Orgs",
    subcategory: "Student Organizations",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    relevanceTags: [
      "math student involvement",
      "math groups",
      "math clubs",
      "math usac",
      "pi mu epsilon",
      "siam",
      "discord math community",
      "directed reading program",
      "awm",
      "mentoring",
      "outreach"
    ]
  },
  {
    id: "organzation-curie-club",
    name: "Curie Club",
    description: "Open community celebrating diverse STEM identities. Promotes environmental advocacy, research opportunities, and wellness.",
    url: "https://www.curieclub.org/",
    category: "Community & Student Orgs",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_STUDENT_ENGAGEMENT_URL,
    sourceLabel: "Chemistry engagement",
    tier: "all",
    relevanceTags: ["curie club", "chemistry", "all science", "advocacy", "entrepreneurship", "student engagement"]
  },
  {
    id: "organzation-sacnas",
    name: "SACNAS Chapter",
    description: "The premier local chapter of the national network. Promotes Chicanos/Hispanics, Native Americans, and minority STEM leaders in advanced research.",
    url: "https://uofuhealth.utah.edu/sacnas/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["sacnas", "hispanic", "chicano", "minority advancement", "leaders"]
  },
  {
    id: "organzation-ostem",
    name: "oSTEM Chapter",
    description: "Out in Science, Technology, Engineering, and Mathematics. Dedicated to providing LGBTQ+ students with community, safety, and corporate recruiters.",
    url: "https://www.facebook.com/oSTEMUtah/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["ostem", "lgbtq+", "queer stem", "corporate diversity"]
  },
  {
    id: "physics-student-involvement-groups",
    name: "Physics Student Involvement & Groups",
    description: "Physics involvement hub for Campus Connect clubs, SPS, Philosophy of Physics Club, Physics USAC, department events, leadership, mentoring, and campus opportunities.",
    url: PHYSICS_INVOLVEMENT_URL,
    category: "Community & Student Orgs",
    subcategory: "Student Organizations",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    relevanceTags: [
      "physics student involvement",
      "physics clubs",
      "astronomy clubs",
      "campus connect",
      "society of physics students",
      "sps",
      "philosophy of physics club",
      "physics usac",
      "leadership",
      "mentoring"
    ]
  },
  {
    id: "organzation-sps",
    name: "Society of Physics Students (SPS)",
    description: "Campus Connect chapter for Society of Physics Students meetings, department community, opening socials, elections, and peer connection in physics and astronomy.",
    url: "https://getinvolved.utah.edu/organization/sps-university-of-utah-chapter",
    category: "Community & Student Orgs",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_INVOLVEMENT_URL,
    sourceLabel: "Physics involvement",
    tier: "all",
    relevanceTags: [
      "physics",
      "sps",
      "society of physics students",
      "physics club",
      "astronomy community",
      "campus connect",
      "peer community",
      "student organization"
    ]
  },
  {
    id: "organzation-uwompa",
    name: "Undergrad Women in Physics & Astronomy (UWomPA)",
    description: "Active collective providing a powerful sisterhood, helpful career panels, and safe peer support for women studying physical theories.",
    url: "https://www.facebook.com/undergradwompa/",
    category: "Community & Student Orgs",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_INVOLVEMENT_URL,
    sourceLabel: "Physics involvement",
    tier: "all",
    relevanceTags: ["uwompa", "women in physics", "astronomy support", "women", "physics community", "peer support"]
  },
  {
    id: "organzation-lmsa",
    name: "Latino Medical Student Association (LMSA)",
    description: "A motivating network guiding Latino/a pre-med undergraduates smoothly through science coursework toward medical school acceptances.",
    url: "https://www.facebook.com/LMSAUtah",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["lmsa", "latino medicine", "pre-med networking"]
  },
  {
    id: "organzation-physics-usac",
    name: "Physics USAC",
    description: "The Undergraduate Student Advisory Committee. Enables physics students to voice recommendations regarding tenure, curriculum, and class equity.",
    url: "https://web.physics.utah.edu/~usac/",
    category: "Community & Student Orgs",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_INVOLVEMENT_URL,
    sourceLabel: "Physics involvement",
    tier: "all",
    relevanceTags: ["physics usac", "usac", "undergraduate student advisory committee", "curriculum recommendations", "student voice", "town halls", "faculty retention"]
  },
  {
    id: "willard-eccles-astronomy-observatory",
    name: "Willard Eccles Astronomy Observatory",
    description: "Astronomy observatory page for free Wednesday star parties, visitor information, solar and night viewing, telescope help, directions, and observatory contact.",
    url: PHYSICS_WEAO_URL,
    category: "Community & Student Orgs",
    subcategory: "Leadership, Mentoring & Outreach",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    contact: "observatory@physics.utah.edu",
    relevanceTags: [
      "willard eccles astronomy observatory",
      "weao",
      "observatory",
      "star parties",
      "telescope help",
      "astronomy outreach",
      "solar viewing",
      "night viewing",
      "public astronomy"
    ]
  },
  {
    id: "organzation-student-council",
    name: "College of Science Student Council",
    description: "Advocate for student resources, access peer grants, and plan the annual high-stakes College of Science outreach festivals.",
    url: "https://science.utah.edu/student-council/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["student council", "governance", "peer funding", "events"]
  },
  {
    id: "organzation-science-ambassadors",
    name: "Science Ambassadors",
    description: "Fulfill elite student leadership parameters. Guide school recruitments, representing the College of Science to community partners.",
    url: "https://science.utah.edu/students/science-ambassadors/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["science ambassadors", "public outreach", "leadership role"]
  },
  {
    id: "organzation-science-mentors",
    name: "Science Mentors Program",
    description: "Get paired directly with high-achieving older peers to receive organic academic support, lifestyle advice, and lab interview training.",
    url: "https://science.utah.edu/science-mentors/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["mentors", "older peer help", "transition advice"]
  },
  {
    id: "union-programming-council",
    name: "Union Programming Council & FAB",
    description: "Student-led campus programming group where students can plan events, join Union boards, and explore Freshman Ambassador Board involvement.",
    url: "https://www.union.utah.edu/student-opportunities/union-programming-council/apply-for-upc/",
    category: "Community & Student Orgs",
    subcategory: "Leadership, Mentoring & Outreach",
    tier: "all",
    relevanceTags: ["union programming council", "upc", "freshman ambassador board", "student events", "leadership", "freshman", "first year", "new student"]
  },
  {
    id: "campus-connect-student-organizations",
    name: "Campus Connect Student Organizations",
    description: "University-wide directory for registered student organizations, campus involvement opportunities, events, and club discovery.",
    url: "https://getinvolved.utah.edu/",
    category: "Community & Student Orgs",
    subcategory: "Student Organizations",
    tier: "all",
    relevanceTags: ["campus connect", "get involved", "clubs", "groups", "student organizations", "organizations", "rso", "campus involvement"]
  },
  {
    id: "feed-u-pantry-volunteer",
    name: "Feed U Pantry Volunteer Opportunities",
    description: "Volunteer with the Union pantry, help stock and distribute food, support food drives, and build direct service experience on campus.",
    url: "https://www.union.utah.edu/resources-spaces/feed-u-pantry/about-us/",
    category: "Community & Student Orgs",
    subcategory: "Leadership, Mentoring & Outreach",
    tier: "all",
    relevanceTags: ["feed u pantry volunteer", "service", "food drive", "basic needs", "campus volunteering"]
  },
  {
    id: "union-event-planning-reservations",
    name: "Union Event Planning & Room Reservations",
    description: "Reserve Union rooms, review event-planning policies, compare room options, and coordinate equipment, services, catering, and parking needs.",
    url: "https://www.union.utah.edu/events-scheduling/",
    category: "Community & Student Orgs",
    subcategory: "Events & Student Expression",
    tier: "all",
    contact: "Events & Scheduling: 801-581-7251",
    relevanceTags: ["union reservations", "event planning", "rooms", "mazevo", "student organization events"]
  },
  {
    id: "union-make-your-change",
    name: "Make Your Change",
    description: "Union process for scheduling student events, protests, rallies, and public expression with available support such as speakers and microphones.",
    url: "https://www.union.utah.edu/events-scheduling/make-your-change/",
    category: "Community & Student Orgs",
    subcategory: "Events & Student Expression",
    tier: "all",
    contact: "Events & Scheduling: 801-581-7251",
    relevanceTags: ["make your change", "protest", "rally", "student expression", "free speech"]
  },

  // Career Awareness / Launch
  {
    id: "career-path-map",
    name: "Career Path Map (Salary + Job Growth)",
    description: "Understand exactly where your major can lead. Displays data on 40+ diverse STEM professions with median Bureau of Labor Statistics salary metrics and 10-year growth indicators.",
    url: "https://science.utah.edu/career-paths/",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["career salary", "growth statistics", "major outlook"]
  },
  {
    id: "career-closet",
    name: "The Career Closet",
    description: "Access completely free professional attire, shoes, and interview outfits. Look your best for upcoming career events & high-stakes employer fairs.",
    url: "https://careers.utah.edu/career-closet/",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["free suits", "closet fit", "interview wardrobe", "career prep"]
  },
  {
    id: "science-internships-page",
    name: "Science Internships Overview",
    description: "Live Handshake internship listings, SCI 4890 academic credit info, and direct advising for internship placement and employer connections.",
    url: "https://science.utah.edu/internships/available-internships/",
    category: "Career Development",
    tier: "all",
    contact: "Cameron Vakilian, Associate Director of Internships & Careers",
    relevanceTags: ["internships", "jobs board", "handshake tools", "sci 4890"]
  },
  {
    id: "atmos-internships-overview",
    name: "Atmospheric Sciences Internships",
    description: "Atmos internship overview for local, national, employer-hosted, and other internship resources, including capstone internship context and department career-advisor routing.",
    url: ATMOS_INTERNSHIPS_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    contact: "John Horel / john.horel@utah.edu",
    relevanceTags: [
      "atmos internships",
      "atmospheric sciences internships",
      "meteorology internships",
      "weather internships",
      "capstone internship",
      "local internships",
      "national internships",
      "career advisor",
      "john horel",
      "real-life experience"
    ]
  },
  {
    id: "atmos-local-internships-weather-center",
    name: "Atmos Local Internships & Weather Center",
    description: "Local internship page featuring Utah Weather Center forecasting, programming, volunteering, capstone internship eligibility, DEQ, NWS Salt Lake City, UDOT, and Wasatch Front options.",
    url: ATMOS_LOCAL_INTERNSHIPS_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_INTERNSHIPS_URL,
    sourceLabel: "Atmos internships",
    tier: "all",
    contact: "atmos-info@lists.utah.edu / WBB 819",
    relevanceTags: [
      "local internships",
      "utah weather center internships",
      "forecasting",
      "programming",
      "volunteering",
      "deq",
      "nws salt lake city",
      "udot",
      "wasatch front",
      "capstone internship"
    ]
  },
  {
    id: "atmos-national-internship-resources",
    name: "Atmos National Internship Resources",
    description: "National internship directory for NWS, NOAA, AMS Intern Board, AGI policy internships, NCAR/SOARS, NSF REU, SARP, EPA, DOE, and other atmospheric-science opportunities.",
    url: ATMOS_NATIONAL_INTERNSHIPS_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_INTERNSHIPS_URL,
    sourceLabel: "Atmos internships",
    tier: "all",
    relevanceTags: [
      "national internships",
      "nws internships",
      "noaa student opportunities",
      "ams intern board",
      "ncar internships",
      "soars",
      "nsf reu",
      "sarp",
      "epa internships",
      "meteorology internships"
    ]
  },
  {
    id: "atmos-internship-search-resources",
    name: "Atmos Internship Search Resources",
    description: "Internship search resource page linking students to Career & Professional Development, Hinckley internships, ZipRecruiter meteorology internships, NCAR, and external job boards.",
    url: ATMOS_INTERNSHIP_RESOURCES_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_INTERNSHIPS_URL,
    sourceLabel: "Atmos internships",
    tier: "all",
    relevanceTags: [
      "internship search",
      "meteorology internships",
      "ziprecruiter meteorology",
      "ncar internships",
      "hinckley internships",
      "career development",
      "job board",
      "internship resources"
    ]
  },
  {
    id: "geology-cmes-internships",
    name: "Geology & Geophysics Internships",
    description: "College of Mines and Earth Sciences internship board with Geology and Geophysics opportunities, related department filters, career-building postings, and external options.",
    url: CMES_INTERNSHIPS_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: "all",
    relevanceTags: [
      "geology internships",
      "geophysics internships",
      "cmes internships",
      "mines internships",
      "earth sciences internships",
      "career-building opportunities",
      "summer internships",
      "field internships",
      "job postings"
    ]
  },
  {
    id: "mining-engineering-internships",
    name: "Mining Engineering Internships",
    description: "College of Mines and Earth Sciences internship board with Mining Engineering opportunities, industry postings, career-building options, and related department filters.",
    url: CMES_INTERNSHIPS_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Mining Engineering",
    sourceUrl: MINING_HOME_URL,
    sourceLabel: "Mining home",
    tier: "all",
    relevanceTags: [
      "mining internships",
      "mining engineering internships",
      "cmes internships",
      "mines internships",
      "industry internships",
      "career-building opportunities",
      "summer internships",
      "mining jobs",
      "job postings"
    ]
  },
  {
    id: "metallurgical-engineering-internships",
    name: "Metallurgical Engineering Internships",
    description: "MSE internship page for industry, MCL, and research internships related to materials science or metallurgical engineering, including credit eligibility context.",
    url: MSE_INTERNSHIPS_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Metallurgical Engineering",
    sourceUrl: MSE_HOME_URL,
    sourceLabel: "MSE home",
    tier: "all",
    relevanceTags: [
      "metallurgical engineering internships",
      "materials science internships",
      "mse internships",
      "industry internship",
      "mcl internship",
      "research internship",
      "internship credit",
      "career-building opportunities",
      "materials engineering jobs"
    ]
  },
  {
    id: "learning-assistant-program",
    name: "Learning Assistant (LA) Program",
    description: "Paid position co-leading active learning in Biology, Chemistry, Math, Physics, Atmospheric Sciences, Geology, or SRI courses. Includes required SCI 5050 credit.",
    url: "https://www.csme.utah.edu/la/",
    category: "Career Development",
    tier: "all",
    deadline: "Fall 2026: priority Apr 6 – May 4, general through Jul 31",
    relevanceTags: ["learning assistant", "la program", "csme", "paid teaching", "sci 5050"]
  },
  {
    id: "math-undergraduate-employment",
    name: "Math Undergraduate Employment",
    description: "Department employment page for Math Center tutors, graders, computer lab assistants, and math Learning Assistant roles connected to course support.",
    url: MATH_INVOLVEMENT_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    contact: "ugrad_services@math.utah.edu / la@csme.utah.edu",
    relevanceTags: [
      "math undergraduate employment",
      "math jobs",
      "math center tutor",
      "math tutor job",
      "grader",
      "computer lab assistant",
      "math learning assistant",
      "la program",
      "sci 5050",
      "student employment"
    ]
  },
  {
    id: "math-careers-in-mathematics",
    name: "Careers in Mathematics",
    description: "Math career guide for exploring paths such as actuary, statistician, operations researcher, data analyst, software developer, educator, and research scientist.",
    url: MATH_CAREERS_URL,
    category: "Career Development",
    subcategory: "Career Exploration",
    department: "Mathematics",
    sourceUrl: MATH_HOME_URL,
    sourceLabel: "Math home",
    tier: "all",
    relevanceTags: [
      "careers in mathematics",
      "math careers",
      "mathematics careers",
      "actuary",
      "statistician",
      "operations researcher",
      "data analyst",
      "software developer",
      "math teacher",
      "career exploration"
    ]
  },
  {
    id: "physics-career-resources",
    name: "Physics & Astronomy Career Resources",
    description: "Department career guide for PHYS 3980, career coaching, resume and interview help, AIP/APS/AAS career paths, medical physics, teaching, and physics job exploration.",
    url: PHYSICS_CAREER_URL,
    category: "Career Development",
    subcategory: "Career Exploration",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    relevanceTags: [
      "physics careers",
      "astronomy careers",
      "phys 3980",
      "career coaching",
      "aip careers",
      "aps careers",
      "aas careers",
      "medical physics",
      "physics teaching",
      "career exploration"
    ]
  },
  {
    id: "physics-ta-employment",
    name: "Physics TA & Student Employment",
    description: "Physics involvement page section for undergraduate teaching assistant roles, Learning Assistant pathways, Handshake student jobs, and department employment contacts.",
    url: PHYSICS_INVOLVEMENT_URL,
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    contact: "Zheng Zheng / zhengzheng@astro.utah.edu",
    relevanceTags: [
      "physics ta",
      "physics teaching assistant",
      "physics student employment",
      "learning assistant",
      "la program",
      "handshake",
      "student jobs",
      "paid teaching",
      "undergraduate ta",
      "physics jobs"
    ]
  },
  {
    id: "atmos-career-information",
    name: "Atmospheric Sciences Career Information",
    description: "Atmos career page for career counseling, departmental elective planning, federal/state/private career options, NWS, NOAA, NASA, BLM, air quality, transportation, consulting, aviation, insurance, and agriculture paths.",
    url: ATMOS_CAREERS_URL,
    category: "Career Development",
    subcategory: "Career Exploration",
    department: "Atmospheric Sciences",
    sourceUrl: ATMOS_HOME_URL,
    sourceLabel: "Atmos home",
    tier: "all",
    contact: "atmos-advising@lists.utah.edu",
    relevanceTags: [
      "atmos careers",
      "atmospheric sciences careers",
      "meteorology careers",
      "career information",
      "nws jobs",
      "noaa jobs",
      "nasa jobs",
      "air quality careers",
      "aviation weather",
      "career advising"
    ]
  },
  {
    id: "u-career-success",
    name: "U Career Success",
    description: "University-wide career center serving students across all colleges with coaches, events, job boards, interviews, and career planning.",
    url: "https://careers.utah.edu/",
    category: "Career Development",
    tier: "all",
    contact: "801-587-8687 / 1731 E Campus Center Dr, STE 1300",
    relevanceTags: ["u career success", "career center", "career planning", "all majors"]
  },
  {
    id: "u-career-coaches",
    name: "U Career Success Career Coaches",
    description: "Meet with a career coach specialized by major or industry for resume help, networking strategy, interviews, and job search planning.",
    url: "https://careers.utah.edu/career-coach/",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["career coaches", "major coaching", "resume help", "interview prep"]
  },
  {
    id: "internships-plus",
    name: "Internships+",
    description: "University experiential learning hub for internships, applied projects, and career-connected opportunities.",
    url: "https://careers.utah.edu/experiential-learning/",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["internships", "experiential learning", "career experience"]
  },
  {
    id: "career-events-fairs",
    name: "Career Events & Fairs Calendar",
    description: "Browse upcoming career fairs, expos, employer visits, workshops, and networking events across the university.",
    url: "https://careers.utah.edu/events/",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["career fairs", "events", "employer visits", "networking"]
  },
  {
    id: "handshake-job-board",
    name: "Handshake Job & Internship Board",
    description: "University job board for internships, student jobs, full-time roles, employer events, and career resource registration.",
    url: "https://utah.joinhandshake.com/login",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["handshake", "jobs", "internships", "job board"]
  },
  {
    id: "peer-resume-review",
    name: "Peer Resume Review",
    description: "Email your resume to a U Career Success peer coach for feedback before applications, fairs, or interviews.",
    url: "mailto:peercoachucs@utah.edu",
    category: "Career Development",
    tier: "all",
    contact: "peercoachucs@utah.edu",
    relevanceTags: ["resume review", "peer coach", "application feedback"]
  },
  {
    id: "ucs-professional-headshots",
    name: "U Career Success Professional Headshots",
    description: "Schedule a free professional photo session for LinkedIn, Handshake, and career profiles.",
    url: "https://bit.ly/ucs-photos",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["headshots", "linkedin photo", "professional photo"]
  },
  {
    id: "international-student-career-resources",
    name: "International Student Career Resources",
    description: "Career guidance tailored to international students, including job search planning, work authorization context, and employer preparation.",
    url: "https://careers.utah.edu/internationalstudents/",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["international students", "career resources", "work authorization"]
  },
  {
    id: "career-courses",
    name: "Career Courses",
    description: "For-credit career development courses that help students build resumes, explore industries, and prepare for internships or jobs.",
    url: "https://careers.utah.edu/career-courses/",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["career courses", "for credit", "career class"]
  },
  {
    id: "community-champions-internship",
    name: "Community Champions Internship",
    description: "Community-focused internship opportunity listed through Handshake for students seeking applied public-impact experience.",
    url: "https://utah.joinhandshake.com/edu/jobs/10624061",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["community champions", "internship", "public impact"]
  },
  {
    id: "union-student-jobs-fellowships",
    name: "Union Student Jobs & Fellowships",
    description: "Union student employment and fellowship opportunities designed for campus schedules, leadership growth, and practical workplace experience.",
    url: "https://www.union.utah.edu/student-opportunities/",
    category: "Career Development",
    subcategory: "Jobs, Internships & Events",
    tier: "all",
    relevanceTags: ["union jobs", "student employment", "fellowships", "campus job", "leadership experience"]
  },

  // Student Life & Housing
  {
    id: "science-themed-housing",
    name: "Science-Themed Campus Housing",
    description: "Immersive science-enthusiast housing setups. Live right alongside math/science cohort peers to study and grow together naturally.",
    url: "https://science.utah.edu/students/science-themed-communities/",
    category: "Housing & Campus Life",
    tier: 1,
    relevanceTags: ["dormitories", "themed communities", "living learning"]
  },
  {
    id: "transloc-campus-shuttle",
    name: "TransLoc Campus Shuttle Tracker",
    description: "Track University of Utah campus shuttles in real time, find nearby stops, and view estimated arrivals through the TransLoc system.",
    url: "https://uofubus.com",
    category: "Housing & Campus Life",
    tier: "all",
    relevanceTags: ["transloc", "campus shuttle", "bus tracker", "transportation"]
  },
  {
    id: "uride-saferide",
    name: "URide / SafeRide Night Rides",
    description: "Request a free evening and night ride on campus through TransLoc when you do not feel safe walking alone.",
    url: "https://commuterservices.utah.edu/uride/",
    category: "Housing & Campus Life",
    tier: "all",
    contact: "Research Park after 6 PM: 801-231-9058",
    relevanceTags: ["uride", "saferide", "night ride", "transloc", "campus safety"]
  },
  {
    id: "feed-u-food-pantry",
    name: "Feed U Food Pantry",
    description: "Free non-perishable food and some hygiene items for U students, faculty, and staff. Bring your UCard to the Union pantry.",
    url: "https://www.union.utah.edu/resources-spaces/feed-u-pantry/about-us/",
    category: "Housing & Campus Life",
    subcategory: "Basic Needs",
    tier: "all",
    contact: "A. Ray Olpin Union Building / @feedupantry",
    relevanceTags: ["food pantry", "food insecurity", "free food", "ucard", "basic needs"]
  },
  {
    id: "feed-u-pantry-hours-visitor-info",
    name: "Feed U Pantry Hours & Visitor Info",
    description: "Check current pantry hours, first-time visitor guidance, premade pantry bag access for active uNID/UCard users, satellite pantry notes, and community food resources.",
    url: "https://www.union.utah.edu/visitor-information-resources/",
    category: "Housing & Campus Life",
    subcategory: "Basic Needs",
    tier: "all",
    relevanceTags: ["feed u pantry hours", "first-time visitor", "premade pantry bags", "food support", "basic needs"]
  },
  {
    id: "feed-u-pantry-satellite-locations",
    name: "Feed U Pantry Satellite Locations",
    description: "Find alternate pantry pickup locations around campus when the main Union pantry is not the most convenient option.",
    url: "https://www.union.utah.edu/resources-spaces/feed-u-pantry/satellite-locations/",
    category: "Housing & Campus Life",
    subcategory: "Basic Needs",
    tier: "all",
    relevanceTags: ["satellite pantry", "food pantry locations", "basic needs", "feed u pantry", "campus food"]
  },
  {
    id: "union-dining-options",
    name: "Union Dining Options",
    description: "Union dining locations and meal-plan-friendly options where students can use meal taps, transfer meals, and flex dollars.",
    url: "https://www.union.utah.edu/resources-spaces/dining/dining-options/",
    category: "Housing & Campus Life",
    subcategory: "Basic Needs",
    tier: "all",
    relevanceTags: ["union dining", "meal taps", "transfer meals", "flex dollars", "food"]
  },
  {
    id: "student-union-resources-spaces",
    name: "Student Union Resources & Spaces",
    description: "Central Union hub for services, recreation, dining, study areas, resource centers, meditation space, nursing room, and other daily-use spaces.",
    url: "https://www.union.utah.edu/resources-spaces/",
    category: "Housing & Campus Life",
    subcategory: "Union Services & Spaces",
    tier: "all",
    relevanceTags: ["student union", "union spaces", "campus services", "study spaces", "resource centers"]
  },
  {
    id: "student-union-building-info",
    name: "Union Building Info, Hours & Parking",
    description: "Find Union building hours, floor maps, directions, parking information, and the building information pages before visiting.",
    url: "https://www.union.utah.edu/about-us/building-information/",
    category: "Housing & Campus Life",
    subcategory: "Union Services & Spaces",
    tier: "all",
    contact: "Services Desk: 801-581-5888",
    relevanceTags: ["union hours", "building map", "parking", "directions", "services desk"]
  },
  {
    id: "student-union-services-desk",
    name: "Union Services Desk & Lost and Found",
    description: "Second-floor Union help desk for lost and found, discounted movie passes, poster/flyer stamping, campus mail, snacks, and general questions.",
    url: "https://www.union.utah.edu/resources-spaces/services-desk/services-prices/",
    category: "Housing & Campus Life",
    subcategory: "Union Services & Spaces",
    tier: "all",
    contact: "801-581-5888",
    relevanceTags: ["services desk", "lost and found", "flyer stamping", "movie passes", "campus mail"]
  },
  {
    id: "student-union-study-spaces",
    name: "Union Study Spaces",
    description: "Quick reference for Union study areas and common spaces when students need a place to work, meet, or reset between classes.",
    url: "https://www.union.utah.edu/resources-spaces/study-spaces/",
    category: "Housing & Campus Life",
    subcategory: "Union Services & Spaces",
    tier: "all",
    relevanceTags: ["study spaces", "union study", "quiet space", "campus study", "between classes"]
  },
  {
    id: "student-union-recreation",
    name: "Union Recreation",
    description: "Low-cost bowling, billiards, table games, board games, TV lounge access, recreation reservations, and recreation class information.",
    url: "https://www.union.utah.edu/resources-spaces/recreation/",
    category: "Housing & Campus Life",
    subcategory: "Union Recreation & Events",
    tier: "all",
    relevanceTags: ["union recreation", "bowling", "billiards", "board games", "tv lounge"]
  },
  {
    id: "safeu-reporting",
    name: "SafeU Reporting Portal",
    description: "Campus safety reporting portal for non-emergency concerns like bias incidents, Title IX concerns, unsafe conditions, or safety reports. This is separate from SafeUT crisis chat.",
    url: "https://safeu.utah.edu/",
    category: "Emergency & Safety",
    tier: "all",
    contact: "Dean of Students: 801-581-7066",
    relevanceTags: ["safeu", "reporting portal", "bias report", "title ix", "non-emergency"]
  },
  {
    id: "office-equal-opportunity-title-ix",
    name: "Office of Equal Opportunity & Title IX (OEO)",
    description: "Report discrimination, harassment, sexual misconduct, Title IX concerns, pregnancy-related modifications, and equal opportunity issues.",
    url: "https://oeo.utah.edu/",
    category: "Emergency & Safety",
    tier: "all",
    contact: "801-581-8365 / oeo@utah.edu",
    relevanceTags: ["oeo", "title ix", "discrimination", "sexual misconduct", "report incident"]
  },
  {
    id: "oeo-submit-report",
    name: "Submit an OEO Incident Report",
    description: "Direct form for submitting discrimination, harassment, sexual misconduct, or Title IX concerns to OEO.",
    url: "https://utah.tfaforms.net/f/OEO-Incident-Form",
    category: "Emergency & Safety",
    tier: "all",
    relevanceTags: ["oeo report", "incident form", "title ix report", "harassment report"]
  },
  {
    id: "geology-professional-ethics-policy",
    name: "Geology & Geophysics Professional Ethics Policy",
    description: "Department policy page for field, lab, classroom, research-group, and event conduct, plus routing for student misconduct, faculty concerns, and safety-related reporting.",
    url: GEOLOGY_ETHICS_URL,
    category: "Emergency & Safety",
    department: "Geology",
    sourceUrl: GEOLOGY_HOME_URL,
    sourceLabel: "Geology home",
    tier: "all",
    relevanceTags: [
      "geology ethics",
      "geophysics ethics",
      "professional ethics",
      "field safety",
      "lab safety",
      "research group conduct",
      "student misconduct",
      "faculty misconduct",
      "department policy"
    ]
  },

  // Wellness & Mental Health
  {
    id: "embedded-therapist",
    name: "Counseling Center - Embeddied Therapist (Steven Trujillo)",
    description: "Completely private, free mental health counseling located safely and conveniently inside the College of Science. Specifically understands STEM burnout.",
    url: "https://counselingcenter.utah.edu/services/appointment.php",
    category: "Wellness & Mental Health",
    tier: "all",
    contact: "strujillo@sa.utah.edu / 801-581-6826",
    relevanceTags: ["therapy", "steven trujillo", "mental health", "burnout counselor", "free counseling"]
  },
  {
    id: "safety-wellness-hub",
    name: "Safety & Wellness Hub",
    description: "Provides on-call laboratory safety contacts, hazardous chemical waste management protocols, and primary physical safety tools.",
    url: "https://science.utah.edu/science-safety/",
    category: "Wellness & Mental Health",
    tier: "all",
    contact: "d.r.thomas@utah.edu / 801-213-0957",
    relevanceTags: ["lab hazard safety", "hazardous chemical", "waste protocol"]
  },
  {
    id: "student-union-meditation-space",
    name: "Union Meditation Space",
    description: "Quiet third-floor Union room for meditation, prayer, religious or spiritual observance, or a low-stimulation reset while the building is open.",
    url: "https://www.union.utah.edu/resources-spaces/meditation-space/",
    category: "Wellness & Mental Health",
    subcategory: "Self-Care Tools",
    tier: "all",
    relevanceTags: ["meditation space", "prayer room", "quiet space", "mindfulness", "spiritual observance"]
  },
  {
    id: "podcast-pace-yourself",
    name: "Pace Yourself Wellness Podcast",
    description: "The designated College of Science podcast explaining performance parenting, work-life management, test anxiety, and sleep metrics.",
    url: "https://science.utah.edu/safety/health-wellness-podcast/",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["wellness podcast", "study anxiety", "burnout tips", "sleep optimization"]
  },
  {
    id: "ehs-lab-safety",
    name: "Environmental Health & Safety (EHS)",
    description: "The legal, comprehensive record of laboratory precautions, protective standards, and critical safety rules for research settings.",
    url: "https://www.ehs.utah.edu/resource-center/",
    category: "Emergency & Safety",
    tier: "all",
    relevanceTags: ["ehs", "hazard manual", "pre-research rules"]
  },
  {
    id: "ucc-free-mental-health-apps",
    name: "UCC Free Mental Health Apps",
    description: "University Counseling Center list of free apps for stress, anxiety, mood tracking, mindfulness, trauma support, and sleep. Apps are tools, not a replacement for professional care.",
    url: "https://counselingcenter.utah.edu/self-help/free-apps.php",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["free apps", "ucc", "self help", "stress", "sleep"]
  },
  {
    id: "telus-health-student-support",
    name: "TELUS Health Student Support",
    description: "Free 24/7 virtual counseling and emotional support for University of Utah students by app, phone, text, or web.",
    url: "https://counselingcenter.utah.edu/services/myssp.php",
    category: "Wellness & Mental Health",
    tier: "all",
    contact: "1-833-369-1250",
    relevanceTags: ["telus health", "virtual counseling", "24/7 support", "my ssp"]
  },
  {
    id: "headspace-app",
    name: "Headspace",
    description: "Guided meditation and mindfulness app recommended by the UCC for stress, anxiety, and daily grounding.",
    url: "https://counselingcenter.utah.edu/self-help/free-apps.php",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["headspace", "meditation", "mindfulness", "anxiety"]
  },
  {
    id: "pranayama-app",
    name: "Pranayama Breathing",
    description: "Breathing exercise app recommended by the UCC for anxiety, stress reduction, and nervous system regulation.",
    url: "https://counselingcenter.utah.edu/self-help/free-apps.php",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["pranayama", "breathing", "stress", "anxiety"]
  },
  {
    id: "ptsd-coach-app",
    name: "PTSD Coach",
    description: "Evidence-based self-help tools for managing trauma symptoms, anxiety, and stress responses.",
    url: "https://counselingcenter.utah.edu/self-help/free-apps.php",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["ptsd coach", "trauma", "anxiety", "stress"]
  },
  {
    id: "how-we-feel-app",
    name: "How We Feel",
    description: "Mood tracking and emotional awareness app for daily check-ins, journaling, and noticing patterns over time.",
    url: "https://counselingcenter.utah.edu/self-help/free-apps.php",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["how we feel", "mood tracking", "journaling", "emotions"]
  },
  {
    id: "mindfulness-bell-app",
    name: "Mindfulness Bell",
    description: "Gentle reminder app for mindfulness pauses, breathing breaks, and returning attention during busy days.",
    url: "https://counselingcenter.utah.edu/self-help/free-apps.php",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["mindfulness bell", "mindfulness", "reminders", "meditation"]
  },
  {
    id: "sleep-sounds-simplynoise",
    name: "Sleep Sounds / SimplyNoise",
    description: "Sleep soundscape and white-noise tools recommended by the UCC to support rest, relaxation, and sleep routines.",
    url: "https://counselingcenter.utah.edu/self-help/free-apps.php",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["sleep sounds", "simplynoise", "white noise", "sleep"]
  },
  {
    id: "safeut-crisis-chat",
    name: "SafeUT Crisis Chat & Tip App",
    description: "Free 24/7 crisis counselor chat, call support, and safety tip submission for Utah students. This is separate from SafeU reporting.",
    url: "https://safeut.org/",
    category: "Emergency & Safety",
    tier: "all",
    contact: "801-587-8852",
    relevanceTags: ["safeut", "crisis chat", "licensed counselor", "tip line", "mental health crisis"]
  },
  {
    id: "crisis-mental-health",
    name: "Mental Health Crisis Line (988)",
    description: "Immediate, absolute crisis triage connecting you directly to licensed emotional consultants. Available 24 hours a day, completely free.",
    url: "tel:988",
    category: "Emergency & Safety",
    tier: "all",
    contact: "Call or Text 988",
    relevanceTags: ["suicide prevention", "immediate intervention", "panic hotline"]
  },
  {
    id: "emergency-911",
    name: "Emergency Services (911)",
    description: "Immediate response for active violence, acute injuries, fires, or physical danger. Call instantly.",
    url: "tel:911",
    category: "Emergency & Safety",
    tier: "all",
    contact: "Call 911",
    relevanceTags: ["police emergency", "fire response", "ambulance help"]
  },

  // --- TIER 2 - JUNIOR, SENIOR & GRADUATE RESOURCES ---
  // Prestigious Fellowships & Competitive Programs
  {
    id: "beckman-scholars",
    name: "Beckman Scholars Program",
    description: "An elite 15-month mentored chemistry or biology honors laboratory research fellowship backed by a generous $21,000 student stipend and custom presentation grants.",
    url: "https://science.utah.edu/students/student-research/beckman-scholars/",
    category: "Scholarships & Financial Aid",
    tier: 2,
    deadline: "March 31 annually",
    relevanceTags: ["beckman", "prestigious", "chemistry research", "biology stipend", "biology research fellowship"]
  },
  {
    id: "goldwater-scholarship",
    name: "Goldwater Scholarship",
    description: "America's absolute premier undergraduate research scholarship. Bestowed strictly to sophomores or juniors pursuing lifelong academic science careers.",
    url: "https://nationallycompetitivescholarships.utah.edu/scholarships/",
    category: "Scholarships & Financial Aid",
    tier: 2,
    deadline: "Jan annually",
    relevanceTags: ["goldwater", "high honors", "research candidate", "government merit"]
  },
  {
    id: "fulbright-scholarship",
    name: "Fulbright Scholarship Program",
    description: "The flagship international program allowing newly graduated seniors or alumni to execute dedicated graduate study or cross-cultural research overseas.",
    url: "https://nationallycompetitivescholarships.utah.edu/scholarships/",
    category: "Scholarships & Financial Aid",
    tier: 2,
    deadline: "Fall semester",
    relevanceTags: ["fulbright", "study abroad", "fellowship", "graduating seniors"]
  },
  {
    id: "churchill-scholarship",
    name: "Churchill Scholarship",
    description: "Supports highly advanced graduate studies directly at the University of Cambridge. Exceptional academic merit required.",
    url: "https://nationallycompetitivescholarships.utah.edu/scholarships/",
    category: "Scholarships & Financial Aid",
    tier: 2,
    deadline: "Fall semester",
    relevanceTags: ["churchill", "cambridge", "excellent grades", "exclusive STEM"]
  },
  {
    id: "rhodes-scholarship",
    name: "Rhodes Scholarship",
    description: "The world's premier post-graduate study scholarship, fully covering study programs at Oxford University.",
    url: "https://nationallycompetitivescholarships.utah.edu/scholarships/",
    category: "Scholarships & Financial Aid",
    tier: 2,
    deadline: "Fall semester",
    relevanceTags: ["rhodes", "oxford university", "scholarly leaders"]
  },
  {
    id: "edges-fellowship",
    name: "EDGES Graduate Fellowship",
    description: "Custom transition and professional development fellowship matching incoming graduate researchers with up to $10,000 in support.",
    url: "https://science.utah.edu/graduate-students/edges/",
    category: "Scholarships & Financial Aid",
    tier: 2,
    deadline: "Watch for AY 26-27 opening",
    relevanceTags: ["edges", "graduate launch", "conference travel stipend"]
  },
  {
    id: "ndseg-fellowship",
    name: "NDSEG Fellowship Program",
    description: "National Defense Science and Engineering Graduate Fellowship fully funding three years of doctoral STEM research.",
    url: "https://science.utah.edu/news/ndseg-fellowship/",
    category: "Scholarships & Financial Aid",
    tier: 2,
    relevanceTags: ["ndseg", "defense funding", "phd stitpends"]
  },
  {
    id: "nsf-reu",
    name: "NSF Research Experiences (REU)",
    description: "Paid summer placements at external institutions nationwide. Perfect mechanism to construct a national letter of recommendation network.",
    url: "https://www.nsf.gov/crssprgm/reu/",
    category: "Research & Internships",
    tier: "all",
    deadline: "Feb-March",
    relevanceTags: ["nsf", "reu summer", "external research", "stipend travel"]
  },
  {
    id: "nationally-competitive-office",
    name: "Office of Nationally Competitive Scholarships",
    description: "Personalized essay coaching, campus draft screenings, and coordinator letters to safely apply for Fulbright, Churchill, Rhodes, and Goldwater.",
    url: "https://nationallycompetitivescholarships.utah.edu/scholarships/",
    category: "Scholarships & Financial Aid",
    tier: "all",
    relevanceTags: ["competitive office", "essay advisor", "excellence", "recruiting help"]
  },

  // Career Launch Tools (Tier 2-specific coaching)
  {
    id: "career-coaching-hub",
    name: "Career Coaching — Full Hub",
    description: "Schedule custom target sessions for final resume styling, CV review, LinkedIn outreach, technical mock interviews, and sector job alignment.",
    url: "https://science.utah.edu/students/careercoaching/",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["coaching", "resume help", "job offer alignment", "career advisor"]
  },
  {
    id: "career-studio-interview-rooms",
    name: "Career Studio (Interview Suites)",
    description: "Book pristine, high-definition soundproof video testing suites equipped with studio lighting, standard tripods, and high-quality webcams.",
    url: "https://desb-general-scheduling-link.as.me/schedule.php?calendarID=7138219",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["interview rooms", "silent booths", "zoom setup"]
  },

  // Advanced Research (Tier 2 and faculty groups)
  {
    id: "posters-on-the-hill",
    name: "Posters on the Hill",
    description: "Represent original student laboratory progress to state legislators directly inside the Utah State Capitol Building in February.",
    url: "https://our.utah.edu/education-events/research-on-capitol-hill/",
    category: "Research & Internships",
    tier: "all",
    relevanceTags: ["utah capitol", "legislative presentations", "original poster"]
  },
  {
    id: "ucur-symposium",
    name: "Utah Conference on Undergraduate Research (UCUR)",
    description: "Present research posters to peer scientists inside a statewide intercollegiate scientific community with a 20+ year legacy.",
    url: "https://our.utah.edu/education-events/ucur/",
    category: "Research & Internships",
    tier: "all",
    relevanceTags: ["ucur", "statewide conference", "presentation skills"]
  },
  {
    id: "ncur-national-conference",
    name: "NCUR National Conference",
    description: "Accompany university delegations to present scientific research on a massive physical national stage. A gold-standard resume builder.",
    url: "https://www.cur.org/what/events/students/ncur/",
    category: "Research & Internships",
    tier: "all",
    relevanceTags: ["ncur", "national stage", "travel science stipend"]
  },
  {
    id: "cos-research-showcase",
    name: "College of Science Research Symposium",
    description: "Annual internal College of Science showcase presenting competitive cash prizes and student publication recognition panels.",
    url: "https://science.utah.edu/students/college-of-science-research-symposium-2026/",
    category: "Research & Internships",
    tier: "all",
    relevanceTags: ["internal showcase", "prizes", "department panels"]
  },
  {
    id: "range-scientific-journal",
    name: "RANGE Undergraduate Research Journal",
    description: "The dedicated, peer-reviewed undergraduate science journal. Complete publication to establish your absolute scientific credential for PhD applications.",
    url: "https://science.utah.edu/students/cos-range-2026/",
    category: "Research & Internships",
    tier: "all",
    relevanceTags: ["range", "scientific journal", "student author", "peer review"]
  },
  {
    id: "research-at-the-u-overview",
    name: "Research at the U Overview",
    description: "Explores the Carnegie Tier-1 research profile of the university, highlighting $686M+ in annual funding and 280+ active scientific patents.",
    url: "https://science.utah.edu/research/",
    category: "Research & Internships",
    tier: "all",
    relevanceTags: ["university profiles", "carnegie tier-1", "patents", "overview"]
  },
  {
    id: "looper-research-group",
    name: "Looper Research Group (Chemistry)",
    description: "Advanced synthetic laboratory investigating original small molecule bio-interactions, clinical antibiotics, and chemical engineering targets.",
    url: "https://chem.utah.edu/directory/looper/research-group/index.php",
    category: "Research & Internships",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: 2,
    relevanceTags: ["looper laboratory", "organic chemistry synthetic", "clinical trials"]
  },
  {
    id: "vershinin-biophysics-lab",
    name: "Vershinin Lab (Biophysics)",
    description: "Advanced nanotech lab analyzing kinesin motors, single-molecule cellular forces, and sub-cellular biophysical properties.",
    url: "https://www.physics.utah.edu/~vershinin/home.html",
    category: "Research & Internships",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_RESEARCH_URL,
    sourceLabel: "Physics research",
    tier: 2,
    relevanceTags: ["vershinin physics", "biophysics lab", "physics lab", "biophysics force tracker", "nanotech cells", "faculty research"]
  },
  {
    id: "hammond-nucleic-lab",
    name: "Hammond Lab (Chemistry)",
    description: "Synthesizes nucleic acid tools, investigating cellular gene control, biomorphic signal channels, and biological pathways.",
    url: "https://www.mchgrp.chem.utah.edu/",
    category: "Research & Internships",
    department: "Chemistry",
    sourceUrl: CHEMISTRY_HOME_URL,
    sourceLabel: "Chemistry home",
    tier: 2,
    relevanceTags: ["hammond organic", "nucleic chemistry", "rna DNA genomics"]
  },
  {
    id: "shapiro-genetics-lab",
    name: "Shapiro Lab (Biology)",
    description: "Investigate avian evolutionary pathways and skeletal trait variations with modern genomic sequences.",
    url: "http://shapiro.biology.utah.edu/",
    category: "Research & Internships",
    department: "Biology",
    sourceUrl: BIOLOGY_RESEARCH_URL,
    sourceLabel: "Biology research",
    tier: 2,
    relevanceTags: ["shapiro lab", "biology lab", "genomics", "evolution biology", "faculty research"]
  },
  {
    id: "gagnon-embryo-lab",
    name: "Gagnon Lab (Biology)",
    description: "Examines embryonic cellular lineages and spatial signaling mapping using gene-editing technology.",
    url: "https://www.gagnonlab.org/",
    category: "Research & Internships",
    department: "Biology",
    sourceUrl: BIOLOGY_RESEARCH_URL,
    sourceLabel: "Biology research",
    tier: 2,
    relevanceTags: ["gagnon biology", "biology lab", "embryonic tracking", "crispr signaling", "faculty research"]
  },
  {
    id: "wilkes-climate-center",
    name: "Wilkes Center for Climate Science",
    description: "$20 Million-funded core institute focused on environmental physics, climate projections, and massive annual student innovation cash prizes.",
    url: "https://science.utah.edu/the-wilkes-center/",
    category: "Research & Internships",
    tier: "all",
    relevanceTags: ["wilkes center", "climate physics", "prizes", "energy tech"]
  },
  {
    id: "utah-forge-geothermal",
    name: "Utah FORGE (Geothermal Research)",
    description: "State-of-the-art Department of Energy geothermal test site located in Milford, UT, researching subterranean thermal energy reservoirs.",
    url: "https://science.utah.edu/news/utah-forge/",
    category: "Research & Internships",
    tier: "all",
    relevanceTags: ["forge geothermal", "clean energy", "milford test"]
  },

  // Graduate School Prep
  {
    id: "graduate-student-hub",
    name: "Graduate Students Service Hub",
    description: "Central resource page directing chemistry, math, and physics postgraduates toward academic counseling, writing support, and research stipends.",
    url: "https://science.utah.edu/students/graduate-students/",
    category: "Advising & Course Planning",
    tier: 2,
    relevanceTags: ["graduate services", "phd tools", "thesis review"]
  },
  {
    id: "apply-graduate-school",
    name: "Apply to Graduate Programs Office",
    description: "The primary administrative admissions dashboard to formally submit doctoral or masters applications.",
    url: "https://admissions.utah.edu",
    category: "Advising & Course Planning",
    tier: 2,
    relevanceTags: ["apply grad school", "masters portal", "doctoral applications"]
  },
  {
    id: "graduate-admissions-process",
    name: "Graduate Application Instructions",
    description: "Step-by-step guidance, letters of recommendation timelines, and statement of purpose formatting advice curated for prospective graduate scholars.",
    url: "https://science.utah.edu/students/graduate-school-application/",
    category: "Advising & Course Planning",
    tier: 2,
    relevanceTags: ["admissions process", "recommendation letters", "advising timeline"]
  },
  {
    id: "graduate-faculty-profiles",
    name: "Faculty Graduate Profiles Index",
    description: "Browse detailed research histories, publication citations, and advisor statements for 150+ College of Science tenure-track laboratory directors.",
    url: "https://science.utah.edu/why/science/research-faculty-profiles/",
    category: "Advising & Course Planning",
    tier: 2,
    relevanceTags: ["faculty research profiles", "mentor finder", "lab vacancies"]
  },
  {
    id: "grad-emergency-scholarship",
    name: "Graduate Student Emergency Scholarship",
    description: "Direct academic hardship scholarship allocating swift emergency money to graduate candidates facing unpredictable living costs.",
    url: "https://utah.academicworks.com/opportunities/42115",
    category: "Scholarships & Financial Aid",
    tier: 2,
    relevanceTags: ["grad emergency money", "hardship grant", "living security"]
  },

  // Networking & Alumni
  {
    id: "access-scholars-alumni",
    name: "ACCESS Scholars Alumni Network",
    description: "Fosters long-term mentoring and career linkages with 800+ national alumnae currently excelling in medicine, tech, and research industries.",
    url: "https://forever.utah.edu/groups/197",
    category: "Community & Student Orgs",
    tier: 2,
    relevanceTags: ["access alumni", "professional network", "forever utah group"]
  },
  {
    id: "csme-educational-outreach",
    name: "Center for Science & Math Education (CSME)",
    description: "Engage with Utah public school kids. Conduct K-12 interactive student experiments, gaining excellent public communication teaching skills.",
    url: "https://science.utah.edu/students/center-for-science-and-mathematics-education/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["csme teach", "k-12 science outreach", "tutoring schools"]
  },

  // --- STUDENT ACCESS & SUPPORT (CSAR) ---
  {
    id: "physics-campus-resources",
    name: "Physics & Astronomy Campus Resources",
    description: "Department-curated campus resource directory for Physics and Astronomy students, organized by kind and alphabetically for quick student support routing.",
    url: PHYSICS_CAMPUS_RESOURCES_URL,
    category: "Student Access & Support",
    subcategory: "Campus & Community Resources",
    department: "Physics & Astronomy",
    sourceUrl: PHYSICS_HOME_URL,
    sourceLabel: "Physics home",
    tier: "all",
    relevanceTags: [
      "physics campus resources",
      "astronomy campus resources",
      "student resources",
      "campus support",
      "physics support",
      "resource directory"
    ]
  },
  {
    id: "csar-home",
    name: "Center for Student Access & Resources (CSAR)",
    description: "Central University of Utah support office for student success, well-being, scholarships, navigator help, and community connection.",
    url: "https://studentresources.utah.edu/",
    category: "Student Access & Support",
    subcategory: "Start Here",
    tier: "all",
    contact: "Union 411 / 801-581-8030 / studentresources@utah.edu",
    relevanceTags: ["csar", "student resources", "navigator", "student access", "support"]
  },
  {
    id: "csar-scholarships",
    name: "CSAR Scholarships",
    description: "CSAR scholarship hub with eligibility notes, named awards, application timing, and ScholarshipUniverse application guidance.",
    url: "https://studentresources.utah.edu/ourscholarships.php",
    category: "Student Access & Support",
    subcategory: "Scholarships & Cohorts",
    tier: "all",
    deadline: "Most CSAR applications open Dec 1 and close late Feb",
    relevanceTags: ["csar scholarships", "scholarship universe", "financial support", "named awards"]
  },
  {
    id: "csar-cohort-programs",
    name: "CSAR Cohort Programs",
    description: "Cohort scholarship programs with tuition support, one-on-one student resource navigator help, community building, and leadership development.",
    url: "https://studentresources.utah.edu/cohortprograms.php",
    category: "Student Access & Support",
    subcategory: "Scholarships & Cohorts",
    tier: "all",
    relevanceTags: ["cohort programs", "single parent cohort", "miller enrichment", "operation success"]
  },
  {
    id: "csar-campus-community-resources",
    name: "CSAR Campus & Community Resources",
    description: "Broad support directory for academic policies, basic needs, crisis lines, health care, mental health, identity centers, legal help, parenting, and involvement.",
    url: "https://studentresources.utah.edu/resources.php",
    category: "Student Access & Support",
    subcategory: "Campus & Community Resources",
    tier: "all",
    relevanceTags: ["campus resources", "community resources", "basic needs", "crisis lines", "identity support"]
  },
  {
    id: "union-resource-centers",
    name: "Union Resource Centers",
    description: "Union hub for campus support offices including cultural engagement, first-generation support, student-parent support, the Dream Center, financial wellness, international student support, TRIO, and veterans support.",
    url: "https://www.union.utah.edu/resources-spaces/resource-centers/",
    category: "Student Access & Support",
    subcategory: "Campus & Community Resources",
    tier: "all",
    relevanceTags: ["union resource centers", "first-generation", "dream center", "financial wellness", "trio"]
  },
  {
    id: "csar-basic-needs",
    name: "Basic Needs Through CSAR",
    description: "Starting point for students looking for food, housing, financial wellness, health care, parenting, and emergency support resources.",
    url: "https://studentresources.utah.edu/resources.php",
    category: "Student Access & Support",
    subcategory: "Basic Needs",
    tier: "all",
    relevanceTags: ["basic needs", "food", "housing", "financial wellness", "parenting", "emergency support"]
  },
  {
    id: "csar-thinking-of-leaving",
    name: "Thinking of Leaving the U?",
    description: "CSAR support form for students considering leaving the University of Utah who want help finding ways to stay enrolled or navigate next steps.",
    url: "https://studentresources.utah.edu/thinkingofleaving.php",
    category: "Student Access & Support",
    subcategory: "Student Navigation",
    tier: "all",
    relevanceTags: ["thinking of leaving", "stay in school", "withdrawal help", "student navigator", "retention"]
  },
  {
    id: "csar-events",
    name: "CSAR Upcoming Events",
    description: "Events, workshops, and community opportunities from the Center for Student Access & Resources.",
    url: "https://studentresources.utah.edu/events/",
    category: "Student Access & Support",
    subcategory: "Events & Outreach",
    tier: "all",
    relevanceTags: ["csar events", "workshops", "community", "student events"]
  },
  {
    id: "csar-outreach",
    name: "Request CSAR Tabling or Outreach",
    description: "Request CSAR participation for tabling, outreach, and student support connection events.",
    url: "https://utahsa.az1.qualtrics.com/jfe/form/SV_9EK5JknDwVQEOGi",
    category: "Student Access & Support",
    subcategory: "Events & Outreach",
    tier: "all",
    relevanceTags: ["tabling", "outreach", "presentation", "connect with csar"]
  },

  // --- VOLUNTEERING, WELLNESS & FORMS (site audit additions) ---
  {
    id: "bennion-center-students",
    name: "Bennion Center — Volunteering & Community Engagement",
    description: "Everything volunteering-related lives on this one page: 40+ community partner programs, the no-commitment Service Corner, Utah Reads paid tutoring, Bennion Scholars, service-themed housing (incl. the H.I.V.E.), and community-engaged learning courses.",
    url: "https://bennioncenter.utah.edu/students/index.php",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["volunteering", "bennion center", "community service", "civic engagement", "service corner", "hive", "utah reads", "bennion scholars", "service house"]
  },
  {
    id: "bennion-volunteer-interest-form",
    name: "Volunteer Interest Form (Bennion Center)",
    description: "The actual sign-up form to get matched with Bennion Center volunteer programs — the real starting point for most community partnerships.",
    url: "https://bennioncenter.utah.edu/vif/index.php",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["volunteer signup", "vif", "community partners", "bennion"]
  },
  {
    id: "bennion-saturday-service",
    name: "Saturday Service Projects",
    description: "Recurring one-day volunteer events including Legacy of Lowell, MLK Day of Service, and the First-Year Experience cohort for new and transfer students.",
    url: "https://bennioncenter.utah.edu/students/community-outreach/index.php",
    category: "Community & Student Orgs",
    tier: "all",
    contact: "bryce.williams@utah.edu",
    relevanceTags: ["saturday service", "mlk day", "first-year experience", "one-time volunteering"]
  },
  {
    id: "bennion-alternative-breaks",
    name: "Alternative Breaks",
    description: "Week-long, community-engaged service trips during fall and spring break, run through the Bennion Center.",
    url: "https://bennioncenter.utah.edu/students/alternative-breaks/index.php",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["alternative breaks", "service trips", "spring break", "travel volunteering"]
  },
  {
    id: "community-engagement-certificate",
    name: "Community Engagement Certificate",
    description: "Earn a 21-credit academic certificate plus capstone for sustained community-engaged coursework and service through the Bennion Center.",
    url: "https://bennioncenter.utah.edu/certificate/index.php",
    category: "Advising & Course Planning",
    tier: 2,
    relevanceTags: ["certificate", "community engaged learning", "capstone", "academic credit"]
  },
  {
    id: "center-for-campus-wellness",
    name: "Center for Campus Wellness",
    description: "Umbrella wellness office — one page links out to alcohol & substance support, wellness coaching, health education, sexual wellness (free safer-sex supplies), spiritual wellness, and confidential violence/harm advocacy.",
    url: "https://wellness.utah.edu/programs/",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["wellness coaching", "campus wellness", "physical wellness", "sexual wellness", "advocates", "substance use", "spiritual wellness", "violence support", "health education"]
  },
  {
    id: "campus-recreation-services",
    name: "Campus Recreation Services",
    description: "One rec hub covering free group fitness & yoga classes, intramurals, outdoor adventure trips, the climbing wall, and the George S. Eccles Student Life Center pool and fitness facilities.",
    url: "https://campusrec.utah.edu/",
    category: "Wellness & Mental Health",
    tier: "all",
    relevanceTags: ["campus recreation", "group fitness", "yoga", "fitness", "gym", "student life center", "recreation", "intramurals", "climbing wall", "pool"]
  },
  {
    id: "permission-code-requests",
    name: "Permission Numbers Request Sites",
    description: "Registrar-maintained directory linking to every department's own permission code / override request form and contact — Mines & Earth, Kinesiology, Writing, Computer Science, and more, all in one place.",
    url: "https://registrar.utah.edu/register/permission-numbers-requests.php",
    category: "Advising & Course Planning",
    tier: "all",
    relevanceTags: ["permission code", "override request", "registrar", "add class", "department forms"]
  },

  // --- DEPARTMENT HUBS ---
  {
    id: "hub-atmos",
    name: "Atmospheric Sciences Department Hub",
    description: "Fallback Department of Atmospheric Sciences homepage for updated undergraduate links, advising, degree paths, internships, research, weather tools, AMS, and department navigation.",
    url: ATMOS_HOME_URL,
    category: "Department Hubs",
    department: "Atmospheric Sciences",
    tier: "all",
    relevanceTags: [
      "atmospheric sciences",
      "atmos department",
      "meteorology",
      "weather",
      "climate",
      "air quality",
      "weather tools",
      "department homepage"
    ]
  },
  {
    id: "hub-biology",
    name: "Biological Sciences Department Hub",
    description: "Fallback School of Biological Sciences homepage for updated undergraduate links, research areas, events, faculty, facilities, and department-level navigation.",
    url: BIOLOGY_HOME_URL,
    category: "Department Hubs",
    department: "Biology",
    tier: "all",
    relevanceTags: ["biological sciences", "biology", "biology department", "biology labs", "pre-med track", "department homepage"]
  },
  {
    id: "hub-chemistry",
    name: "Chemistry Department Hub",
    description: "Fallback Chemistry department homepage for updated undergraduate links, faculty information, events, safety, facilities, and department-level navigation.",
    url: CHEMISTRY_HOME_URL,
    category: "Department Hubs",
    department: "Chemistry",
    tier: "all",
    relevanceTags: ["chem", "chemistry", "chemistry department", "chemistry laboratory", "chemicals", "department homepage"]
  },
  {
    id: "hub-earth",
    name: "Geology & Geophysics Department Hub",
    description: "Fallback Department of Geology & Geophysics homepage for updated undergraduate links, advising, permission-code routing, research, scholarships, events, and student groups.",
    url: GEOLOGY_HOME_URL,
    category: "Department Hubs",
    department: "Geology",
    tier: "all",
    relevanceTags: [
      "geology",
      "geophysics",
      "earth science",
      "geology department",
      "geophysics department",
      "department homepage",
      "seismograph"
    ]
  },
  {
    id: "hub-math",
    name: "Mathematics Department Hub",
    description: "Fallback Department of Mathematics homepage for updated undergraduate links, advising, placement, tutoring, research, student involvement, courses, and department navigation.",
    url: MATH_HOME_URL,
    category: "Department Hubs",
    department: "Mathematics",
    tier: "all",
    relevanceTags: [
      "mathematics",
      "math department",
      "math homepage",
      "math center",
      "math placement",
      "math advising",
      "statistics",
      "department homepage"
    ]
  },
  {
    id: "hub-metallurgical",
    name: "Metallurgical Engineering Department Hub",
    description: "Fallback MSE homepage for updated Metallurgical Engineering links, advising, degree plans, scholarships, internships, undergraduate research, student resources, and department navigation.",
    url: MSE_HOME_URL,
    category: "Department Hubs",
    department: "Metallurgical Engineering",
    tier: "all",
    relevanceTags: [
      "metallurgical engineering",
      "materials science",
      "mse department",
      "met e",
      "department homepage",
      "metallurgical advising",
      "metallurgical scholarships",
      "metallurgical internships",
      "alloy labs"
    ]
  },
  {
    id: "hub-mining",
    name: "Mining Engineering Department Hub",
    description: "Fallback Mining Engineering homepage for updated undergraduate links, advising, scholarships, internships, industry connections, news, and department navigation.",
    url: MINING_HOME_URL,
    category: "Department Hubs",
    department: "Mining Engineering",
    tier: "all",
    relevanceTags: [
      "mining engineering",
      "mining department",
      "department homepage",
      "mining advising",
      "mining scholarships",
      "mining internships",
      "resource development",
      "industry partnerships"
    ]
  },
  {
    id: "hub-physics",
    name: "Physics & Astronomy Department Hub",
    description: "Fallback Department of Physics & Astronomy homepage for updated undergraduate links, advising, tutoring, research, observatory, events, and department navigation.",
    url: PHYSICS_HOME_URL,
    category: "Department Hubs",
    department: "Physics & Astronomy",
    tier: "all",
    relevanceTags: [
      "physics astronomy",
      "physics department",
      "astronomy department",
      "department homepage",
      "physics advising",
      "physics tutoring",
      "astronomy observatory",
      "telescope domes",
      "colloquiums"
    ]
  }
];
