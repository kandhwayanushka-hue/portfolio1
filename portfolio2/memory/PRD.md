# Anushka Kandhway — Portfolio PRD

## Identity
- **Name**: Anushka Kandhway
- **Role**: Full-Stack Developer
- **Location**: Delhi, India
- **Email**: anushkakandhway@gmail.com
- **GitHub**: @kandhwayanushka-hue
- **LinkedIn**: /in/anushka-kandhway-0b2463364

## Vision
A Seth Lukin–style portfolio adapted for a full-stack developer early in their career. The tone is playful, pixel-retro, and brutally honest about being a work in progress.

## Architecture
- **Backend**: FastAPI + Motor (MongoDB). All routes under `/api`.
  - `GET /api/projects` — list 3 case studies (in-memory)
  - `GET /api/projects/{slug}` — case study detail
  - `POST /api/contact` — saves to `contact_submissions`
  - `GET /api/contact` — list submissions (newest first)
- **Frontend**: React 19 + React Router v7 + Framer Motion + Shadcn UI + Sonner toast
  - Routes: `/` (Home), `/case-studies/:slug`
  - Custom CSS cursor blob, CSS marquees, brutalist utilities

## Projects
1. **Portfolio** — personal site, built from scratch (React, Tailwind, JS)
2. **60 Days to AI** — learn-in-public AI journey (HTML, Python, Data Science)
3. **Projects Personal** — full-stack experiments (JS, React, Node.js)

## Design Tokens
- Background: #FDFBF7, Primary: #FF3B30, Secondary: #007AFF, Accent: #FFCC00, Ink: #0A0A0A
- Fonts: Outfit (display), VT323 (pixel), DM Sans (body)

## Backlog
- [ ] Replace in-memory PROJECTS with MongoDB collection + admin UI
- [ ] Add previous/next case study navigation
- [ ] Add blog/journal section
- [ ] Add password-protected `/admin` route for submissions
- [ ] Add resume/CV download
