# ConX Orbit — Frontend

Marketing site for ConX Orbit (Create React App).

## Setup

```bash
cd frontend
npm install
npm start
```

## Production build

```bash
cd frontend
npm run build
```

Deploy the `frontend/build` folder to any static host (Netlify, Vercel, Cloudflare Pages, S3, etc.).

SPA fallback is included via `public/_redirects` (Netlify). For other hosts, route all paths to `index.html`.

## Config

Copy `.env.example` to `.env` if needed:

- `REACT_APP_CONTACT_ENDPOINT` — form POST URL (optional; otherwise mailto)
- `REACT_APP_GA_ID` — Google Analytics ID (optional)

Brand colors: `src/styles/theme.css`  
Copy: `src/content/siteContent.js`

## Backend

`/backend` is reserved for a future API. The contact form works without it.
