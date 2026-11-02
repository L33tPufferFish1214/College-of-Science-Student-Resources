# Career Outlook data sources

The Career Outlook page (`src/components/CareerOutlook.tsx`) reads from `CAREER_OUTLOOK_DATA` in `src/data/resources.ts`. Every figure below was taken from the U.S. Bureau of Labor Statistics (BLS) Occupational Outlook Handbook (OOH) on 2026-11-01. Nothing here is estimated.

- **Median pay:** BLS median annual pay, May 2025 data.
- **Growth:** BLS projected employment change, 2025 to 2035.
- **Entry education:** the "Typical entry-level education" field on the BLS page.
- **Related majors:** fields of study the BLS "How to Become One" section names for that job. A major is highlighted in crimson on the site when the College of Science offers it (see the last section).

| Job on the site | BLS page | Median pay | Growth | Entry education | Majors the BLS page names |
|---|---|---|---|---|---|
| Data Scientist | [data-scientists](https://www.bls.gov/ooh/math/data-scientists.htm) | $120,230 | 35% | Bachelor's | Mathematics, statistics, computer science, business, engineering |
| Medical & Health Services Manager | [medical-and-health-services-managers](https://www.bls.gov/ooh/management/medical-and-health-services-managers.htm) | $123,860 | 24% | Bachelor's | Health administration, nursing, business, health information management |
| Epidemiologist | [epidemiologists](https://www.bls.gov/ooh/life-physical-and-social-science/epidemiologists.htm) | $87,220 | 19% | Master's | Public health, biology, public policy, social science |
| Medical Scientist | [medical-scientists](https://www.bls.gov/ooh/life-physical-and-social-science/medical-scientists.htm) | $103,410 | 13% | Doctoral | Biology, chemistry, physical science |
| Forensic Science Technician | [forensic-science-technicians](https://www.bls.gov/ooh/life-physical-and-social-science/forensic-science-technicians.htm) | $72,060 | 13% | Bachelor's | Physical science, biology, forensic science |
| Physical Therapist | [physical-therapists](https://www.bls.gov/ooh/healthcare/physical-therapists.htm) | $102,760 | 12% | Doctoral (DPT) | Healthcare fields, recreation and fitness; prerequisites in anatomy, chemistry, physics |
| Industrial Engineer | [industrial-engineers](https://www.bls.gov/ooh/architecture-and-engineering/industrial-engineers.htm) | $102,440 | 12% | Bachelor's | Industrial, mechanical, electrical engineering |
| Mathematician & Statistician | [mathematicians-and-statisticians](https://www.bls.gov/ooh/math/mathematicians-and-statisticians.htm) | $105,720 | 10% | Master's | Mathematics, statistics; related coursework in computer science, physics |
| Software Developer | [software-developers](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm) | $134,040 | 10% | Bachelor's | Computer and information technology, engineering, mathematics |
| Optometrist | [optometrists](https://www.bls.gov/ooh/healthcare/optometrists.htm) | $136,570 | 10% | Doctoral (OD) | Biology, physical science; prerequisites in chemistry, physics, calculus |
| Actuary | [actuaries](https://www.bls.gov/ooh/math/actuaries.htm) | $130,000 | 9% | Bachelor's | Mathematics, actuarial science, statistics, business |
| Veterinarian | [veterinarians](https://www.bls.gov/ooh/healthcare/veterinarians.htm) | $130,100 | 9% | Doctoral (DVM) | Biology (prerequisites: biology, chemistry, animal science); some schools prefer agriculture |
| Aerospace Engineer | [aerospace-engineers](https://www.bls.gov/ooh/architecture-and-engineering/aerospace-engineers.htm) | $134,960 | 8% | Bachelor's | Aerospace engineering, engineering |
| Natural Sciences Manager | [natural-sciences-managers](https://www.bls.gov/ooh/management/natural-sciences-managers.htm) | $167,220 | 8% | Bachelor's | Biology, chemistry, physics, mathematics, psychology |
| Pilot | [airline-and-commercial-pilots](https://www.bls.gov/ooh/transportation-and-material-moving/airline-and-commercial-pilots.htm) | $210,020 | 7% | Bachelor's for airline pilots | Any field, including transportation, engineering, business |
| Physicist & Astronomer | [physicists-and-astronomers](https://www.bls.gov/ooh/life-physical-and-social-science/physicists-and-astronomers.htm) | $166,880 | 7% | Doctoral | Physics, astronomy, mathematics, computer science, engineering |
| Chemical Engineer | [chemical-engineers](https://www.bls.gov/ooh/architecture-and-engineering/chemical-engineers.htm) | $125,040 | 5% | Bachelor's | Chemical engineering |
| Lawyer | [lawyers](https://www.bls.gov/ooh/legal/lawyers.htm) | $159,670 | 5% | Professional (JD) | No required major; law and legal studies, history, social science are common |
| Physician & Surgeon | [physicians-and-surgeons](https://www.bls.gov/ooh/healthcare/physicians-and-surgeons.htm) | $275,930 | 4% | Doctoral (MD/DO) | No required major; biology, physical science, healthcare fields are typical |

## Notes and caveats

- **Pilot pay:** the BLS page reports $210,020 for the occupation group, $232,140 for airline pilots and $123,220 for commercial pilots. The site shows the group figure.
- **Combined occupations:** Mathematicians and statisticians, physicists and astronomers, physicians and surgeons, software developers (with QA analysts and testers) and pilots are each one BLS occupation page covering the listed titles.
- **Majors are not guarantees.** The BLS lists typical fields; employers and programs vary. Medicine, law and veterinary school accept many majors.
- **Graduate paths:** several jobs need a master's or doctorate, so the major is the first step, not the whole path.
- **Previous version:** the earlier data on this page mixed older BLS releases and a few duplicate or unsourced rows (for example "Pilot (Advanced Seat)", "Software Lead", "Medical Doctor / Orthodontist"). Those were removed or replaced with the current BLS figures above.
- **How the data was gathered:** each BLS page was fetched and read for the fields listed above. To re-verify, open the linked page and compare the "Quick Facts" box and the "How to Become One" tab.

## Which majors are marked as offered by the College of Science

Highlighted majors are those with a matching degree in the College of Science departments (Biology, Chemistry, Mathematics, Physics & Astronomy, and others) listed on [science.utah.edu](https://science.utah.edu/). "Physical science" is highlighted because the College offers chemistry, physics and geology programs, which are physical sciences. Computer science, statistics, engineering (other than metallurgical and mining), public health and business are not College of Science majors, so they appear unhighlighted. Check the [U undergraduate catalog](https://catalog.utah.edu/) for current program names.
