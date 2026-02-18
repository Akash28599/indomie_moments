# Admin API (TypeScript + Drizzle ORM)

Admin API with **Auth**, **Dashboard stats**, **Campaigns CRUD**, and **Registrations** (users list).

## Tech Stack

- **TypeScript** - Type-safe code
- **Drizzle ORM** - Modern SQL ORM
- **Express** - Web framework
- **PostgreSQL** - Database (uses same DB as main Backend)

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Environment variables** (copy from main Backend or create `.env`):

```env
DB_HOST=localhost
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_PORT=5432
DB_CONNECT_SSL_REQUIRED=false
JWT_ADMIN_SECRET=your_jwt_admin_secret_min_32_chars
PORT=7001
NODE_ENV=development
```

**Note:** Uses the **same database** as the main Backend (tables: `admins`, `campaigns`, `users`, `locations`).

3. **Database Migrations:**

Generate migration files from schema changes:

```bash
npm run db:generate
```

Apply migrations to database:

```bash
npm run db:migrate
```

Or use Drizzle Studio to view/edit database:

```bash
npm run db:studio
```

4. **Seed Data:**

Seed initial admin user, locations, and campaign:

```bash
npm run seed
```

5. **Run development server:**

```bash
npm run dev
```

Server runs on port 7001 by default.

6. **Build for production:**

```bash
npm run build
npm start
```

## Database Schema

Drizzle schemas are in `src/db/schema/`:

- `admins.ts` - Admin users
- `campaigns.ts` - Campaigns
- `users.ts` - Registered users
- `locations.ts` - Store locations

## Scripts

- `npm run dev` - Run with hot reload (tsx watch)
- `npm run build` - Compile TypeScript to `dist/`
- `npm start` - Run compiled code from `dist/`
- `npm run type-check` - Type check without building
- `npm run db:generate` - Generate migration files from schema
- `npm run db:migrate` - Apply migrations to database
- `npm run db:push` - Push schema directly (dev only, not recommended)
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run seed` - Seed initial data (admin, locations, campaign)

## API Endpoints

### Auth

- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile (Bearer token)

### Dashboard

- `GET /api/admin/dashboard/stats` - Dashboard statistics

### Campaigns

- `GET /api/admin/campaigns` - List all campaigns
- `POST /api/admin/campaigns` - Create campaign (admin/superadmin)
- `GET /api/admin/campaigns/:id` - Get campaign by ID
- `PUT /api/admin/campaigns/:id` - Update campaign (admin/superadmin)
- `DELETE /api/admin/campaigns/:id` - Delete campaign (superadmin only)

### Registrations

- `GET /api/admin/users` - List users (query: `page`, `limit`, `search`)

## Development Workflow

1. **Make schema changes** in `src/db/schema/*.ts`
2. **Generate migration:** `npm run db:generate`
3. **Review migration files** in `drizzle/migrations/`
4. **Apply migrations:** `npm run db:migrate`
5. **Seed data (if needed):** `npm run seed`

## Migration Files

Migration files are generated in `drizzle/migrations/` directory. These files should be committed to version control.

## Notes

- The database schema matches the existing main Backend structure
- Migrations are incremental - only changes are tracked
- Use `db:generate` before committing schema changes
- Use `db:migrate` to apply migrations in production
