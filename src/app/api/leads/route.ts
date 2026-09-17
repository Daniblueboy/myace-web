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
  const fullName = typeof body?.fullName === 'string' ? body.fullName.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!fullName || !email || !phone || !message) {
    return NextResponse.json({ message: 'Full name, email, phone and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 });
  }

  const referenceId = `LEAD-${Date.now().toString(36).toUpperCase()}`;
  const enquiryType = typeof body?.enquiryType === 'string' ? body.enquiryType : undefined;
  const leadType = typeof body?.type === 'string' ? body.type : undefined;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New ${enquiryType || leadType || 'General'} enquiry — ${fullName}`,
      text: [
        `Reference: ${referenceId}`,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        body?.officeState ? `Office/State: ${body.officeState}` : null,
        body?.propertyId ? `Property ID: ${body.propertyId}` : null,
        body?.variantId ? `Variant ID: ${body.variantId}` : null,
        enquiryType ? `Enquiry type: ${enquiryType}` : null,
        leadType ? `Type: ${leadType}` : null,
        '',
        'Message:',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return NextResponse.json({ id: referenceId });
  } catch (error) {
    console.error('Failed to send lead email', error);
    return NextResponse.json({ message: 'Failed to send message. Please try again later.' }, { status: 502 });
  }
}
