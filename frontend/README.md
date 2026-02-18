# Admin Frontend (React + Vite + TypeScript)

Admin portal with **Login**, **Dashboard**, **Campaigns**, and **Registrations**.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` (optional) to point to the API:

```env
VITE_API_BASE_URL=http://localhost:7001/api
```

Default is `http://localhost:7001/api` if not set.

3. Run dev server:

```bash
npm run dev
```

Runs on port 5173 (or 5175 if configured). Open the URL and go to `/login` to sign in.

## Routes

- `/login` – Admin login
- `/` – Dashboard (protected)
- `/campaigns` – Campaign list
- `/campaigns/new` – Create campaign
- `/campaigns/edit/:id` – Edit campaign
- `/registrations` – Registered users list (search, pagination)

## Build

```bash
npm run build
```

Output in `dist/`. Serve with any static host.
