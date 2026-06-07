# Backend Developer Portfolio

A portfolio for Paulson Bosah, now being migrated from a pure HTML, CSS, and JavaScript project into a React + TypeScript project powered by Vite.

The previous static implementation is preserved in `old/` for reference while the active app now lives at the project root.

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

This repository started as a static HTML portfolio. The old files have been moved into `old/`, and the active project has been moved from `my-app/` into the repository root.

The React migration keeps the original portfolio content and styling, but moves page behavior into React:

- Navigation state is handled with React state.
- Projects are loaded from `public/assets/json/projects.json`.
- Certification and project images are served from `public/assets/images/`.
- The contact form still submits through Formspree.

## Project Structure

```text
.
├── old/                 # Archived HTML/CSS/JS version
├── public/
│   └── assets/          # Portfolio images, JSON, and archived static assets
├── src/
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

Add project details to `public/assets/json/projects.json`:

```json
{
  "title": "Your Project Name",
  "description": "Brief description of what it does",
  "tech": ["Django", "PostgreSQL", "Redis"],
  "image": "assets/images/your-project.jpg",
  "video": null,
  "github": "https://github.com/yourusername/project",
  "demo": "https://yourproject.com",
  "detailPage": null
}
```

## Contact Form

The contact form uses [Formspree](https://formspree.io). Update `formspreeEndpoint` in `src/App.tsx` if the form endpoint changes.
