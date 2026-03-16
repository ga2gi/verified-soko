<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { fade, slide } from 'svelte/transition';

  let loading = false;
  let success = false;
  let errorMsg = '';
  let requestType = 'shopper'; 

  async function handleRequest(e: SubmitEvent) {
    loading = true;
    errorMsg = '';
    
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd);

    if (typeof data.handle === 'string') {
      data.handle = data.handle.replace('@', '').trim();
    }

    const { error } = await supabase.from('verification_requests').insert([data]);
    
    loading = false;
    if (error) {
      errorMsg = "Something went wrong. Please try again.";
    } else {
      success = true;
    }
  }
</script>

<div class="prose-container">
  {#if success}
    <div class="hero" in:fade>
      <div class="success-icon">✓</div>
      <h1>Submission Received!</h1>
      <p>
        {#if requestType === 'owner'}
          Thanks for reaching out! We will review your store credentials and contact you within 48 hours regarding the <strong>verification fee</strong> and listing process.
        {:else}
          Thank you for keeping the community safe! We've added this store to our vetting queue. Use Verified Soko to check any store <strong>for free</strong> before you pay.
        {/if}
      </p>
      <a href="/" class="btn-cta">Back to Home</a>
    </div>
  {:else}
    <div in:fade>
      <h1 class="form-title">Submit a <span>Store</span></h1>
      
      <div class="type-selector">
        <button 
          class="type-btn" 
          class:active={requestType === 'shopper'} 
          on:click={() => requestType = 'shopper'}
        >
          I'm a Shopper
        </button>
        <button 
          class="type-btn" 
          class:active={requestType === 'owner'} 
          on:click={() => requestType = 'owner'}
        >
          I'm the Store Owner
        </button>
      </div>

      <div class="benefit-card" transition:slide>
        {#if requestType === 'shopper'}
          <p>
            <strong>Shopper Benefit:</strong> Check store verification <strong>for free</strong> before you shop. 
            Help the community by identifying legitimate businesses and avoiding scams.
          </p>
        {:else}
          <p>
            <strong>Owner Benefit:</strong> Get listed in our verified directory at a small fee. 
            Build instant trust with a verified badge and increase your sales by proving your legitimacy.
          </p>
        {/if}
      </div>
      
      <form on:submit|preventDefault={handleRequest} class="request-form">
        <input type="hidden" name="requester_type" value={requestType} />

        <div class="input-group">
          <label for="store_name">Store Name</label>
          <input id="store_name" name="store_name" required placeholder="e.g. Soko Safi" class="form-input" />
        </div>

        <div class="grid-row">
          <div class="input-group">
            <label for="platform">Platform</label>
            <select id="platform" name="platform" class="form-input">
              <option value="TikTok">TikTok</option>
              <option value="Instagram">Instagram</option>
            </select>
          </div>
          <div class="input-group">
            <label for="handle">Handle</label>
            <input id="handle" name="handle" required placeholder="username (no @)" class="form-input" />
          </div>
        </div>

        {#if errorMsg}
          <p class="error-text" transition:slide>{errorMsg}</p>
        {/if}

        <button disabled={loading} class="btn-cta" style="width: 100%; justify-content: center;">
          {loading ? 'Submitting...' : (requestType === 'owner' ? 'Request Paid Verification' : 'Check Store Verification')}
        </button>
      </form>
    </div>
  {/if}
</div>

<style>
  /* Reuse your existing styles, but adding this one for the bold blue callouts */
  .benefit-card strong {
    color: var(--primary-blue);
  }

  .form-title {
    font-size: clamp(2.5rem, 6vw, 3.5rem) !important;
    text-align: center;
    margin-bottom: 20px !important;
  }

  .type-selector {
    display: flex;
    background: var(--bg-soft);
    padding: 6px;
    border-radius: 14px;
    margin-bottom: 24px;
    gap: 4px;
  }

  .type-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    background: transparent;
    color: var(--text-light);
    transition: var(--transition);
  }

  .type-btn.active {
    background: white;
    color: var(--primary-blue);
    box-shadow: var(--shadow-sm);
  }

  .benefit-card {
    background: #eff6ff;
    border: 1px solid #dbeafe;
    padding: 18px;
    border-radius: 16px;
    margin-bottom: 32px;
    font-size: 0.95rem;
    color: #1e40af;
    line-height: 1.5;
  }

  .request-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: white;
    padding: 32px;
    border: 1px solid var(--border-color);
    border-radius: 24px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
  }

  .input-group label {
    font-size: 0.75rem;
    font-weight: 800;
    color: var(--text-dark);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  .form-input {
    padding: 14px 20px;
    border-radius: 12px;
    border: 1.5px solid var(--border-color);
    font-size: 1rem;
    width: 100%;
    background: #fff;
    transition: var(--transition);
  }

  .form-input:focus {
    border-color: var(--primary-blue);
    outline: none;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }
</style>