import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../../../../../config/env";
import { ERROR_MESSAGES } from "../../../common/constants";
import type { LoginResult, AuthAdmin } from "./auth.types";
import type { Admin } from "../../../../../db/schema";
import crypto from "crypto";
import {
  findByUsernameRepo,
  findAdminByIdRepo,
  updateLastLoginRepo,
  findByEmailRepo,
  saveResetTokenRepo,
  findByResetTokenRepo,
  updatePasswordRepo,
} from "./auth.repository";
import { sendEmail } from "../../../../../lib/mailer";
import { passwordResetEmailTemplate } from "../../../../../templates/passwordResetEmail";
import { logger } from "../../../../../lib/logger";

function toAuthAdmin(admin: Omit<Admin, 'password'>): AuthAdmin {
  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    fullName: admin.fullName,
    role: admin.role,
    lastLogin: admin.lastLogin ?? null,
  };
}

export async function loginService(identifier: string, password: string): Promise<LoginResult> {
  // Accept either username or email
  let admin = await findByUsernameRepo(identifier);
  if (!admin) {
    admin = await findByEmailRepo(identifier.toLowerCase().trim());
  }
  if (!admin) throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  if (!admin.isActive) throw new Error(ERROR_MESSAGES.ACCOUNT_INACTIVE);
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);

  await updateLastLoginRepo(admin.id);
  const accessToken = jwt.sign(
    { id: admin.id, role: admin.role, type: "access" },
    config.jwt.adminSecret,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    { id: admin.id, type: "refresh" },
    config.jwt.adminRefreshSecret,
    { expiresIn: "7d" },
  );
  const { password: _p, ...rest } = admin;
  return { accessToken, refreshToken, admin: toAuthAdmin(rest) };
}

export async function refreshAdminTokensService(refreshToken: string) {
  const decoded = jwt.verify(refreshToken, config.jwt.adminRefreshSecret) as {
    id: string;
    type?: string;
  };
  if (decoded.type !== "refresh") {
    throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
  }
  const admin = await findAdminByIdRepo(decoded.id);
  if (!admin || !admin.isActive) throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
  const accessToken = jwt.sign(
    { id: admin.id, role: admin.role, type: "access" },
    config.jwt.adminSecret,
    { expiresIn: "15m" },
  );
  const newRefreshToken = jwt.sign(
    { id: admin.id, type: "refresh" },
    config.jwt.adminRefreshSecret,
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken: newRefreshToken };
}

export function getProfileService(admin: Omit<Admin, 'password'>): { admin: AuthAdmin } {
  return { admin: toAuthAdmin(admin) };
}

export async function requestPasswordResetService(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();
  logger.debug("Password reset requested", { email: normalizedEmail });

  const admin = await findByEmailRepo(normalizedEmail);
  if (!admin || !admin.isActive) {
    logger.debug("No active admin found for password reset", { email: normalizedEmail });
    return;
  }

  logger.debug("Admin found for password reset", { adminId: admin.id });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await saveResetTokenRepo(admin.id, token, expiresAt);

  const resetLink = `${config.app.frontendBaseUrl}/admin/resetpassword?token=${token}`;

  const html = passwordResetEmailTemplate({
    fullName: admin.fullName,
    resetLink,
    expiryHours: 1,
    brandName: "Indomie Admin",
    brandColor: "#E2231A",
  });

  await sendEmail(
    admin.email,
    "Password Reset - Indomie Admin",
    html
  );
  logger.info("Password reset email sent", { adminId: admin.id });
}

export async function resetPasswordService(
  token: string,
  newPassword: string,
): Promise<void> {
  if (!token || !newPassword) {
    throw new Error("Token and new password are required.");
  }
  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const admin = await findByResetTokenRepo(token);
  if (!admin) {
    throw new Error("Invalid or expired reset link. Please request a new one.");
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await updatePasswordRepo(admin.id, hashed);
}
