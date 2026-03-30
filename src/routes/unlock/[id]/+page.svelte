<script>
  import { supabase } from '$lib/supabaseClient';
  import { page } from '$app/state'; 
  import { onMount } from 'svelte';

  let capsule = $state(null);
  let loading = $state(true);
  let isLocked = $state(false);
  let daysRemaining = $state(0);

  async function fetchCapsule() {
    const id = page.params.id;
    
    const { data, error } = await supabase
      .from('capsules')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error("Error fetching capsule:", error);
      loading = false;
      return;
    }

    const unlockDate = new Date(data.unlock_date);
    const today = new Date();

    if (today < unlockDate) {
      isLocked = true;
      const diffTime = Math.abs(unlockDate - today);
      daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else {
      capsule = data;
    }
    
    loading = false;
  }

  function downloadCapsule() {
    if (!capsule) return;

    const content = `
FUTURE CAPSULE: OPENED ON ${new Date().toLocaleDateString('en-KE')}
--------------------------------------------------
WRITTEN ON: ${new Date(capsule.created_at).toLocaleDateString('en-KE')}

DEAR FUTURE SELF:
${capsule.message}

PRAYER GOALS & INTENTIONS:
${capsule.prayer_goals || "None recorded."}

QUESTIONS FOR SELF:
${capsule.questions_for_self || "None recorded."}

THE VISION:
${capsule.vision_board_desc || "None recorded."}

CURRENT FAVORITES:
${capsule.current_favorites || "None recorded."}
--------------------------------------------------
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Future_Capsule_${new Date(capsule.created_at).getFullYear()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  onMount(fetchCapsule);
</script>

<div class="unlock-container">
  {#if loading}
    <div class="status-msg">Opening the Vault... 🔓</div>
  {:else if isLocked}
    <div class="locked-card">
      <div class="lock-icon">🔒</div>
      <h1>Patience, Future You!</h1>
      <p>This capsule is sealed for another <strong>{daysRemaining} days</strong>.</p>
      <a href="/check" class="btn-back">Return to Present</a>
    </div>
  {:else if capsule}
    <div class="capsule-content">
      <header class="content-header">
        <span class="badge">OPENED FROM THE PAST</span>
        <h1>Snapshot from {new Date(capsule.created_at).getFullYear()}</h1>
      </header>

      <section class="section-box black-shadow">
        <h3>Dear Future Me,</h3>
        <p class="letter-body">{capsule.message}</p>
      </section>

      {#if capsule.photo_url}
        <section class="section-box blue-shadow photo-box">
          <h3>Today's Favorite Snapshot</h3>
          <img src={capsule.photo_url} alt="Memory from the past" class="memory-img" />
        </section>
      {/if}

      <div class="grid-layout">
        <section class="section-box black-shadow">
          <h3>🙏 Prayer & Intentions</h3>
          <p>{capsule.prayer_goals || "No goals recorded."}</p>
        </section>

        <section class="section-box blue-shadow">
          <h3>🖼️ The Vision</h3>
          <p>{capsule.vision_board_desc || "No vision recorded."}</p>
        </section>
      </div>

      <footer class="footer-actions">
        <div class="action-grid">
            <button onclick={downloadCapsule} class="btn-download">Download Text 💾</button>
            <button onclick={() => window.print()} class="btn-print">Print / PDF 🖨️</button>
        </div>
        <a href="/check" class="back-link">← Back to Vault</a>
      </footer>
    </div>
  {:else}
    <div class="status-msg">Capsule not found. It might have been lost in time.</div>
  {/if}
</div>

<style>
  .unlock-container { padding: 60px 20px; max-width: 900px; margin: 0 auto; }
  .status-msg { text-align: center; font-weight: 900; font-size: 1.5rem; margin-top: 100px; }
  
  .locked-card { background: white; border: 5px solid black; padding: 60px; border-radius: 30px; text-align: center; box-shadow: 15px 15px 0px #2563eb; }
  .lock-icon { font-size: 5rem; margin-bottom: 20px; }
  
  .section-box { background: white; border: 4px solid black; padding: 30px; border-radius: 20px; margin-bottom: 30px; }
  .black-shadow { box-shadow: 8px 8px 0px black; }
  .blue-shadow { box-shadow: 8px 8px 0px #2563eb; }
  
  h3 { color: #2563eb; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px; margin-bottom: 15px; font-weight: 900; }
  .letter-body { font-size: 1.2rem; line-height: 1.8; white-space: pre-wrap; }
  
  .memory-img { width: 100%; border-radius: 15px; border: 3px solid black; margin-top: 10px; }
  
  .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 600px) { .grid-layout { grid-template-columns: 1fr; } }

  .footer-actions { margin-top: 50px; border-top: 4px solid black; padding-top: 40px; text-align: center; }
  .action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 500px; margin: 0 auto; }

  .btn-back, .btn-print, .btn-download { 
    display: inline-block; padding: 18px; 
    border: 3px solid black; border-radius: 15px; font-weight: 900; 
    cursor: pointer; text-decoration: none; text-transform: uppercase;
    transition: transform 0.1s;
  }

  .btn-back, .btn-print { background: #2563eb; color: white; box-shadow: 5px 5px 0px black; }
  .btn-download { background: black; color: white; box-shadow: 5px 5px 0px #2563eb; }

  .btn-back:hover, .btn-print:hover, .btn-download:hover { transform: translateY(-3px); }
  
  .back-link { display: block; margin-top: 25px; font-weight: 800; color: black; text-decoration: none; }

  .badge { display: inline-block; background: black; color: white; padding: 5px 12px; border-radius: 6px; font-weight: 900; font-size: 0.7rem; margin-bottom: 15px; }
  h1 { font-weight: 900; font-size: 2.5rem; letter-spacing: -1px; margin: 0 0 30px 0; }

  @media print {
    .footer-actions, .badge, .btn-back { display: none !important; }
    .unlock-container { padding: 0; }
    .section-box { box-shadow: none !important; border: 1px solid #eee; }
  }
</style>