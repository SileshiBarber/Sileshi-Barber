import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { getReport } from "../lib/metrics.js";
import { logger } from "../lib/logger.js";

const router: IRouter = Router();

function buildHtml(r: ReturnType<typeof getReport>): string {
  const rows = r.topEvents
    .map(
      ({ event, count }) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #1f2833;color:#c5c6c7;font-size:13px;">${event}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #1f2833;color:#c5a059;font-size:13px;text-align:right;font-weight:700;">${count}</td>
      </tr>`,
    )
    .join("");

  const callNowCount =
    (r.clickCounts["call_now"] ?? 0) +
    (r.clickCounts["call_now_navbar"] ?? 0) +
    (r.clickCounts["call_now_mobile"] ?? 0) +
    (r.clickCounts["call_now_services"] ?? 0);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0c10;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0c10;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1f2833;border-radius:12px;overflow:hidden;border:1px solid rgba(197,160,89,0.2);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1f2833 0%,#0b0c10 100%);padding:32px 36px;border-bottom:2px solid #c5a059;">
            <p style="margin:0 0 4px;color:#c5a059;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">
              Monthly Analytics Report
            </p>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:900;letter-spacing:-0.5px;">
              Sileshi Barbershop
            </h1>
            <p style="margin:6px 0 0;color:#c5c6c7;font-size:13px;">
              ${new Date().toLocaleDateString("en-AU", { month: "long", year: "numeric" })} — Footscray VIC 3011
            </p>
          </td>
        </tr>

        <!-- Stat cards -->
        <tr>
          <td style="padding:28px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="33%" style="padding-right:8px;">
                  <div style="background:#0b0c10;border:1px solid rgba(197,160,89,0.15);border-radius:8px;padding:16px;text-align:center;">
                    <p style="margin:0 0 4px;color:#c5a059;font-size:28px;font-weight:900;">${r.recentVisits}</p>
                    <p style="margin:0;color:#c5c6c7;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Visits (30d)</p>
                  </div>
                </td>
                <td width="33%" style="padding:0 4px;">
                  <div style="background:#0b0c10;border:1px solid rgba(197,160,89,0.15);border-radius:8px;padding:16px;text-align:center;">
                    <p style="margin:0 0 4px;color:#c5a059;font-size:28px;font-weight:900;">${callNowCount}</p>
                    <p style="margin:0;color:#c5c6c7;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Call Taps</p>
                  </div>
                </td>
                <td width="33%" style="padding-left:8px;">
                  <div style="background:#0b0c10;border:1px solid rgba(197,160,89,0.15);border-radius:8px;padding:16px;text-align:center;">
                    <p style="margin:0 0 4px;color:#c5a059;font-size:28px;font-weight:900;">${r.uptimeDays}d</p>
                    <p style="margin:0;color:#c5c6c7;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Uptime</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Top events table -->
        <tr>
          <td style="padding:24px 36px 0;">
            <p style="margin:0 0 12px;color:#c5a059;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">
              Top Interactions (Last 30 Days)
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0c10;border-radius:8px;border:1px solid rgba(255,255,255,0.05);overflow:hidden;">
              <tr style="background:rgba(197,160,89,0.08);">
                <th style="padding:10px 12px;text-align:left;color:#c5c6c7;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Event</th>
                <th style="padding:10px 12px;text-align:right;color:#c5c6c7;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Count</th>
              </tr>
              ${rows || '<tr><td colspan="2" style="padding:16px;text-align:center;color:#c5c6c7;font-size:13px;">No interactions tracked yet — this is a test send.</td></tr>'}
            </table>
          </td>
        </tr>

        <!-- All-time visits -->
        <tr>
          <td style="padding:20px 36px 0;">
            <p style="margin:0;color:#c5c6c7;font-size:13px;">
              All-time site visits: <strong style="color:#ffffff;">${r.totalVisits.toLocaleString()}</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 36px 24px;">
            <div style="border-top:1px solid rgba(255,255,255,0.05);padding-top:20px;">
              <p style="margin:0;color:#c5c6c7;font-size:12px;opacity:0.5;">
                Sileshi Barbershop · 151 Trugo La, Footscray VIC 3011 · 0431 552 770
              </p>
              <p style="margin:4px 0 0;color:#c5c6c7;font-size:12px;opacity:0.4;">
                Auto-generated on ${new Date().toLocaleDateString("en-AU")}.
              </p>
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

router.post("/report/test", async (_req, res) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    res.status(500).json({ error: "SMTP credentials not configured" });
    return;
  }

  try {
    const report = getReport();
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Sileshi Barbershop Analytics" <${SMTP_USER}>`,
      to: "david@tykieautomation.com",
      subject: `📊 TEST — Monthly Report · Sileshi Barbershop · ${new Date().toLocaleDateString("en-AU", { month: "long", year: "numeric" })}`,
      html: buildHtml(report),
    });

    logger.info("Test analytics email sent successfully");
    res.json({ ok: true, message: "Test report sent to david@tykieautomation.com" });
  } catch (err) {
    logger.error({ err }, "Test email send failed");
    res.status(500).json({ error: String(err) });
  }
});

export default router;
