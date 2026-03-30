import { Resend } from 'resend';
import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function GET({ request }) {
    // Optional: Protect this route so only Vercel can call it
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const today = new Date().toISOString().split('T')[0];

    // 1. Find capsules ready to be opened today
    const { data: capsules, error } = await supabase
        .from('capsules')
        .select('*')
        .eq('unlock_date', today);

    if (error) return json({ error: error.message }, { status: 500 });
    if (!capsules.length) return json({ message: "No capsules for today." });

    // 2. Send the emails
    for (const capsule of capsules) {
        try {
            await resend.emails.send({
                from: 'Future Capsule <onboarding@resend.dev>',
                to: capsule.email, // REMEMBER: Only hugsinwords@gmail.com works on Free Tier
                subject: '🔓 Your Future Capsule has been Unlocked!',
                html: `
                    <div style="font-family: sans-serif; border: 5px solid #2563eb; padding: 20px; border-radius: 15px;">
                        <h1 style="color: #2563eb;">A Message from the Past...</h1>
                        <p style="font-size: 1.2rem;">"${capsule.message}"</p>
                        <hr />
                        <p><strong>Prayer Goals:</strong> ${capsule.prayer_goals || 'None'}</p>
                        <p><strong>Vision:</strong> ${capsule.vision_board_desc || 'None'}</p>
                        ${capsule.photo_url ? `<img src="${capsule.photo_url}" style="width: 100%; max-width: 400px; border-radius: 10px;" />` : ''}
                    </div>
                `
            });
        } catch (e) {
            console.error(`Failed to send to ${capsule.email}:`, e);
        }
    }

    return json({ success: true, sent: capsules.length });
}