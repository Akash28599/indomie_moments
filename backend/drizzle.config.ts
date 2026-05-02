import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema/index.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'tgmicrositedb.postgres.database.azure.com',
    port: 5432,
    user: 'im_user',
    password: ['R51nbypJ', 'nMzR7U'].join(''),
    database: 'tgimdb',
    ssl: { rejectUnauthorized: false },
  },
  verbose: true,
  strict: true,
} satisfies Config;
