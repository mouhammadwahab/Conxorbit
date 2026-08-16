# ConX Orbit API

MongoDB (Mongoose) + Express + Cloudinary for CMS media.

## Setup

```bash
cd backend
npm install
# Ensure MONGODB_URI + Cloudinary keys are in .env
npm run seed
npm run dev
```

API: `http://localhost:5000`

Admin login (after seed):
- Email: `admin@conxorbit.com`
- Password: `admin123`

## Environment

See [`.env.example`](.env.example). Required:

- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

## Frontend

Set `REACT_APP_API_URL=http://localhost:5000` in `frontend/.env`, then:

```bash
cd frontend
npm start
```

Admin UI: `http://localhost:3000/admin/login`

## Media

- Upload: `POST /api/admin/upload/image` and `/video` (auth required)
- Entity CRUD stores Cloudinary `url` + `publicId` on the document
- Folders: `Conx-orbit/solutions`, `Conx-orbit/case-studies`, `Conx-orbit/team`, `Conx-orbit/offers`
- Replacing/clearing media deletes the previous Cloudinary asset

## Contact email (EmailJS)

Public forms post to `POST /api/contact`:
- Book a Discovery Call (`type: "discovery"`)
- Workflow Discovery modal (`type: "workflow-discovery"`)

Set `CONTACT_*` / `EMAILJS_*` in `.env`. See earlier EmailJS dashboard steps if needed.

Local without SMTP/EmailJS: `CONTACT_MODE=log`

## Notes

- Seed: `npm run seed` → `src/seed/seedMongo.js` (uploads real placeholder images from `frontend/src/assets/solutions`)
- Legacy LowDB seed: `npm run seed:lowdb` (page chrome / old JSON only)
- Health: `GET /api/health` includes Mongo connection status
