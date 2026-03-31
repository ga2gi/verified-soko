import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function POST({ request }) {
  const { email, unlockDate } = await request.json();

  const { data, error } = await resend.emails.send({
    from: 'Future Capsule <hello@yourdomain.com>',
    to: [email],
    subject: '📦 Your Future Capsule is Sealed!',
    html: `<strong>It's official!</strong> Your letter will unlock on ${unlockDate}.`
  });

  if (error) return new Response(JSON.stringify(error), { status: 400 });
  return new Response(JSON.stringify(data));
}