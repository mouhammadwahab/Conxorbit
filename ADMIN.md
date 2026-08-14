# Admin CMS

## Run locally

Terminal 1 — API:
```bash
cd backend
npm install
npm run seed
npm start
```

Terminal 2 — site:
```bash
cd frontend
npm start
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  
- Default admin: `admin@conxorbit.com` / `admin123`

## Data locations

- Database: `backend/data/db.json` (JSON file store; no MongoDB required)
- Page chrome (listing/portfolio/trade section titles, About team title): `pageContent` keys in the same DB
- Seeded demo assets may still use local `backend/uploads/` paths; new content should use external image URLs

Re-seed (wipes and reloads from current static content): `cd backend && npm run seed`

## Images (Cloudinary / CDN)

Upload images in Cloudinary (or any host), then paste the full `https://...` URL into admin:

- Solutions → **Listing image URL**, **Portfolio image URL**, demo poster URL, SEO OG image
- Team → **Photo image URL**

The public site resolves absolute URLs as-is (no local upload required for CMS images).

## Admin areas

- Solutions (structured detail editors; section badges fixed in public UI)
- Case studies (incl. Published)
- Team (Published + social links)
- Pages → Solutions listing, Portfolio, Façade/Construction related-solutions chrome, About team title
