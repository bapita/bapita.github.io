# Bapita Roy — Professional Portfolio

A static, animated professional portfolio built with Next.js, TypeScript, Tailwind CSS and Motion, designed for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for GitHub Pages

```bash
npm run build
```

The static site is generated in `out/`.

The included GitHub Actions workflow automatically handles deployment to GitHub Pages. It supports both a `<username>.github.io` user site and a normal project repository by deriving `basePath` from `GITHUB_REPOSITORY`.

## Before publishing

1. Replace `public/images/profile.jpg` if you want a different portrait.
2. Add your actual resumes at:
   - `public/resume/project-management-resume.pdf`
   - `public/resume/qa-automation-resume.pdf`
3. Replace `hello@example.com` in `components/site.tsx` with your professional email.
4. Replace the GitHub Pages URL in `app/page.tsx` metadata with your real URL.
5. Add your LinkedIn/GitHub URLs when ready.

## Client confidentiality

Projects are intentionally presented as anonymized case studies. Add only information that can be publicly disclosed.

> Note: the two resume PDF links are intentionally placeholders until your actual resumes are added.
