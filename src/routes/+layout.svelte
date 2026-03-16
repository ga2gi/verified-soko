<script lang="ts">
  import "../app.css";
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';

  let y = 0;

  // Closes mobile menu on navigation (if you add one later)
  $: pathname = $page.url.pathname;
</script>

<svelte:window bind:scrollY={y} />

<div class="app-shell">
  <header class="nav-wrapper" class:scrolled={y > 20}>
    <div class="nav-container">
      <a href="/" class="logo-container">
        <h1 class="logo-text">Verified<span>Soko</span></h1>
      </a>

      <nav class="nav-links">
        <a href="/" class:active={pathname === '/'}>Home</a>
        <a href="/stores" class:active={pathname.startsWith('/stores') || pathname.startsWith('/store/')}>Directory</a>
        <a href="/request" class:active={pathname === '/request'}>Verify Store</a>
        <a href="/about" class:active={pathname === '/about'}>About</a>
      </nav>
    </div>
  </header>

  <main>
    {#key pathname}
      <div in:fade={{ duration: 200 }}>
        <slot />
      </div>
    {/key}
  </main>

  <footer class="footer-wrapper">
    <div class="footer-content">
      <nav class="footer-links">
        <a href="/">Home</a>
        <a href="/stores">Directory</a>
        <a href="/request">Verify Store</a>
        <a href="/about">About</a>
        <a href="/privacy">Privacy Policy</a>
      </nav>
      
      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <div class="footer-info">
          <p class="footer-copy">© 2026 <strong>Verified Soko</strong>.</p>
          <p class="footer-tagline">Building trust in Kenyan social commerce.</p>
        </div>
        <div class="footer-credit">
          A <a href="https://policybridge.ke" target="_blank" class="pb-link">PolicyBridge</a> Initiative
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1; /* Pushes footer to the bottom */
    padding-top: 100px; /* Space for the fixed header */
  }

  /* Navigation Styling */
  .nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.3s ease;
    padding: 20px 0;
    background: transparent;
  }

  .nav-wrapper.scrolled {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    padding: 12px 0;
    border-bottom: 1px solid var(--border-color);
  }

  .nav-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: -0.03em;
  }

  .logo-text span {
    color: var(--primary-blue);
  }

  .nav-links {
    display: flex;
    gap: 24px;
  }

  .nav-links a {
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--text-light);
    transition: color 0.2s ease;
  }

  .nav-links a:hover, .nav-links a.active {
    color: var(--primary-blue);
  }

  /* Footer Styling */
  .footer-wrapper {
    background: #f8fafc;
    border-top: 1px solid var(--border-color);
    padding: 60px 0 40px;
    margin-top: 80px;
  }

  .footer-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-bottom: 40px;
  }

  .footer-links a {
    text-decoration: none;
    color: var(--text-light);
    font-weight: 600;
    font-size: 0.9rem;
  }

  .footer-divider {
    height: 1px;
    background: var(--border-color);
    margin-bottom: 30px;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-copy { margin: 0; font-size: 1rem; color: var(--text-dark); }
  .footer-tagline { margin: 4px 0 0; font-size: 0.85rem; color: var(--text-light); }

  .pb-link {
    color: var(--primary-blue);
    text-decoration: none;
    font-weight: 700;
  }

  .footer-credit {
    font-size: 0.8rem;
    color: var(--text-light);
  }

  @media (max-width: 768px) {
    .nav-links { display: none; } /* Consider adding a mobile menu icon later */
    .footer-bottom { flex-direction: column; align-items: flex-start; }
  }
</style>