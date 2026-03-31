<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="app-wrapper">
  <nav class="navbar">
    <a href="/" class="logo">FUTURE CAPSULE 📦</a>
    <div class="nav-links">
      <a href="/about">About</a>
      <a href="/check">My Status</a>
      <a href="/create" class="nav-btn">New Letter +</a>
    </div>
  </nav>

  <main class="content">
    {@render children()}
  </main>

  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <p class="footer-logo">FUTURE CAPSULE 📦</p>
        <p>A gift for the future that arrives right on time.</p>
      </div>
      
      <div class="footer-links">
        <a href="/about">Our Story</a>
        <a href="/terms">Privacy & Terms</a>
        <a href="https://wa.me/254768438911" target="_blank">Support (WhatsApp)</a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© 2026 Future Capsule.</p>
      <p>Sent with love from the past.</p>
    </div>
  </footer>
</div>

<style>
  .app-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 5%;
    background: white;
    border-bottom: 4px solid black;
  }

  .logo {
    font-weight: 900;
    font-size: 1.5rem;
    text-decoration: none;
    color: black;
    letter-spacing: -1px;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .nav-links a {
    text-decoration: none;
    color: black;
    font-weight: 700;
  }

  .nav-btn {
    background: #2563eb; /* Blue */
    color: white !important;
    padding: 10px 20px;
    border-radius: 12px;
    border: 2px solid black;
  }

  .content {
    flex: 1;
  }

  /* Footer Styling */
  .footer {
    background: #f8fafc;
    border-top: 4px solid black;
    padding: 60px 5% 40px 5%;
    margin-top: auto;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 40px;
  }

  .footer-brand {
    max-width: 300px;
  }

  .footer-logo {
    font-weight: 900;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-links a {
    color: black;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .footer-bottom {
    text-align: center;
    border-top: 2px solid #e2e8f0;
    padding-top: 30px;
    font-size: 0.85rem;
    color: #64748b;
  }

  .footer-bottom b {
    color: black;
  }

  /* Responsive Fix */
  @media (max-width: 600px) {
    .navbar { padding: 20px 5%; }
    .nav-links { gap: 15px; }
    .logo { font-size: 1.1rem; }
    .footer-content { flex-direction: column; text-align: center; align-items: center; }
  }
</style>