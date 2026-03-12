<script>
  // Add metadata for SEO if needed
  const lastUpdated = "March 2026";
</script>

<section class="privacy-container">
  <div class="header">
    <h1>Privacy Policy</h1>
    <p class="updated">Last Updated: {lastUpdated}</p>
  </div>

  <div class="policy-content">
    <p class="intro">
      At <strong>FutureCapsule</strong>, we believe your thoughts, dreams, and prayers are sacred. 
      We are committed to ensuring that your "future self" is the only one who hears from your past self.
    </p>

    <hr />

    <section>
      <h2>What We Collect</h2>
      <p>To provide our service, we collect the following information:</p>
      <ul>
        <li><strong>Email address:</strong> Essential for delivering your capsule on the scheduled date.</li>
        <li><strong>Capsule Content:</strong> Your letters, goals, prayers, and vision board images.</li>
        <li><strong>Metadata:</strong> The delivery date and time you specify.</li>
      </ul>
    </section>

    <section>
      <h2>How We Use Your Data</h2>
      <p>Your data is used strictly for the following purposes:</p>
      <ul>
        <li>Securely vaulting your capsule until your chosen delivery date.</li>
        <li>Automating the delivery of your message to your verified email.</li>
        <li>Internal analytics to improve platform stability and performance.</li>
      </ul>
    </section>

    <section>
      <h2>Data Security</h2>
      <p>
        All capsules are hosted via <strong>Supabase</strong>, utilizing industry-standard 
        encryption and secure authentication protocols. 
      </p>
      <div class="security-note">
        <strong>Important:</strong> We do not sell, trade, or rent your personal information 
        to third parties for marketing purposes. Your dreams are not for sale.
      </div>
    </section>

    <section>
      <h2>Your Rights & Control</h2>
      <ul>
        <li><strong>Deletion:</strong> You may request the permanent deletion of a stored capsule at any time before its delivery.</li>
        <li><strong>Access:</strong> You have the right to know what data we hold about you.</li>
        <li><strong>Opt-out:</strong> You can unsubscribe from system notifications, though this may affect capsule delivery updates.</li>
      </ul>
    </section>

    <section class="contact-box">
      <h2>Privacy Inquiries</h2>
      <p>
        If you have any questions regarding your data or our practices, please reach out to our team:
      </p>
      <a href="mailto:hello@futurecapsule.app" class="email-link">hello@futurecapsule.app</a>
    </section>
  </div>
</section>

<style>
  .privacy-container {
    max-width: 720px;
    margin: 40px auto;
    padding: 0 24px;
    color: #374151;
    line-height: 1.8;
  }

  .header {
    text-align: center;
    margin-bottom: 50px;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 2.5rem);
    color: #111827;
    margin-bottom: 8px;
  }

  .updated {
    font-size: 0.9rem;
    color: #9ca3af;
  }

  .intro {
    font-size: 1.15rem;
    color: #4b5563;
    margin-bottom: 30px;
  }

  hr {
    border: 0;
    border-top: 1px solid #f3f4f6;
    margin: 40px 0;
  }

  h2 {
    font-size: 1.5rem;
    color: #111827;
    margin-top: 40px;
    margin-bottom: 16px;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 24px;
  }

  li {
    margin-bottom: 12px;
  }

  li strong {
    color: #1f2937;
  }

  .security-note {
    background: #eff6ff;
    border-left: 4px solid #2563eb;
    padding: 20px;
    border-radius: 0 12px 12px 0;
    margin: 24px 0;
    font-size: 0.95rem;
  }

  .contact-box {
    margin-top: 60px;
    padding: 32px;
    background: #f9fafb;
    border-radius: 20px;
    text-align: center;
  }

  .email-link {
    display: inline-block;
    margin-top: 10px;
    color: #2563eb;
    font-weight: 700;
    text-decoration: none;
    font-size: 1.1rem;
  }

  .email-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 640px) {
    .privacy-container {
      margin: 20px auto;
    }
  }
</style>