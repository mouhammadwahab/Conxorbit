# ConX Orbit API

JSON-file database (LowDB) + Express. No MongoDB install required.

## Setup

```bash
cd backend
npm install
npm run seed
npm run dev
```

API: `http://localhost:5000`

Admin login (after seed):
- Email: `admin@conxorbit.com`
- Password: `admin123`

## Frontend

Set `REACT_APP_API_URL=http://localhost:5000` in `frontend/.env`, then:

```bash
cd frontend
npm start
```

Admin UI: `http://localhost:3000/admin/login`

## Notes

- Data file: `backend/data/db.json`
- Uploads: `backend/uploads/`
- Re-seed anytime with `npm run seed` (wipes and reloads from current static content)
