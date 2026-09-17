import { Resend } from 'resend';

// No lead-capture backend today (Render is not in use) — form submissions
// are emailed directly via Resend instead of stored. `resend` is null when
// RESEND_API_KEY isn't configured so routes can fail gracefully rather than
// throw, matching the pre-existing fallback-mode "temporarily unavailable"
// behavior until the key is added.
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const NOTIFY_EMAIL = process.env.LEADS_NOTIFY_EMAIL || 'customercare@aceroyalestates.com';

// resend.dev is Resend's shared sending domain — it works without verifying
// a custom domain first, so submissions work immediately. Once a domain is
// verified in Resend (see RESEND_FROM_EMAIL), switch to sending from it.
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Aceroyal Estates <onboarding@resend.dev>';
