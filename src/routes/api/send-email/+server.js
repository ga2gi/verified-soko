import { Resend } from 'resend';
import { json } from '@sveltejs/kit';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function POST({ request }) {
    console.log("--- 📧 Future Capsule Email Trigger ---");
    
    try {
        const { email, unlockDate } = await request.json();

        // Check if data was actually sent from the frontend
        if (!email || !unlockDate) {
            console.error("❌ Error: Missing email or date");
            return json({ error: "Missing email or date" }, { status: 400 });
        }

        console.log(`📩 Attempting to send to authorized user: ${email}`);

        const { data, error } = await resend.emails.send({
            // On Free/Sandbox tier, 'from' MUST be this exact address
            from: 'Future Capsule <onboarding@resend.dev>', 
            // On Free tier, 'to' MUST be your login: hugsinwords@gmail.com
            to: email, 
            subject: '🔒 Your Future Capsule is Sealed!',
            html: `
                <div style="font-family: sans-serif; border: 4px solid #2563eb; padding: 25px; border-radius: 20px; max-width: 500px; margin: auto;">
                    <h2 style="color: #2563eb; margin-top: 0; font-size: 1.5rem;">The Vault is Locked.</h2>
                    <p style="font-size: 1.1rem; color: #1e293b;">Your message to your future self has been safely stored in the <strong>PolicyBridge</strong> vault.</p>
                    
                    <div style="background: #f1f5f9; padding: 15px; border-radius: 12px; border-left: 6px solid #2563eb; margin: 20px 0;">
                        <p style="margin: 0; font-weight: bold; color: #2563eb;">Unlock Date:</p>
                        <p style="margin: 5px 0 0 0; font-size: 1.2rem;">${unlockDate}</p>
                    </div>

                    <p style="color: #64748b; font-size: 0.95rem;">
                        We will keep this safe. You will receive another email automatically when it is time to open your capsule.
                    </p>
                    
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
                    <p style="font-size: 0.8rem; color: #94a3b8; text-align: center; letter-spacing: 1px;">
                        POLICYBRIDGE FUTURE CAPSULE • NAIROBI, KE
                    </p>
                </div>
            `
        });

        if (error) {
            console.error("❌ Resend API Error:", error);
            return json({ error: error.message }, { status: 400 });
        }

        console.log("✅ Resend Success! Email ID:", data.id);
        return json({ success: true, id: data.id });

    } catch (err) {
        console.error("💥 Server Crash Error:", err.message);
        return json({ error: err.message }, { status: 500 });
    }
}