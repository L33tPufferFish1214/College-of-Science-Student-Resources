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

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ResourceCategory;
  subcategory?: string;
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
  { department: "Atmospheric Sciences", advisor: "Zach Earl", email: "zach.earl@utah.edu" },
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
    relevanceTags: ["advocates", "support", "first-gen", "mentorship", "success"]
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
    name: "Chemistry Tutoring Center",
    description: "Focused drop-in peer tutoring specifically for general, organic, and physical chemistry courses.",
    url: "https://chem.utah.edu/undergraduate/resources/index.php",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["chemistry", "tutoring", "organic chemistry", "general chemistry"]
  },
  {
    id: "mathematics-tutoring-center",
    name: "Mathematics Tutoring Center",
    description: "Drop-in tutoring, practice exams, and math study space for all undergraduate mathematics and calculus streams.",
    url: "http://www.math.utah.edu/undergraduate/mathcenter.php",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["math", "calculus", "tutoring", "equations"]
  },
  {
    id: "physics-astronomy-tutoring",
    name: "Physics & Astronomy Tutoring",
    description: "Departmental peer tutoring for introductory physics, mathematical methods, and observational astronomy.",
    url: "https://www.physics.utah.edu/undergraduate-program/tutoring-resources/",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["physics", "astronomy", "tutoring", "gravity"]
  },
  {
    id: "mines-earth-epicenter",
    name: "Mines & Earth Sciences Student Epicenter",
    description: "Specialized student lounge and focused tutoring support for Geology, Mining, and Metallurgical students.",
    url: "https://www.mines.utah.edu/students/studentepicenter.php",
    category: "Academic Help",
    tier: "all",
    relevanceTags: ["geology", "mining", "metallurgical", "support", "epicenter"]
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
    id: "math-placement",
    name: "Math Placement Guide",
    description: "Resources, standardized exams, and placement keys to determine your optimized starting math and calculus class.",
    url: "http://www.math.utah.edu/undergraduate/placement.php",
    category: "Advising & Course Planning",
    tier: 1,
    relevanceTags: ["math placement", "exam", "starting calculus"]
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
    relevanceTags: ["first semester", "orientation", "planning template"]
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
    description: "Departmental endowments matching undergraduate weather-science majors with supportive financial aid.",
    url: "https://atmos.utah.edu/undergraduate/academics/scholarships.php",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: ["atmospheric sciences", "weather", "meteorology funding"]
  },
  {
    id: "biology-scholarships",
    name: "Biological Sciences Scholarships",
    description: "Dedicated science tuition assistance and competitive awards strictly for declared biology undergraduates.",
    url: "https://www.biology.utah.edu/scholarships-financial-aid/",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: ["biology", "pre-med funding", "tuition aid"]
  },
  {
    id: "chemistry-scholarships",
    name: "Chemistry Department Scholarships",
    description: "Generous tuition financial assistance and award stipends curated for high-performing chemistry majors.",
    url: "https://www.chemistry.utah.edu/awards-and-scholarships/",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: ["chemistry", "chemical awards", "stipend help"]
  },
  {
    id: "mathematics-scholarships",
    name: "Mathematics Department Scholarships",
    description: "Various department merit scholarships and hardship-assistance funding sources tailored for mathematics majors.",
    url: "http://www.math.utah.edu/undergraduate/scholarships.php",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: ["math", "equations funding", "actuary assistance"]
  },
  {
    id: "geology-geophysics-scholarships",
    name: "Geology & Geophysics Scholarships",
    description: "Undergraduate fellowships and resource funding specifically for geosciences researchers, field campers, and earth science enthusiasts.",
    url: "https://earth.utah.edu/financial_aid.php",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: ["geology", "earth science", "field work aid"]
  },
  {
    id: "physics-astronomy-scholarships",
    name: "Physics & Astronomy Scholarships",
    description: "Dedicated endowment support structures assisting physics, astronomy, and biophysics undergraduate programs.",
    url: "https://www.physics.utah.edu/undergraduate-program/scholarships/",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: ["physics", "astronomy funding", "space research aid"]
  },
  {
    id: "mining-engineering-scholarships",
    name: "Mining Engineering Scholarships",
    description: "Industry-backed, massive coverage scholarships ensuring high financial support packages for mining students.",
    url: "https://mining.utah.edu/scholarships/index.php",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: ["mining engineering", "resource development", "funding"]
  },
  {
    id: "metallurgical-engineering-scholarships",
    name: "Metallurgical Engineering Scholarships",
    description: "Generous materials science and engineering tuition assistance scholarships for MSE majors.",
    url: "https://mse.utah.edu/materials-science-engineering-scholarships/",
    category: "Scholarships & Financial Aid",
    tier: "all",
    deadline: "Feb 15",
    relevanceTags: ["metallurgical", "materials science", "engineering funding"]
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
    relevanceTags: ["sri", "freshman research", "laboratory experience", "no experience"]
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

  // Student Organizations & Community
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
    tier: "all",
    relevanceTags: ["chemistry", "acs", "social events", "outreach"]
  },
  {
    id: "organzation-awm",
    name: "Association for Women in Mathematics (AWM)",
    description: "Inspiring community of women and underrepresented mathematicians providing career mentoring, panel advice, and math tea sessions.",
    url: "https://www.math.utah.edu/awmchapter/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["awm", "women in math", "tea socials", "mentoring"]
  },
  {
    id: "organzation-curie-club",
    name: "Curie Club",
    description: "Open community celebrating diverse STEM identities. Promotes environmental advocacy, research opportunities, and wellness.",
    url: "https://www.curieclub.org/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["curie club", "all science", "advocacy", "entrepreneurship"]
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
    id: "organzation-sps",
    name: "Society of Physics Students (SPS)",
    description: "Energetic and welcoming club for astrophysics, gravity, and general quantum enthusiasts. No department major required.",
    url: "https://spsutah.wordpress.com/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["physics", "sps", "space science", "peer community"]
  },
  {
    id: "organzation-uwompa",
    name: "Undergrad Women in Physics & Astronomy (UWomPA)",
    description: "Active collective providing a powerful sisterhood, helpful career panels, and safe peer support for women studying physical theories.",
    url: "https://www.facebook.com/undergradwompa/",
    category: "Community & Student Orgs",
    tier: "all",
    relevanceTags: ["uwompa", "women in physics", "astronomy support", "women"]
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
    tier: "all",
    relevanceTags: ["usac", "curriculum recommendations", "student voice"]
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
    relevanceTags: ["union programming council", "upc", "freshman ambassador board", "student events", "leadership"]
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
    description: "Interactive handbook detailing early research internships, corporate partnerships, and how to query the Handshake job board.",
    url: "https://science.utah.edu/resources/internships/",
    category: "Career Development",
    tier: "all",
    relevanceTags: ["internships", "jobs board", "handshake tools"]
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
    relevanceTags: ["beckman", "prestigious", "chemistry search", "biology stipend"]
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
    tier: 2,
    relevanceTags: ["looper laboratory", "organic chemistry synthetic", "clinical trials"]
  },
  {
    id: "vershinin-biophysics-lab",
    name: "Vershinin Lab (Biophysics)",
    description: "Advanced nanotech lab analyzing kinesin motors, single-molecule cellular forces, and sub-cellular biophysical properties.",
    url: "http://www.physics.utah.edu/~vershinin/home.html",
    category: "Research & Internships",
    tier: 2,
    relevanceTags: ["vershinin physics", "biophysics force tracker", "nanotech cells"]
  },
  {
    id: "hammond-nucleic-lab",
    name: "Hammond Lab (Chemistry)",
    description: "Synthesizes nucleic acid tools, investigating cellular gene control, biomorphic signal channels, and biological pathways.",
    url: "https://www.mchgrp.chem.utah.edu/",
    category: "Research & Internships",
    tier: 2,
    relevanceTags: ["hammond organic", "nucleic chemistry", "rna DNA genomics"]
  },
  {
    id: "shapiro-genetics-lab",
    name: "Shapiro Lab (Biology)",
    description: "Investigate avian evolutionary pathways and skeletal trait variations with modern genomic sequences.",
    url: "http://shapiro.biology.utah.edu/",
    category: "Research & Internships",
    tier: 2,
    relevanceTags: ["shapiro lab", "genomics", "evolution bio", "pigeon traits"]
  },
  {
    id: "gagnon-embryo-lab",
    name: "Gagnon Lab (Biology)",
    description: "Examines embryonic cellular lineages and spatial signaling mapping using gene-editing technology.",
    url: "https://www.gagnonlab.org/",
    category: "Research & Internships",
    tier: 2,
    relevanceTags: ["gagnon biology", "embryonic tracking", "crispr signaling"]
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

  // --- DEPARTMENT HUBS ---
  {
    id: "hub-atmos",
    name: "Atmospheric Sciences Department Hub",
    description: "Weather maps, regional climate details, real-time local air monitors, and core course outlines.",
    url: "https://atmos.utah.edu/",
    category: "Department Hubs",
    tier: "all",
    relevanceTags: ["atmospheric sciences", "weather", "air monitors"]
  },
  {
    id: "hub-biology",
    name: "Biological Sciences Department Hub",
    description: "Lab schedules, course requirements, research mentor positions, and biological biology events calendars.",
    url: "http://www.biology.utah.edu/",
    category: "Department Hubs",
    tier: "all",
    relevanceTags: ["biological sciences", "biology labs", "pre-med track"]
  },
  {
    id: "hub-chemistry",
    name: "Chemistry Department Hub",
    description: "Chemistry chemical safety manuals, stockroom inventory systems, and core curriculum details.",
    url: "http://www.chem.utah.edu/",
    category: "Department Hubs",
    tier: "all",
    relevanceTags: ["chem", "chemistry laboratory", "chemicals"]
  },
  {
    id: "hub-earth",
    name: "Geology & Geophysics Department Hub",
    description: "Seismograph archives, geologic regional maps, field camp itineraries, and planetary science resources.",
    url: "https://earth.utah.edu/",
    category: "Department Hubs",
    tier: "all",
    relevanceTags: ["geology", "earth geophysics", "seismograph"]
  },
  {
    id: "hub-math",
    name: "Mathematics Department Hub",
    description: "Computer lab setups, math course calendars, algebra practice databases, and tutoring support outlines.",
    url: "http://www.math.utah.edu/",
    category: "Department Hubs",
    tier: "all",
    relevanceTags: ["mathematics", "math center", "statistics"]
  },
  {
    id: "hub-metallurgical",
    name: "Metallurgical Engineering Department Hub",
    description: "Materials science facilities indexes, chemical processing guidelines, and specialized materials engineering courses.",
    url: "https://mse.utah.edu/",
    category: "Department Hubs",
    tier: "all",
    relevanceTags: ["metallurgical engineering", "materials science", "alloy labs"]
  },
  {
    id: "hub-mining",
    name: "Mining Engineering Department Hub",
    description: "Blast simulators, mining safety protocols, sustainable rock extraction data panels, and industry partnerships.",
    url: "https://mining.utah.edu/",
    category: "Department Hubs",
    tier: "all",
    relevanceTags: ["mining engineering", "rock extraction", "explosive safety"]
  },
  {
    id: "hub-physics",
    name: "Physics & Astronomy Department Hub",
    description: "Astronomical dome schedules, telescope setup specs, physics lab tools, and quantum colloquium events.",
    url: "http://www.physics.utah.edu/",
    category: "Department Hubs",
    tier: "all",
    relevanceTags: ["physics astronomy", "telescope domes", "colloquiums"]
  }
];
