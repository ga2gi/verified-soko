import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function POST({ request }) {
    const { email } = await request.json();

    try {
        const { data, error } = await resend.emails.send({
            from: 'Future Capsule <hello@yourdomain.com>', // Use 'onboarding@resend.dev' for testing
            to: [email],
            subject: 'Your Vault is Unlocked! 🔓',
            html: `
                <div style="font-family: sans-serif; border: 4px solid black; padding: 20px;">
                    <h1>Payment Verified!</h1>
                    <p>Hi there, Sharon has verified your payment of KES 1,000.</p>
                    <p>Your <strong>Future Capsule</strong> vault is now officially active for life. You can now create unlimited capsules.</p>
                    <a href="https://your-site.com/create" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 8px;">Create a New Capsule</a>
                </div>
            `
        });

        if (error) return new Response(JSON.stringify({ error }), { status: 400 });
        return new Response(JSON.stringify({ success: true, data }));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}