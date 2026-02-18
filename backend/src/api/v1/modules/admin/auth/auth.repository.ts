import { eq, and, gt } from 'drizzle-orm';
import { db } from '../../../../../db';
import { admins } from '../../../../../db/schema';
import type { Admin } from '../../../../../db/schema';

export async function findByUsernameRepo(username: string): Promise<Admin | undefined> {
  const [row] = await db.select().from(admins).where(eq(admins.username, username)).limit(1);
  return row;
}

export async function findAdminByIdRepo(id: string): Promise<Admin | undefined> {
  const [row] = await db.select().from(admins).where(eq(admins.id, id)).limit(1);
  return row;
}

export async function updateLastLoginRepo(id: string): Promise<void> {
  await db.update(admins).set({ lastLogin: new Date() }).where(eq(admins.id, id));
}

export async function findByEmailRepo(email: string): Promise<Admin | undefined> {
  const [row] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  return row;
}

export async function saveResetTokenRepo(
  adminId: string,
  token: string,
  expiresAt: Date,
): Promise<void> {
  await db
    .update(admins)
    .set({ resetToken: token, resetTokenExpiresAt: expiresAt, updatedAt: new Date() })
    .where(eq(admins.id, adminId));
}

export async function findByResetTokenRepo(token: string): Promise<Admin | undefined> {
  const [row] = await db
    .select()
    .from(admins)
    .where(and(eq(admins.resetToken, token), gt(admins.resetTokenExpiresAt, new Date())))
    .limit(1);
  return row;
}

export async function updatePasswordRepo(
  adminId: string,
  hashedPassword: string,
): Promise<void> {
  await db
    .update(admins)
    .set({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiresAt: null,
      updatedAt: new Date(),
    })
    .where(eq(admins.id, adminId));
}
