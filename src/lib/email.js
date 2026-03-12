import { Resend } from "resend";

// Best practice: Use process.env.RESEND_API_KEY in production
const resend = new Resend("re_TXawgBm1_3ivsFXxgRCkJBGo1zWBP3GY8");

export async function sendCapsuleEmail(capsule) {
  try {
    // 1. Data Sanitization: Ensure the email is a clean, lowercase string
    // This prevents the 'validation_error' caused by trailing spaces or objects
    const recipientEmail = String(capsule.email || "").trim().toLowerCase();

    // 2. Validation check before even calling Resend
    if (!recipientEmail || !recipientEmail.includes('@')) {
      console.error("❌ Invalid email format detected:", recipientEmail);
      return { success: false, error: "Invalid email address format in database." };
    }

    console.log(`📤 Attempting to delivery capsule to: ${recipientEmail}`);

    // 3. Resend API Call
    const { data, error } = await resend.emails.send({
      from: "FutureCapsule <onboarding@resend.dev>",
      to: recipientEmail, // Sending as a clean string
      subject: `📜 Your Future Capsule: ${capsule.title || "A message from the past"}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; }
              .container { border: 1px solid #e5e7eb; border-radius: 12px; padding: 40px; background-color: #ffffff; }
              .header { text-align: center; border-bottom: 2px solid #f3f4f6; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { color: #2563eb; font-weight: bold; font-size: 24px; text-decoration: none; }
              .letter-body { font-size: 16px; white-space: pre-wrap; background: #f9fafb; padding: 20px; border-radius: 8px; font-style: italic; color: #374151; }
              .section-title { color: #2563eb; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 30px; margin-bottom: 10px; font-weight: bold; }
              .vision-img { width: 100%; max-width: 500px; border-radius: 12px; margin-top: 20px; display: block; }
              .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #9ca3af; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">FutureCapsule</div>
                <p style="margin-top: 10px; color: #6b7280;">A message from your past self has arrived.</p>
              </div>

              <h2 style="margin-top: 0; color: #111827;">${capsule.title || "Dear Future Me,"}</h2>
              
              <div class="letter-body">${capsule.letter}</div>

              ${capsule.goals ? `
                <div class="section-title">Your Goals</div>
                <p style="margin-top: 0;">${capsule.goals}</p>
              ` : ""}

              ${capsule.prayer ? `
                <div class="section-title">Your Prayer & Reflection</div>
                <p style="margin-top: 0;">${capsule.prayer}</p>
              ` : ""}

              ${capsule.vision_image ? `
                <div class="section-title">Your Vision Board</div>
                <img src="${capsule.vision_image}" class="vision-img" alt="Vision Board">
              ` : ""}

              <div style="margin-top: 40px; padding: 20px; background: #eff6ff; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #1e40af; font-weight: 500;">
                  Reflect on how much you've grown since you wrote this.
                </p>
              </div>

              <div class="footer">
                <p>© 2026 FutureCapsule. Delivered to ${recipientEmail}</p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (error) {
      // This will now log the EXACT object from Resend so we can read it in the terminal
      console.error("❌ Resend API Error:", JSON.stringify(error, null, 2));
      return { success: false, error: error.message || "Email validation failed" };
    }

    console.log("✅ Email sent successfully!");
    return { success: true, data };

  } catch (err) {
    console.error("💥 Email Function Crashed:", err);
    return { success: false, error: err.message };
  }
}