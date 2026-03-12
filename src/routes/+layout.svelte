<script>
  import "../app.css";
  import { page } from '$app/stores';
  import { fade, slide } from 'svelte/transition';

  let isMenuOpen = false;

  const toggleMenu = () => (isMenuOpen = !isMenuOpen);
  const closeMenu = () => (isMenuOpen = false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/create", label: "Create Capsule" },
    { href: "/about", label: "About" },
    { href: "/privacy", label: "Privacy" },
  ];
</script>

<header class="navbar">
  <div class="nav-container">
    <div class="logo">
      <a href="/" on:click={closeMenu}>Future<span>Capsule</span></a>
    </div>

    <button 
      class="hamburger" 
      on:click={toggleMenu} 
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
    >
      <span class:open={isMenuOpen}></span>
      <span class:open={isMenuOpen}></span>
      <span class:open={isMenuOpen}></span>
    </button>

    <nav class="nav-links desktop-only">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="nav-item" 
          class:active={$page.url.pathname === link.href}
        >
          {link.label}
        </a>
      {/each}
    </nav>
  </div>

  {#if isMenuOpen}
    <nav class="mobile-nav" transition:slide={{ duration: 300 }}>
      {#each navLinks as link}
        <a 
          href={link.href} 
          on:click={closeMenu}
          class="mobile-item" 
          class:active={$page.url.pathname === link.href}
        >
          {link.label}
        </a>
      {/each}
    </nav>
  {/if}
</header>

<main>
  {#key $page.url.pathname}
    <div in:fade={{ duration: 200 }} class="page-content">
      <slot />
    </div>
  {/key}
</main>

<footer class="footer">
  <div class="footer-content">
    <p class="copyright">© 2026 FutureCapsule</p>
    <p class="tagline">Write to the person you will become.</p>
    <div class="footer-links">
      <a href="/terms">Terms</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
</footer>

<style>
  :root {
    --primary: #2563eb;
    --text-main: #1f2937;
    --text-muted: #6b7280;
    --nav-bg: rgba(255, 255, 255, 0.9);
    --border: #f3f4f6;
  }

  .navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: var(--nav-bg);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
  }

  .logo {
    font-weight: 800;
    font-size: 1.4rem;
  }

  .logo a { color: var(--text-main); text-decoration: none; }
  .logo span { color: var(--primary); }

  .nav-links {
    display: flex;
    gap: 32px;
  }

  .nav-item {
    text-decoration: none;
    color: var(--text-muted);
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.2s;
    position: relative;
  }

  .nav-item:hover, .nav-item.active {
    color: var(--primary);
  }

  .nav-item.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: var(--primary);
    border-radius: 50%;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
  }

  .hamburger span {
    width: 24px;
    height: 2px;
    background: var(--text-main);
    transition: 0.3s;
  }

  /* Hamburger to X animation */
  .hamburger span.open:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .hamburger span.open:nth-child(2) { opacity: 0; }
  .hamburger span.open:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    background: white;
    border-top: 1px solid var(--border);
    padding: 16px 24px;
  }

  .mobile-item {
    padding: 12px 0;
    text-decoration: none;
    color: var(--text-main);
    font-weight: 500;
  }

  .mobile-item.active { color: var(--primary); }

  main {
    min-height: calc(100vh - 250px);
  }

  .page-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .footer {
    padding: 60px 24px;
    text-align: center;
    border-top: 1px solid var(--border);
    background: #fafafa;
    color: var(--text-muted);
  }

  .tagline {
    font-size: 0.9rem;
    margin: 8px 0 20px;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    font-size: 0.85rem;
  }

  .footer-links a { color: var(--text-muted); text-decoration: none; }

  @media (max-width: 768px) {
    .desktop-only { display: none; }
    .hamburger { display: flex; }
  }
</style>