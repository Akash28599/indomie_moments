import QRCode from 'qrcode';

/**
 * Generate a QR code as a data URL (base64) for an arbitrary target URL.
 * Used by generic QR flow; target URL is defined when creating the QR (e.g. in campaign form).
 */
export async function generateQRFromUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, { type: 'image/png', margin: 2, width: 256 });
}
