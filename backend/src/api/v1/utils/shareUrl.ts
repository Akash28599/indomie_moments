import { config } from "../../../config/env";

export function getShareUrl(slug: string): string {
  return `${config.app.frontendBaseUrl}/share/${slug}`;
}
