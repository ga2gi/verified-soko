<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { page } from '$app/stores';
  import { fade, slide } from 'svelte/transition';

  let store: any = null;
  let loading = true;

  /**
   * REACTIVE FETCHING:
   * This ensures that if the ID in the URL changes while the user is already 
   * on a store page, SvelteKit will re-run the fetch function.
   */
  $: if ($page.params.id) {
    fetchStoreData($page.params.id);
  }

  async function fetchStoreData(id: string) {
    loading = true;
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('id', id)
      .single();
    
    if (!error) {
      store = data;
    } else {
      store = null;
    }
    loading = false;
  }

  /**
   * OPTIONAL CHAINING (store?.handle):
   * This is critical. It prevents the app from crashing while 'store' is still null 
   * during the initial fetch or server-side render.
   */
  $: socialLink = store?.platform === 'TikTok' 
    ? `https://tiktok.com/@${store?.handle}` 
    : `https://instagram.com/${store?.handle}`;
</script>

<div class="prose-container">
  {#if loading}
    <div class="loading-container" in:fade>
      <div class="spinner"></div>
      <p>Consulting the trust directory...</p>
    </div>
  {:else if store}
    <article in:fade={{ duration: 400 }}>
      <section class="profile-header">
        <div class="store-avatar">
          {store.name ? store.name[0] : '?'}
        </div>
        
        <h1 class="store-title">{store.name}</h1>
        
        <div class="store-meta">
          <span class="handle">@{store.handle}</span>
          <span class="dot">•</span>
          <span class="platform-label">{store.platform}</span>
        </div>

        {#if store.is_verified}
          <div class="verification-badge-large" in:slide>
            <span class="check">✓</span> Officially Verified
          </div>
        {/if}
      </section>

      <div class="content-stack">
        <div class="info-card">
          <h2 class="card-label">Verification Report</h2>
          <p class="verification-notes">
            {store.notes || "This business has been vetted by the Verified Soko team. We have confirmed their digital footprint, customer feedback history, and business legitimacy in the Kenyan market."}
          </p>
        </div>

        <div class="action-stack">
          <a href={socialLink} target="_blank" rel="noopener" class="btn-cta full-width">
            Visit Store on {store.platform}
          </a>

          <a href="/stores" class="back-link">
            ← Back to Directory
          </a>
        </div>

        <div class="safety-advisory">
          <div class="advisory-title">
            <span class="icon">⚠️</span> Safety Reminder
          </div>
          <p>
            Before paying via M-Pesa, always ensure the Till/Buy Goods name matches <strong>{store.name}</strong>. 
            Verified Soko drastically reduces risk, but stay vigilant.
          </p>
        </div>
      </div>
    </article>
  {:else}
    <div class="hero" in:fade>
      <h1>Store Not Found</h1>
      <p>We couldn't find a verified record for this ID. It may have been delisted.</p>
      <a href="/stores" class="btn-cta">Back to Directory</a>
    </div>
  {/if}
</div>

<style>
  /* Keep your existing styles here - they are already solid */
  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 0;
  }

  .store-avatar {
    width: 96px;
    height: 96px;
    background: var(--primary-blue);
    color: white;
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 24px;
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.2);
  }

  .store-title {
    font-size: clamp(2rem, 5vw, 2.75rem) !important;
    margin-bottom: 8px !important;
    letter-spacing: -0.04em;
  }

  .store-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-light);
    font-weight: 600;
    margin-bottom: 24px;
  }

  .verification-badge-large {
    background: var(--trust-green);
    color: white;
    padding: 10px 20px;
    border-radius: 99px;
    font-weight: 800;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .content-stack {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 540px;
    margin: 0 auto;
  }

  .info-card {
    background: white;
    padding: 32px;
    border: 1px solid var(--border-color);
    border-radius: 24px;
    text-align: left;
  }

  .card-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-light);
    margin-bottom: 12px;
  }

  .verification-notes {
    font-size: 1.05rem;
    line-height: 1.6;
    margin: 0;
    color: var(--text-dark);
  }

  .action-stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .full-width {
    width: 100%;
    justify-content: center;
  }

  .back-link {
    color: var(--text-light);
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
    transition: var(--transition);
  }

  .back-link:hover {
    color: var(--primary-blue);
  }

  .safety-advisory {
    background: #fffbeb;
    border: 1px solid #fef3c7;
    padding: 24px;
    border-radius: 20px;
    text-align: center;
  }

  .advisory-title {
    color: #92400e;
    font-weight: 800;
    font-size: 0.85rem;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .safety-advisory p {
    font-size: 0.85rem;
    color: #b45309;
    margin: 0;
    line-height: 1.5;
  }

  .loading-container {
    padding: 100px 0;
    text-align: center;
    color: var(--text-light);
  }

  .spinner {
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-left-color: var(--primary-blue);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .dot { opacity: 0.4; }
</style>