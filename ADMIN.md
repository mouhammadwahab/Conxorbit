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

- **Primary database:** MongoDB (`MONGODB_URI` in `backend/.env`)
- Solutions, case studies, team, offers, admin login → Mongo
- Page chrome (listing/portfolio section titles): still `backend/data/db.json` (LowDB `pageContent`)

Re-seed Mongo (wipes solutions / cases / team / offers / admin and reloads):  
`cd backend && npm run seed`  
(`seed` runs [`src/seed/seedMongo.js`](backend/src/seed/seedMongo.js) and uploads placeholder images to Cloudinary.)

## Images (Cloudinary)

Admin **Choose file** uploads to Cloudinary; `{ url, publicId }` is saved on the Mongo document. Replacing or clearing media updates the DB and deletes the previous Cloudinary asset.

Required `backend/.env`:

```
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Folders (under root **Conx-orbit**):

| Entity | Cloudinary folder | Fields |
|--------|-------------------|--------|
| Solutions | `Conx-orbit/solutions` | `mockup` (hero image), `demo` (video) |
| Case studies | `Conx-orbit/case-studies` | `heroImage` |
| Team | `Conx-orbit/team` | `image` (profile) |
| Offers | `Conx-orbit/offers` | `image` (optional) |

## Admin areas

- Solutions (schema fields only: mockup + demo media)
- Case studies (hero mockup image)
- Team (profile picture)
- Offers (optional image; public site UI not wired yet)
- Pages → listing/portfolio chrome (LowDB)

## Public site

Content is fetched from the API (`/api/solutions`, `/api/case-studies`, `/api/team`, etc.), not from static seed JSON.
