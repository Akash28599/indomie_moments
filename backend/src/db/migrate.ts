import "../load-env";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from './index';

const runMigrations = async () => {
  console.log('🔄 Running migrations...\n');

  try {
    await migrate(db, { migrationsFolder: './drizzle/migrations' });
    console.log('✓ Migrations completed successfully\n');
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  }
};

runMigrations();
