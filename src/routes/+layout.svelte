<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="app-wrapper">
  <nav class="navbar">
    <a href="/" class="logo">FUTURE CAPSULE 📦</a>
    <div class="nav-links">
      <a href="/about" class="nav-link hide-small">About</a>
      <a href="/check" class="nav-link">Status</a>
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
        <p class="footer-label">Navigate</p>
        <a href="/about">Our Story</a>
        <a href="/terms">Privacy & Terms</a>
        <a href="https://wa.me/254768438911" target="_blank">Support (WhatsApp)</a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© 2026 Future Capsule. Sent with love from the past.</p>
    </div>
  </footer>
</div>

<style>
  /* Base Layout */
  .app-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden; /* Prevents horizontal scroll on small screens */
  }

  /* Navbar Styling */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 5%;
    background: white;
    border-bottom: 4px solid black;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .logo {
    font-weight: 900;
    font-size: 1.4rem;
    text-decoration: none;
    color: black;
    letter-spacing: -1px;
    flex-shrink: 0;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-link {
    text-decoration: none;
    color: black;
    font-weight: 700;
    font-size: 0.95rem;
  }

  .nav-btn {
    background: #2563eb;
    color: white !important;
    padding: 10px 18px;
    border-radius: 12px;
    border: 3px solid black;
    font-weight: 800;
    text-decoration: none;
    white-space: nowrap;
    box-shadow: 3px 3px 0px black;
    font-size: 0.9rem;
  }

  .content {
    flex: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
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
    gap: 40px;
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

  .footer-label {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
    color: #64748b;
    margin-bottom: 5px;
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

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .navbar {
      padding: 15px 5%;
    }
    
    .logo {
      font-size: 1.1rem;
    }

    .nav-links {
      gap: 12px;
    }

    .hide-small {
      display: none; /* Hides "About" from header on small mobile to save space */
    }

    .nav-btn {
      padding: 8px 12px;
      font-size: 0.8rem;
    }

    .footer-content {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
  }
</style>