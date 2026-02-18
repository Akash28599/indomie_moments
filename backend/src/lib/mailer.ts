import nodemailer from "nodemailer";
import { config } from "../config/env";
import { logger } from "./logger";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  if (!config.smtp.host || !config.smtp.user) return null;

  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass ?? "",
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });

  return transporter;
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  const t = getTransporter();

  if (!t) {
    logger.warn("SMTP not configured – logging email to console");
    logger.info(
      `--- EMAIL ---\nTo: ${to}\nSubject: ${subject}\n${html}\n--- /EMAIL ---`,
    );
    return;
  }

  await t.sendMail({
    from: config.smtp.from,
    to,
    subject,
    html,
  });

  logger.info("Password reset email sent", { to });
}
