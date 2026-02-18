interface PasswordResetEmailParams {
    fullName: string;
    resetLink: string;
    expiryHours?: number;
    brandName?: string;
    brandColor?: string;
}

export function passwordResetEmailTemplate({
    fullName,
    resetLink,
    expiryHours = 1,
    brandName = "Indomie Admin",
    brandColor = "#E2231A",
}: PasswordResetEmailParams): string {
    const currentYear = new Date().getFullYear();

    return `
  <div style="margin:0; padding:0; background-color:#f4f6f9; font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background-color:#f4f6f9;">
      <tr>
        <td align="center">
          
          <table width="520" cellpadding="0" cellspacing="0"
            style="background:#ffffff; border-radius:16px; padding:40px; box-shadow:0 8px 30px rgba(0,0,0,0.08);">
            
            <!-- Brand -->
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <h1 style="margin:0; color:${brandColor}; font-size:22px; font-weight:700;">
                  ${brandName}
                </h1>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td>
                <h2 style="margin:0 0 16px 0; font-size:20px; color:#111;">
                  Reset Your Password
                </h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="color:#444; font-size:15px; line-height:1.6;">
                <p style="margin:0 0 16px 0;">
                  Hi <strong>${fullName}</strong>,
                </p>

                <p style="margin:0 0 16px 0;">
                  We received a request to reset your password.
                  Click the button below to create a new one.
                </p>

                <p style="margin:0 0 24px 0; color:#666; font-size:14px;">
                  This link will expire in <strong>${expiryHours} hour${expiryHours > 1 ? "s" : ""}</strong>.
                </p>
              </td>
            </tr>

           <!-- Button -->
<tr>
  <td align="center" style="padding:20px 0 30px 0;">
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" bgcolor="${brandColor}" style="border-radius:40px;">
          <a href="${resetLink}"
             target="_blank"
             style="
               font-size:16px;
               font-family: Arial, sans-serif;
               color:#ffffff;
               text-decoration:none;
               padding:14px 36px;
               display:inline-block;
               font-weight:bold;
               border-radius:40px;
               background-color:${brandColor};
             ">
            Reset Password
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>


            <!-- Fallback -->
            <tr>
              <td style="border-top:1px solid #eee; padding-top:20px;">
                <p style="margin:0 0 10px 0; font-size:13px; color:#777;">
                  If the button doesn’t work, copy and paste this link:
                </p>
                <p style="word-break:break-all; font-size:12px; color:#999;">
                  ${resetLink}
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top:30px;">
                <p style="margin:0; font-size:12px; color:#999; text-align:center;">
                  If you didn’t request this, you can safely ignore this email.
                </p>
                <p style="margin:8px 0 0 0; font-size:11px; color:#ccc; text-align:center;">
                  © ${currentYear} ${brandName}. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
}
