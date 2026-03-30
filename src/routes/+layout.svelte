<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="app-wrapper">
  <nav class="navbar">
    <a href="/" class="logo">FUTURE CAPSULE 📦</a>
    <div class="nav-links">
      <a href="/create" class="nav-btn">New Letter +</a>
      <a href="/check">My Status</a>
    </div>
  </nav>

  <main class="content">
    {@render children()}
  </main>

  <footer class="footer">
    <p>© 2026 Future Capsule. Sent with love from the past.</p>
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

  .footer {
    text-align: center;
    padding: 40px;
    font-size: 0.9rem;
    color: #666;
  }
</style>