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

## Contact email (EmailJS)

Public forms post to `POST /api/contact`:
- Book a Discovery Call (`type: "discovery"`)
- Workflow Discovery modal (`type: "workflow-discovery"`)

Delivery is handled by **[EmailJS](https://www.emailjs.com/)**; the inbox is `CONTACT_TO` (`Founder@conxorbit.com`).

### 1. Create EmailJS account

1. Sign up at [emailjs.com](https://www.emailjs.com/).
2. **Email Services** → Add New Service → connect Gmail/Outlook (or any supported provider) that can *send* mail.
3. **Email Templates** → Create New Template with:

| Field | Value |
| --- | --- |
| To Email | `{{to_email}}` |
| To Name | `{{to_name}}` |
| Subject | `{{subject}}` |
| Content | `{{message}}` |
| Reply To | `{{reply_to}}` |

4. **Account → API Keys** — copy Public Key and Private Key.
5. **Account → Security** — enable *Allow EmailJS API for non-browser applications* (required for Node). Prefer *Use Private Key* (strict mode).

### 2. Backend `.env`

```
CONTACT_TO=Founder@conxorbit.com
CONTACT_MODE=emailjs
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
EMAILJS_PRIVATE_KEY=xxxxxxxxxxxxxxx
```

Restart the API after saving.

### 3. Frontend

```
REACT_APP_CONTACT_ENDPOINT=http://localhost:5000/api/contact
```

Restart the React app after changing `.env`.

### Local testing without EmailJS

```
CONTACT_MODE=log
```

Submissions print in the API terminal only.

## Notes

- Data file: `backend/data/db.json`
- Uploads: `backend/uploads/`
- Re-seed anytime with `npm run seed` (wipes and reloads from current static content)
