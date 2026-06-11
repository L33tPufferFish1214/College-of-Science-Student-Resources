# College of Science Student Resource Guide

A student-focused resource website for the University of Utah College of Science.

## About the Project

I created this website to help students more easily find important resources that are scattered across the University of Utah College of Science website and related campus pages.

As a student, it can be difficult to know where to look for academic help, advising information, scholarships, research opportunities, mental health support, student organizations, and career resources. Many of these resources exist, but they are often spread across different pages or hidden inside larger university websites.

This project brings those resources together in one organized, easy-to-use website so students can quickly find the support they need.

## Live Website

View the website here:

[College of Science Student Resource Guide](https://l33tpufferfish1214.github.io/College-of-Science-Student-Resources/)

## Features

- Centralized list of student resources for College of Science students
- Search and filter tools to help students find relevant resources faster
- Categories for:
  - Academic support
  - Advising and course planning
  - Scholarships and financial aid
  - Research and internships
  - Wellness and mental health
  - Student communities and organizations
  - Career development
  - Housing and campus life
  - Emergency and safety resources
- Quick-access cards for commonly needed student support areas
- Student-friendly descriptions that explain what each resource is for
- Links that take students directly to the official resource pages

## Why I Built This

The University of Utah College of Science offers many helpful programs and services, but students may not always know they exist or where to find them.

This website is meant to reduce that confusion by organizing useful resources into a single guide. The goal is to make it easier for students to get help, plan their academic path, find opportunities, and feel more supported during their time at the University of Utah.

## Tech Stack

This project was built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- JavaScript/HTML/CSS

## Disclaimer

This is an independent student-created project. It is not an official University of Utah website.

The website links to official University of Utah and College of Science resources whenever possible. Students should always check the official pages for the most current information, deadlines, and policies.

## How to Download, Run, and Edit the Project

This project can be downloaded and edited locally for future development.

### Prerequisites

Before working on the project, make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org/)

You can check if they are installed by running:

```bash
git --version
node --version
npm --version
````

### Download the Project

To download the project using Git, open a terminal and run:

```bash
git clone https://github.com/L33tPufferFish1214/Collage-of-Science-Student-Resources.git
```

Then move into the project folder:

```bash
cd Collage-of-Science-Student-Resources
```

You can also download the project as a ZIP file from GitHub by clicking the green **Code** button and selecting **Download ZIP**.

### Install Dependencies

After downloading the project, install the required packages:

```bash
npm install
```

This installs all dependencies needed to run the website locally.

### Run the Website Locally

To start the development server, run:

```bash
npm run dev
```

After running this command, the terminal will show a local URL, usually something like:

```bash
http://localhost:5173/
```

Open that link in your browser to view the website.

### Editing the Website

Most of the website files are located inside the `src` folder.

```text
src/
├── assets/
├── components/
├── data/
│   └── resources.ts
├── App.tsx
├── index.css
└── main.tsx
```

Some important files to know:

* `src/App.tsx` controls the main structure of the website.
* `src/components/` contains reusable parts of the website.
* `src/data/resources.ts` contains the student resource information displayed on the site.
* `src/index.css` contains styling and Tailwind CSS setup.
* `public/` can be used for static files like images or icons.

To add, remove, or edit student resources, update the data inside:

```bash
src/data/resources.ts
```

To change the layout or design, edit the components inside:

```bash
src/components/
```

### Build the Project

Before deploying or checking the final production version, run:

```bash
npm run build
```

This creates an optimized production build of the website.

### Preview the Production Build

To preview the production build locally, run:

```bash
npm run preview
```

### Deploy the Website

This project is deployed using GitHub Pages. To deploy updates, run:

```bash
npm run deploy
```

After deployment, the live website will be updated at:

[College of Science Student Resource Guide](https://l33tpufferfish1214.github.io/Collage-of-Science-Student-Resources/)

### Suggested Development Workflow

For future development, a typical workflow would be:

```bash
git pull
npm install
npm run dev
```

Make changes to the project files, then check that everything still works.

Before committing changes, it is a good idea to run:

```bash
npm run build
```

Then save your changes with Git:

```bash
git add .
git commit -m "Update student resources"
git push
```

This helps keep track of changes and makes it easier to continue improving the project over time.

## Author
Created by L33tPufferFish1214.
