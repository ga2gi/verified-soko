<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  let stores: any[] = [];
  let loading = true;

  onMount(async () => {
    const { data } = await supabase
      .from('stores')
      .select('*')
      .eq('is_verified', true)
      .order('name', { ascending: true });
    
    stores = data || [];
    loading = false;
  });
</script>

<div class="prose-container">
  <header class="directory-header">
    <h1>Verified <span>Stores</span></h1>
    <p>
      Browse the full directory of businesses that have passed our rigorous 
      trust vetting process. Shop with confidence.
    </p>
  </header>

  <div class="directory-list">
    {#if loading}
      <div class="loading-state" in:fade>
        <p>Loading the trust directory...</p>
      </div>
    {:else}
      <div class="cards-grid">
        {#each stores as store (store.id)}
          <a href="/store/{store.id}" class="store-card" in:slide={{ duration: 300 }}>
            <div class="store-main">
              <span class="store-name">{store.name}</span>
              <div class="store-meta">
                <span class="handle">@{store.handle}</span>
                <span class="dot">•</span>
                <span class="platform">{store.platform}</span>
              </div>
            </div>
            <div class="action-area">
              <span class="badge-view">View Profile</span>
            </div>
          </a>
        {:else}
          <div class="empty-state" in:fade>
            <p>No verified stores found yet.</p>
            <a href="/request" class="btn-cta">Suggest a Store</a>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .directory-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .directory-header h1 {
    font-size: clamp(2.5rem, 6vw, 3.5rem) !important;
    margin-bottom: 16px !important;
  }

  .cards-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .store-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    padding: 24px;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 20px;
    transition: var(--transition);
  }

  .store-card:hover {
    border-color: var(--primary-blue);
    transform: translateY(-2px);
    box-shadow: 0 12px 20px -10px rgba(0, 0, 0, 0.05);
  }

  .store-name {
    display: block;
    font-weight: 800;
    font-size: 1.2rem;
    color: var(--text-dark);
    margin-bottom: 4px;
  }

  .store-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: var(--text-light);
    font-weight: 500;
  }

  .badge-view {
    background: var(--bg-soft);
    color: var(--primary-blue);
    font-size: 0.75rem;
    font-weight: 800;
    padding: 8px 16px;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: var(--transition);
  }

  .store-card:hover .badge-view {
    background: var(--primary-blue);
    color: white;
  }

  .loading-state, .empty-state {
    text-align: center;
    padding: 60px 0;
    color: var(--text-light);
  }

  .dot {
    opacity: 0.5;
  }
</style>