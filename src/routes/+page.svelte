<section class="hero-container">
  <div class="badge">Digital Time Capsule</div>
  <h1 class="hero-title">Write to the <br/><span class="blue-text">Future You.</span></h1>
  
  <p class="hero-description">
    Capture your thoughts, prayers, and milestones today. 
    We’ll deliver them to your inbox exactly when you need them—be it in 1 year, 5 years, or a decade.
  </p>

  <div class="action-box">
    <a href="/create" class="main-button shadow">Create Your First Capsule</a>
    <div class="payment-info">
      <span class="price">KES 1,000 / Lifetime Access</span>
      <span class="tag">Pay once. Unlock unlimited capsules forever.</span>
    </div>
  </div>

  <div class="examples-section">
    <h3>Letters being delivered...</h3>
    <div class="examples-grid">
      <div class="example-card">
        <p class="excerpt">"I hope you kept that promise to start the business. Right now, it's just a sketch in a notebook, but I believe in us..."</p>
        <div class="meta">Sent to 2029 • Career Goals</div>
      </div>
      <div class="example-card">
        <p class="excerpt">"Happy 18th Birthday, Kibibi. You're just 2 years old as I write this, sleeping in your crib. I want you to know how much..."</p>
        <div class="meta">Sent to 2042 • For My Daughter</div>
      </div>
      <div class="example-card">
        <p class="excerpt">"To my future self: Are you still as happy as you are today on your wedding day? Remember the way he looked at you..."</p>
        <div class="meta">Sent to 2031 • Anniversary</div>
      </div>
    </div>
  </div>

  <div class="features-grid">
    <div class="feature-card">
      <div class="icon">🔑</div>
      <h4>Email as your ID</h4>
      <p>No passwords to remember. Your email address is the unique key to your vault.</p>
    </div>
    <div class="feature-card">
      <div class="icon">♾️</div>
      <h4>Unlimited Entries</h4>
      <p>Once verified, send as many letters, photos, and visions as you wish.</p>
    </div>
    <div class="feature-card">
      <div class="icon">🔒</div>
      <h4>Private & Secure</h4>
      <p>Your capsules are sealed and encrypted until their designated unlock date.</p>
    </div>
  </div>

  <div class="occasions-section">
    <h3>When to send a Capsule?</h3>
    <div class="occasions-grid">
      <span>🎂 Next Year's Birthday</span>
      <span>🎓 Graduation Day</span>
      <span>💍 Wedding Anniversary</span>
      <span>🚀 Business Goals</span>
      <span>🧘 Yearly Reflection</span>
      <span>👶 For your child's 18th</span>
    </div>
  </div>

  <div class="footer-links">
    <a href="/about">How it Works</a>
    <a href="/verify">Check Vault Status</a>
    <a href="/privacy">Privacy Policy</a>
  </div>
</section>

<style>
  :global(body) { 
    background-color: #f8fafc; 
    color: #000; 
    overflow-x: hidden;
    font-family: 'Inter', sans-serif;
  }

  .hero-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 60px 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .badge {
    background: #000;
    color: #fff;
    padding: 8px 20px;
    border-radius: 50px;
    font-weight: 800;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-bottom: 24px;
    letter-spacing: 2px;
  }

  .hero-title {
    font-size: clamp(3.5rem, 10vw, 5.5rem);
    font-weight: 900;
    line-height: 0.85;
    margin-bottom: 24px;
    letter-spacing: -4px;
  }

  .blue-text {
    color: #2563eb;
  }

  .hero-description {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    color: #475569;
    max-width: 700px;
    line-height: 1.6;
    margin-bottom: 48px;
    font-weight: 500;
  }

  .action-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 80px;
  }

  .main-button {
    background: #2563eb;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 900;
    padding: 24px 50px;
    border-radius: 24px;
    text-decoration: none;
    border: 4px solid #000;
    transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .main-button:hover {
    transform: translate(-6px, -6px);
    box-shadow: 14px 14px 0px 0px rgba(0,0,0,1);
  }

  .shadow {
    box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
  }

  .payment-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .price {
    font-size: 1.3rem;
    font-weight: 900;
    color: #000;
  }

  .tag {
    font-size: 0.95rem;
    color: #64748b;
    font-weight: 600;
  }

  /* Examples Styling */
  .examples-section {
    margin-bottom: 100px;
    width: 100%;
  }

  .examples-section h3 {
    font-weight: 800;
    color: #94a3b8;
    margin-bottom: 30px;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1.5px;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .example-card {
    background: #fff;
    border: 2px solid #e2e8f0;
    padding: 30px;
    border-radius: 20px;
    text-align: left;
    transition: 0.3s ease;
  }

  .example-card:hover {
    border-color: #2563eb;
    transform: rotate(-1deg);
  }

  .excerpt {
    font-family: 'Georgia', serif;
    font-style: italic;
    font-size: 1.1rem;
    color: #1e293b;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .meta {
    font-weight: 800;
    font-size: 0.75rem;
    color: #2563eb;
    text-transform: uppercase;
  }

  /* Features Styling */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 80px;
    width: 100%;
  }

  .feature-card {
    background: white;
    padding: 30px;
    border-radius: 24px;
    border: 3px solid black;
    text-align: left;
    box-shadow: 6px 6px 0px black;
  }

  .feature-card .icon { font-size: 2rem; margin-bottom: 15px; }
  .feature-card h4 { font-weight: 900; font-size: 1.2rem; margin-bottom: 10px; }
  .feature-card p { color: #64748b; font-size: 0.95rem; line-height: 1.5; font-weight: 500; }

  /* Occasions Styling */
  .occasions-section {
    width: 100%;
    margin-bottom: 60px;
  }

  .occasions-section h3 {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1.1rem;
    margin-bottom: 30px;
    letter-spacing: 1px;
  }

  .occasions-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .occasions-grid span {
    background: #e2e8f0;
    padding: 10px 20px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.9rem;
    border: 2px solid black;
  }

  .footer-links {
    margin-top: 40px;
    display: flex;
    gap: 40px;
  }

  .footer-links a {
    color: #000;
    font-weight: 800;
    text-decoration: none;
    border-bottom: 3px solid #2563eb;
    font-size: 1rem;
    padding-bottom: 2px;
  }

  @media (max-width: 600px) {
    .hero-title { letter-spacing: -2px; }
    .main-button { width: 100%; padding: 20px; font-size: 1.3rem; }
    .features-grid, .examples-grid { grid-template-columns: 1fr; }
  }
</style>