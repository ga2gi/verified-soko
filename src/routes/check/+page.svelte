<script>
  import { supabase } from '$lib/supabaseClient';

  let email = $state("");
  let results = $state([]);
  let hasChecked = $state(false);
  let loading = $state(false);

  async function checkStatus() {
    if (!email) return;
    loading = true;
    hasChecked = true;

    const { data, error } = await supabase
      .from('capsules')
      .select('id, unlock_date, is_delivered')
      .eq('email', email.toLowerCase().trim());

    if (error) {
      console.error(error);
    } else {
      results = data;
    }
    loading = false;
  }

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Helper to check if a capsule is ready to be opened
  const isUnlocked = (dateStr) => new Date() >= new Date(dateStr);
</script>

<section class="check-container">
  <div class="search-box">
    <h1>Is there mail <span class="blue-text">waiting?</span></h1>
    <p>Enter your email to see your scheduled time-travel deliveries. <b>You can read your capsules here once they unlock.</b></p>
    
    <div class="input-row">
      <input 
        type="email" 
        bind:value={email} 
        placeholder="your@email.com" 
        onkeydown={(e) => e.key === 'Enter' && checkStatus()}
      />
      <button onclick={checkStatus} disabled={loading}>
        {loading ? "Searching..." : "Search 🔍"}
      </button>
    </div>

    {#if hasChecked && !loading}
      <div class="results-area">
        {#if results.length > 0}
          <div class="success-banner">✨ Found {results.length} Capsules in the Vault</div>
          
          <div class="instruction-text">
            Click on an unlocked 📦 to read your message from the past.
          </div>

          <div class="capsule-grid">
            {#each results as capsule}
              <a href="/unlock/{capsule.id}" class="capsule-link" class:disabled-link={!isUnlocked(capsule.unlock_date)}>
                <div class="capsule-card" class:locked-border={!isUnlocked(capsule.unlock_date)}>
                  <div class="card-icon">📦</div>
                  <div class="card-info">
                    <span class="label">Unlocks On:</span>
                    <span class="date">{formatDate(capsule.unlock_date)}</span>
                  </div>
                  
                  <div class="action-area">
                    {#if isUnlocked(capsule.unlock_date)}
                      <div class="status-btn unlocked">Open Vault 🔓</div>
                    {:else}
                      <div class="status-badge locked">Locked 🔒</div>
                    {/if}
                  </div>
                </div>
              </a>
            {/each}
          </div>
        {:else}
          <div class="empty-state">
            <p>No capsules found for this email. Maybe it's time to write one?</p>
            <a href="/create" class="create-link">Create a Capsule →</a>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>

<style>
  .check-container { padding: 80px 20px; display: flex; justify-content: center; }
  .search-box { width: 100%; max-width: 700px; text-align: center; }
  h1 { font-weight: 900; font-size: 3.5rem; letter-spacing: -2px; }
  .blue-text { color: #2563eb; }
  
  .input-row { display: flex; gap: 15px; margin: 40px 0; }
  input { flex: 1; padding: 20px; border: 4px solid black; border-radius: 15px; font-weight: 700; font-size: 1.1rem; }
  button { background: #2563eb; color: white; border: 4px solid black; padding: 0 40px; border-radius: 15px; font-weight: 900; cursor: pointer; box-shadow: 4px 4px 0px black; }
  button:disabled { background: #ccc; cursor: not-allowed; }

  .success-banner { background: #dcfce7; border: 3px solid black; padding: 15px; border-radius: 12px; font-weight: 800; margin-bottom: 10px; }
  .instruction-text { font-weight: 700; color: #475569; margin-bottom: 30px; font-size: 0.95rem; }

  .capsule-grid { display: grid; gap: 20px; text-align: left; }
  
  .capsule-link { text-decoration: none; color: inherit; display: block; transition: transform 0.1s; }
  .capsule-link:hover:not(.disabled-link) { transform: translateY(-3px); }
  
  /* Disable interaction for locked capsules */
  .disabled-link { cursor: default; pointer-events: none; }

  .capsule-card { 
    background: white; 
    border: 4px solid black; 
    padding: 25px; 
    border-radius: 20px; 
    display: flex; 
    align-items: center; 
    gap: 20px;
    box-shadow: 8px 8px 0px black;
  }

  .locked-border {
    border-color: #94a3b8;
    box-shadow: 8px 8px 0px #cbd5e1;
    background: #f8fafc;
  }

  .card-icon { font-size: 2rem; }
  .card-info { flex: 1; display: flex; flex-direction: column; }
  .label { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: #64748b; }
  .date { font-size: 1.4rem; font-weight: 900; }

  .status-btn.unlocked {
    background: #2563eb;
    color: white;
    padding: 10px 20px;
    border-radius: 12px;
    border: 3px solid black;
    font-weight: 900;
    font-size: 0.8rem;
    text-transform: uppercase;
    box-shadow: 4px 4px 0px black;
  }

  .status-badge.locked { 
    padding: 10px 20px; 
    border-radius: 12px; 
    border: 3px solid black; 
    font-weight: 800; 
    font-size: 0.8rem;
    background: #fee2e2;
    color: #991b1b;
    text-transform: uppercase;
  }

  .empty-state { padding: 40px; border: 4px dashed #cbd5e1; border-radius: 20px; }
  .create-link { display: inline-block; margin-top: 20px; font-weight: 900; color: #2563eb; text-decoration: none; }
</style>