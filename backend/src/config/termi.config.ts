// Termi SMS Configuration
export interface TermiiTokenRequest {
  api_key: string;
  pin_type: string;
  to: string;
  from: string;
  channel: string;
  pin_attempts: number;
  pin_time_to_live: number;
  pin_length: number;
  pin_placeholder: string;
  message_text: string;
}

export interface TermiiTokenResponse {
  status: string;
  smsStatus: string;
  pinId: string;
  phone_number: string;
  message?: string;
}
import { config } from "./env";

export const termiConfig = {
  apiKey: config.termii.apiKey,
  senderId: config.termii.senderId,
  baseUrl: config.termii.baseUrl,
};

/**
 * Normalize phone number to Nigerian E.164 format (2348XXXXXXXXX).
 *
 * Accepted inputs:
 *   "8012345678"       → "2348012345678"   (10 digits – frontend sends this)
 *   "08012345678"      → "2348012345678"   (11 digits with leading 0)
 *   "2348012345678"    → "2348012345678"   (already has country code)
 *   "+2348012345678"   → "2348012345678"   (E.164 with +)
 *
 * Throws if the result isn't exactly 13 digits starting with 234.
 */
export function cleanPhoneNumber(phoneNumber: string): string {
  // Strip everything except digits
  let cleaned = phoneNumber.replace(/\D/g, "");

  // 10 digits → prefix with 234
  if (cleaned.length === 10) {
    cleaned = "234" + cleaned;
  }

  // 11 digits starting with 0 → drop the 0 and prefix with 234
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    cleaned = "234" + cleaned.substring(1);
  }

  // Validate final result: must be 13 digits starting with 234
  if (cleaned.length !== 13 || !cleaned.startsWith("234")) {
    throw new Error("INVALID_PHONE_NUMBER");
  }

  return cleaned;
}