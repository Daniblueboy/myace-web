import { NextResponse } from 'next/server';
import { resend, NOTIFY_EMAIL, FROM_EMAIL } from '@/lib/resend';

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { message: 'Online submissions are temporarily unavailable. Please contact Aceroyal Estates directly.' },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim() : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 });
  }

  const sourcePage = typeof body?.sourcePage === 'string' ? body.sourcePage : 'unknown';

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: 'New newsletter / app waitlist signup',
      text: `Email: ${email}\nSource: ${sourcePage}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to send newsletter signup email', error);
    return NextResponse.json({ message: 'Failed to subscribe. Please try again later.' }, { status: 502 });
  }
}
