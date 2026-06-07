# Backend Developer Portfolio

A portfolio for Paulson Bosah, migrated from a pure HTML, CSS, and JavaScript project into a React + TypeScript project powered by Vite.

Live site: [paulsonlegacy.github.io/paulson-bosah](https://paulsonlegacy.github.io/paulson-bosah)

## About

I'm a backend developer focused on building APIs and server-side systems that actually work. This portfolio highlights my projects, skills, certifications, and approach to solving real problems with code.

Tech stack featured in the portfolio:

- Python & Django
- PHP
- Golang & GoFiber
- PostgreSQL & MySQL
- REST APIs

## Migration Notes

This repository started as a static HTML portfolio. The active project now lives at the repository root as a React + TypeScript app.

The React migration keeps the original portfolio content and styling, but moves page behavior into React:

- Navigation state is handled with React state.
- Projects are loaded from `src/assets/json/projects.json`.
- Certification and project images are imported from `src/assets/images/`.
- The contact form still submits through Formspree.

## Project Structure

```text
.
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/          # Portfolio images, JSON, and source-owned assets
│   ├── App.tsx          # Main React portfolio
│   ├── App.css          # Portfolio page styles
│   ├── index.css        # Shared/global styles
│   └── main.tsx         # React entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Running Locally

```bash
npm install
npm run dev
```

Then visit the local URL printed by Vite.

## Build

```bash
npm run build
```

## Adding Projects

Add project details to `src/assets/json/projects.json`:

```json
{
  "title": "Your Project Name",
  "description": "Brief description of what it does",
  "tech": ["Django", "PostgreSQL", "Redis"],
  "image": "images/your-project.jpg",
  "video": null,
  "github": "https://github.com/yourusername/project",
  "demo": "https://yourproject.com",
  "detailPage": null
}
```

## Contact Form

The contact form uses [Formspree](https://formspree.io). Update `formspreeEndpoint` in `src/App.tsx` if the form endpoint changes.
