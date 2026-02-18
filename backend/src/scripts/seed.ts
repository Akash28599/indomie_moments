import "../load-env";
import bcrypt from "bcryptjs";
import { db, connectDB } from "../db";
import { admins } from "../db/schema";
import { eq } from "drizzle-orm";

const seedAdmin = async () => {
  try {
    const [existing] = await db
      .select()
      .from(admins)
      .where(eq(admins.username, "admin"))
      .limit(1);

    if (existing) {
      console.log("⊗ Admin already exists");
      return existing;
    }

    const hashedPassword = await bcrypt.hash("admin@123", 10);
    const [admin] = await db
      .insert(admins)
      .values({
        username: "admin",
        email: "admin@indomie.com",
        password: hashedPassword,
        fullName: "Indomie Admin",
        role: "superadmin",
        isActive: true,
      })
      .returning();

    return admin;
  } catch (error) {
    console.error("✗ Error creating admin:", error);
    throw error;
  }
};

const seedAll = async () => {
  console.log("\n🌱 Starting database seeding...\n");

  try {
    // Connect to database
    console.log("Connecting to PostgreSQL...");
    await connectDB();
    console.log("✓ PostgreSQL connected\n");

    // Seed data
    console.log("Starting data seeding...\n");
    await seedAdmin();

    console.log("\n✓ Database seeding completed!\n");
    console.log("Default Admin Login:");
    console.log("  Username: admin");
    console.log("  Password: admin@123\n");
    console.log(`Created:`);

    process.exit(0);
  } catch (error) {
    console.error(
      "\n✗ Seeding failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    if (error instanceof Error && error.stack) {
      console.error("Stack:", error.stack);
    }
    process.exit(1);
  }
};

// Run seeding
seedAll().catch((error) => {
  console.error("Fatal error during seeding:", error);
  process.exit(1);
});
