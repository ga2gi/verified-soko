<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  let searchTerm = '';
  let stores: any[] = [];
  let loading = true;

  onMount(async () => {
    const { data } = await supabase
      .from('stores')
      .select('*')
      .eq('is_verified', true) // Focus on the quality stores first
      .order('name', { ascending: true });
    
    stores = data || [];
    loading = false;
  });

  // Reactive filtering logic
  $: filtered = stores.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<section class="hero">
  <h1>Shop safely from <span>TikTok</span> stores</h1>
  
  <p>
    Verify business legitimacy, check verification status, and avoid scams in Kenya's social commerce.
  </p>

  <div class="search-container">
    <input 
      type="text" 
      bind:value={searchTerm}
      placeholder="Search shop name or @handle..." 
      class="search-input"
    />
    
    {#if searchTerm === ''}
      <div transition:fade={{ duration: 200 }} style="margin-top: 32px;">
        <a href="/request" class="btn-cta">Get Your Store Verified</a>
      </div>
    {/if}
  </div>
</section>

{#if searchTerm !== ''}
  <div class="directory-container" transition:slide>
    {#each filtered as store (store.id)}
      <a href="/store/{store.id}" class="card">
        <div class="card-content">
          <div class="store-info">
            <span class="store-name">{store.name}</span>
            <span class="store-handle">@{store.handle} • {store.platform}</span>
          </div>
          <span class="badge badge-verified">Verified</span>
        </div>
      </a>
    {:else}
      <div class="no-results" in:fade>
        <p>No verified stores found for "{searchTerm}"</p>
        <a href="/request" style="color: var(--primary-blue); font-weight: 700;">Suggest this store for verification →</a>
      </div>
    {/each}
  </div>
{/if}

<style>
  .search-container {
    width: 100%;
    max-width: 540px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .store-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
  }

  .store-name {
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--text-dark);
  }

  .store-handle {
    color: var(--text-light);
    font-size: 0.85rem;
    font-weight: 500;
  }

  .no-results {
    text-align: center;
    padding: 40px 20px;
    color: var(--text-light);
    font-size: 0.95rem;
  }

  /* Specific Card hover for directory */
  .card {
    padding: 24px;
    margin-bottom: 12px;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 16px;
    text-decoration: none;
    display: block;
    transition: var(--transition);
  }

  .card:hover {
    border-color: var(--primary-blue);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
  }
</style>