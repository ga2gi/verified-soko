<script>
  import { supabase } from '$lib/supabaseClient'; 
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';

  let email = $state(""); 
  let recipientEmail = $state(""); 
  let isForSelf = $state(true);

  let date = $state("");
  let message = $state("");
  let prayerGoal = $state("");
  let questions = $state("");
  let currentFavs = $state("");
  let visionBoard = $state("");
  let photoFile = $state(null);
  let uploading = $state(false);

  // --- NEW AFFILIATE & PRICING STATES ---
  let promoCode = $state("");
  let basePrice = 2000;
  let discount = $state(0);
  let finalPrice = $derived(basePrice - discount);
  let appliedCode = $state(null);
  let promoError = $state("");

  // Payment Logic States
  let showPaymentModal = $state(false);
  let mpesaCode = $state("");
  let verifying = $state(false);
  let copiedField = $state(""); 

  // --- NEW: APPLY PROMO CODE FUNCTION ---
  async function applyCode() {
    promoError = "";
    if (!promoCode) return;

    const { data, error } = await supabase
      .from('affiliates')
      .select('discount_amount, code')
      .eq('code', promoCode.toUpperCase().trim())
      .eq('is_active', true)
      .single();

    if (data) {
      discount = data.discount_amount;
      appliedCode = data.code;
    } else {
      discount = 0;
      appliedCode = null;
      promoError = "Invalid or expired code.";
    }
  }

  function handleFileChange(e) {
    photoFile = e.target.files[0];
  }

  function copyToClipboard(text, fieldName) {
    navigator.clipboard.writeText(text);
    copiedField = fieldName;
    setTimeout(() => copiedField = "", 2000);
  }

  async function checkPaymentStatus() {
    const { data, error } = await supabase
      .from('payments')
      .select('is_verified')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (error && error.code !== 'PGRST116') throw error; 
    return data?.is_verified || false;
  }

  async function handlePaymentSubmission() {
    if (mpesaCode.length < 8) return alert("Please paste a valid M-Pesa confirmation message.");
    verifying = true;

    try {
      const { error } = await supabase
        .from('payments')
        .upsert({ 
          email: email.toLowerCase().trim(), 
          mpesa_code: mpesaCode,
          is_verified: false,
          // Store the affiliate info for Sharon's Google Sheet
          affiliate_code: appliedCode,
          amount_paid: finalPrice 
        });

      if (error) throw error;
      
      alert(`Payment received! Sharon will verify the KES ${finalPrice.toLocaleString()} manually.`);
      showPaymentModal = false;
    } catch (err) {
      alert("Submission error: " + err.message);
    } finally {
      verifying = false;
    }
  }

  async function handleSubmit() {
    const finalRecipient = isForSelf ? email : recipientEmail;
    if (!email || !date || (!isForSelf && !recipientEmail)) {
      return alert("Please ensure all email and date fields are filled!");
    }
    
    uploading = true;
    try {
      const isPaid = await checkPaymentStatus();
      if (!isPaid) {
        showPaymentModal = true;
        uploading = false;
        return;
      }

      let photoUrl = null;
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('capsule-media').upload(filePath, photoFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('capsule-media').getPublicUrl(filePath);
        photoUrl = data.publicUrl;
      }

      const { error } = await supabase.from('capsules').insert([{
          email: finalRecipient.toLowerCase().trim(),
          sender_email: email.toLowerCase().trim(), 
          unlock_date: date,
          message: message,
          prayer_goals: prayerGoal,
          questions_for_self: questions,
          vision_board_desc: visionBoard,
          current_favorites: currentFavs,
          photo_url: photoUrl
      }]);

      if (error) throw error;
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: finalRecipient, sender: email, unlockDate: date })
      });
      goto('/sent');
    } catch (err) {
      console.error("Error:", err.message);
      alert("System Error: " + err.message);
    } finally {
      uploading = false;
    }
  }
</script>

<section class="create-container">
  <div class="form-card">
    <header class="form-header">
      <div class="badge">SECURE VAULT v2.0</div>
      <h1>Create Your Capsule 📦</h1>
      <p>A gift for the future that arrives right on time.</p>
    </header>
    
    <div class="section-box blue-shadow">
      <h3>01. The Destination</h3>
      <div class="input-group">
        <label for="email">Your Email (Vault Owner)</label>
        <input type="email" id="email" bind:value={email} placeholder="your@email.com" />
      </div>

      <div class="recipient-toggle">
        <button class:active={isForSelf} onclick={() => isForSelf = true}>For Myself</button>
        <button class:active={!isForSelf} onclick={() => isForSelf = false}>For Someone Else</button>
      </div>

      {#if !isForSelf}
      <div class="input-group" transition:fade>
        <label for="recipient">Recipient Email Address</label>
        <input type="email" id="recipient" bind:value={recipientEmail} placeholder="Where should we send this?" />
      </div>
      {/if}

      <div class="input-group">
        <label for="date">Unlock Date</label>
        <input type="date" id="date" bind:value={date} />
      </div>
    </div>

    <div class="section-box black-shadow">
      <h3>02. The Heart</h3>
      <label for="message">Dear {isForSelf ? 'Future Self' : 'Future Recipient'}...</label>
      <textarea id="message" bind:value={message} placeholder="Write your thoughts..."></textarea>
    </div>

    <div class="section-box blue-shadow">
      <h3>03. The Spirit</h3>
      <label for="prayer">🙏 Prayer Goals & Intentions</label>
      <textarea id="prayer" bind:value={prayerGoal} placeholder="What are you trusting God for?" class="small-textarea"></textarea>
      <label for="questions">❓ Questions for Future Me</label>
      <textarea id="questions" bind:value={questions} placeholder="e.g. Did you start that business?" class="small-textarea"></textarea>
    </div>

    <div class="section-box black-shadow">
      <h3>04. The Vision</h3>
      <label for="vision">🖼️ Vision Board</label>
      <textarea id="vision" bind:value={visionBoard} placeholder="Describe the life you manifest..." class="small-textarea"></textarea>
      <label for="file-upload">📸 Favourite Photo</label>
      <div class="upload-zone">
        <input type="file" accept="image/*" onchange={handleFileChange} id="file-upload" />
        <p>{photoFile ? `Selected: ${photoFile.name}` : "Click to upload"}</p>
      </div>
    </div>

    <div class="section-box blue-shadow">
      <h3>05. The Vibe</h3>
      <label for="favs">🎧 Current Favorites</label>
      <input type="text" id="favs" bind:value={currentFavs} placeholder="e.g. Tems, Chapati" />
    </div>

    <div class="section-box black-shadow promo-box">
      <h3>06. Exclusive Access</h3>
      <label for="promo">Have an Affiliate Code?</label>
      <div class="promo-row">
        <input type="text" id="promo" bind:value={promoCode} placeholder="ENTER CODE" />
        <button class="apply-btn" onclick={applyCode}>Apply</button>
      </div>
      {#if promoError}<p class="promo-error">{promoError}</p>{/if}
      
      <div class="price-summary">
        <p>Standard Access: <s>2,000 KES</s></p>
        {#if discount > 0}
          <p class="discount-label">Affiliate Discount: -{discount} KES</p>
        {/if}
        <h2 class="final-price">Total: {finalPrice.toLocaleString()} KES</h2>
      </div>
    </div>

    <button class="lock-btn" onclick={handleSubmit} disabled={uploading}>
      {uploading ? "Verifying Vault..." : "Seal & Lock Capsule 🔒"}
    </button>
  </div>
</section>

{#if showPaymentModal}
<div class="modal-overlay">
  <div class="modal-content">
    <h2>Unlock Your Archive 🔒</h2>
    <p>The email <b>{email}</b> is not yet registered. Pay a one-time <b>KES {finalPrice.toLocaleString()}</b> to unlock unlimited capsules for life.</p>
    
    <div class="paybill-container">
      <div class="copy-item" onclick={() => copyToClipboard("400200", "Paybill")}>
        <span>Paybill: <b>400200</b></span>
        <button class="copy-tag">{copiedField === "Paybill" ? "Copied!" : "Copy"}</button>
      </div>
      <div class="copy-item" onclick={() => copyToClipboard("25476843891101", "Account")}>
        <span>Acc: <b>25476843891101</b></span>
        <button class="copy-tag">{copiedField === "Account" ? "Copied!" : "Copy"}</button>
      </div>
      <div class="copy-item" onclick={() => copyToClipboard(finalPrice.toString(), "Amount")}>
        <span>Amount: <b>{finalPrice.toLocaleString()}</b></span>
        <button class="copy-tag">{copiedField === "Amount" ? "Copied!" : "Copy"}</button>
      </div>
    </div>

    <p class="beneficiary">Beneficiary: SHARON GIKUNDI (Co-op Bank)</p>

    <label for="mpesa" style="margin-top: 15px;">Paste M-Pesa Confirmation:</label>
    <textarea id="mpesa" bind:value={mpesaCode} placeholder="Paste the confirmation message here..." class="small-textarea"></textarea>
    
    <div class="modal-actions">
      <button class="pay-btn" onclick={handlePaymentSubmission} disabled={verifying}>
        {verifying ? "Submitting..." : "Submit Payment Code"}
      </button>
      <button class="close-btn" onclick={() => showPaymentModal = false}>Cancel</button>
    </div>
  </div>
</div>
{/if}

<style>
  /* All your original styles preserved */
  .create-container { padding: 60px 20px; display: flex; justify-content: center; background: #f1f5f9; }
  .form-card { width: 100%; max-width: 750px; }
  .form-header { text-align: center; margin-bottom: 50px; }
  .badge { display: inline-block; background: black; color: white; padding: 5px 12px; border-radius: 6px; font-weight: 900; font-size: 0.7rem; margin-bottom: 10px; }
  h1 { font-weight: 900; font-size: 3.5rem; letter-spacing: -3px; margin: 0; }
  .section-box { background: white; padding: 35px; border-radius: 24px; border: 4px solid black; margin-bottom: 40px; text-align: left; }
  .blue-shadow { box-shadow: 10px 10px 0px #2563eb; }
  .black-shadow { box-shadow: 10px 10px 0px black; }
  h3 { font-weight: 900; text-transform: uppercase; font-size: 0.9rem; color: #2563eb; margin-bottom: 25px; letter-spacing: 1px; }
  label { display: block; font-weight: 800; font-size: 1.1rem; margin-bottom: 10px; margin-top: 20px; }
  input, textarea { width: 100%; padding: 18px; border: 3px solid black; border-radius: 15px; font-family: inherit; font-size: 1rem; background: #f8fafc; }
  textarea { height: 220px; resize: none; }
  .small-textarea { height: 90px; }
  .upload-zone { border: 3px dashed black; padding: 30px; border-radius: 15px; text-align: center; background: #eff6ff; cursor: pointer; position: relative; }
  .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .lock-btn { width: 100%; background: #2563eb; color: white; padding: 25px; font-weight: 900; font-size: 1.6rem; border: 4px solid black; border-radius: 25px; cursor: pointer; box-shadow: 0px 10px 0px black; transition: all 0.1s; }
  .lock-btn:hover { transform: translateY(-2px); box-shadow: 0px 14px 0px black; }
  .lock-btn:active { transform: translateY(6px); box-shadow: 0px 4px 0px black; }
  .lock-btn:disabled { background: #64748b; cursor: not-allowed; }

  /* Affiliate & Promo UI */
  .promo-row { display: flex; gap: 10px; margin-bottom: 15px; }
  .apply-btn { background: black; color: white; border: none; padding: 0 25px; border-radius: 12px; font-weight: 800; cursor: pointer; }
  .promo-error { color: #dc2626; font-weight: 700; font-size: 0.85rem; margin-bottom: 10px; }
  .price-summary { border-top: 2.5px dashed black; padding-top: 20px; margin-top: 20px; }
  .discount-label { color: #16a34a; font-weight: 800; }
  .final-price { font-weight: 900; font-size: 1.8rem; margin: 5px 0; }

  /* Modal & Toggle Styles */
  .recipient-toggle { display: flex; gap: 10px; margin: 20px 0; }
  .recipient-toggle button { flex: 1; padding: 15px; border: 3px solid black; border-radius: 12px; font-weight: 800; background: white; cursor: pointer; transition: 0.1s; }
  .recipient-toggle button.active { background: #2563eb; color: white; box-shadow: 4px 4px 0px black; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: grid; place-items: center; z-index: 1000; padding: 20px; }
  .modal-content { background: white; padding: 30px; border-radius: 25px; border: 4px solid black; max-width: 450px; width: 100%; box-shadow: 12px 12px 0px #2563eb; }
  .paybill-container { display: flex; flex-direction: column; gap: 8px; margin: 15px 0; }
  .copy-item { display: flex; justify-content: space-between; align-items: center; background: #f1f5f9; border: 2.5px solid black; padding: 12px 15px; border-radius: 12px; cursor: pointer; }
  .copy-tag { background: black; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; }
  .pay-btn { background: #16a34a; color: white; padding: 18px; border-radius: 15px; font-weight: 900; border: 3px solid black; cursor: pointer; box-shadow: 0px 5px 0px black; }
  .close-btn { background: transparent; font-weight: 700; text-decoration: underline; border: none; cursor: pointer; padding: 10px; }
</style>