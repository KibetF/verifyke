import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM ?? "VerifyKe <noreply@verifyke.co.ke>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/** Fire-and-forget email — never throws, logs errors silently */
async function send(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    console.error("[email] failed to send to", to, err);
  }
}

// ─── Shared layout ────────────────────────────────────────────────────────────

function layout(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin: 0; padding: 0; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
    .header { background: #0f172a; padding: 24px 32px; }
    .header span { color: #fff; font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
    .body { padding: 32px; color: #334155; font-size: 15px; line-height: 1.6; }
    .body h2 { margin: 0 0 16px; font-size: 20px; color: #0f172a; }
    .detail-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #64748b; }
    .detail-value { font-weight: 500; color: #0f172a; }
    .btn { display: inline-block; margin-top: 24px; background: #0f172a; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600; }
    .footer { padding: 20px 32px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header"><span>VerifyKe</span></div>
    <div class="body">${content}</div>
    <div class="footer">© ${new Date().getFullYear()} VerifyKe · Independent Property Verification in Kenya</div>
  </div>
</body>
</html>`;
}

// ─── Email senders ─────────────────────────────────────────────────────────────

export async function sendBookingConfirmation({
  to,
  clientName,
  propertyName,
  serviceType,
  totalPrice,
  scheduledDate,
}: {
  to: string;
  clientName: string;
  propertyName: string;
  serviceType: string;
  totalPrice: number;
  scheduledDate?: string | null;
}) {
  const html = layout(`
    <h2>Booking Confirmed</h2>
    <p>Hi ${clientName},</p>
    <p>Your verification request has been received. We will assign an agent shortly.</p>
    <div class="detail-box">
      <div class="detail-row">
        <span class="detail-label">Property</span>
        <span class="detail-value">${propertyName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Service</span>
        <span class="detail-value">${serviceType}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Total</span>
        <span class="detail-value">KES ${totalPrice.toLocaleString()}</span>
      </div>
      ${scheduledDate ? `<div class="detail-row"><span class="detail-label">Preferred Date</span><span class="detail-value">${scheduledDate}</span></div>` : ""}
    </div>
    <a class="btn" href="${APP_URL}/dashboard/requests">View My Requests</a>
  `);

  await send(to, "Your VerifyKe request has been received", html);
}

export async function sendAgentAssignedToClient({
  to,
  clientName,
  propertyName,
  agentName,
  requestId,
}: {
  to: string;
  clientName: string;
  propertyName: string;
  agentName: string;
  requestId: string;
}) {
  const html = layout(`
    <h2>Agent Assigned</h2>
    <p>Hi ${clientName},</p>
    <p>An agent has been assigned to your verification request for <strong>${propertyName}</strong>.</p>
    <div class="detail-box">
      <div class="detail-row">
        <span class="detail-label">Property</span>
        <span class="detail-value">${propertyName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Assigned Agent</span>
        <span class="detail-value">${agentName}</span>
      </div>
    </div>
    <p>We will notify you as soon as the inspection is complete.</p>
    <a class="btn" href="${APP_URL}/dashboard/requests/${requestId}">Track Request</a>
  `);

  await send(to, "An agent has been assigned to your request", html);
}

export async function sendNewAssignmentToAgent({
  to,
  agentName,
  propertyName,
  county,
  serviceType,
  scheduledDate,
  requestId,
}: {
  to: string;
  agentName: string;
  propertyName: string;
  county: string;
  serviceType: string;
  scheduledDate?: string | null;
  requestId: string;
}) {
  const html = layout(`
    <h2>New Inspection Assignment</h2>
    <p>Hi ${agentName},</p>
    <p>You have been assigned a new property inspection. Please review the details below.</p>
    <div class="detail-box">
      <div class="detail-row">
        <span class="detail-label">Property</span>
        <span class="detail-value">${propertyName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">County</span>
        <span class="detail-value">${county}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Service Type</span>
        <span class="detail-value">${serviceType}</span>
      </div>
      ${scheduledDate ? `<div class="detail-row"><span class="detail-label">Scheduled Date</span><span class="detail-value">${scheduledDate}</span></div>` : ""}
    </div>
    <a class="btn" href="${APP_URL}/agent/requests?highlight=${requestId}">View My Requests</a>
  `);

  await send(to, "New inspection assignment on VerifyKe", html);
}

export async function sendInspectionComplete({
  to,
  clientName,
  propertyName,
  riskLevel,
  reportId,
}: {
  to: string;
  clientName: string;
  propertyName: string;
  riskLevel: string;
  reportId: string;
}) {
  const riskColor = riskLevel === "LOW" ? "#16a34a" : riskLevel === "MODERATE" ? "#d97706" : "#dc2626";

  const html = layout(`
    <h2>Inspection Complete</h2>
    <p>Hi ${clientName},</p>
    <p>The inspection for <strong>${propertyName}</strong> has been completed and your report is ready.</p>
    <div class="detail-box">
      <div class="detail-row">
        <span class="detail-label">Property</span>
        <span class="detail-value">${propertyName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Risk Level</span>
        <span class="detail-value" style="color:${riskColor};font-weight:700;">${riskLevel}</span>
      </div>
    </div>
    <a class="btn" href="${APP_URL}/dashboard/reports/${reportId}">View Full Report</a>
  `);

  await send(to, "Your inspection report is ready — VerifyKe", html);
}
