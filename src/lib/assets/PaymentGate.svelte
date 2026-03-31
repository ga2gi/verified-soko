<script>
  import { supabase } from '$lib/supabaseClient';
  export let user;
  
  let mpesaMsg = "";
  let isSubmitting = false;

  async function submitPayment() {
    if (mpesaMsg.length < 15) {
      alert("Please paste the full M-Pesa confirmation message.");
      return;
    }

    isSubmitting = true;
    const { error } = await supabase
      .from('profiles')
      .update({ 
        mpesa_confirmation: mpesaMsg,
        payment_status: 'pending' 
      })
      .eq('id', user.id);

    if (!error) {
      alert("Payment submitted! We will verify your KES 1,000 and unlock your vault within 1 hour.");
      location.reload(); // Refresh to show "Pending" status
    }
    isSubmitting = false;
  }
</script>

<div class="payment-overlay">
  <div class="card">
    <h2>Unlock Lifetime Access</h2>
    <p>To secure your digital archive forever, a one-time <b>KES 1,000</b> contribution is required.</p>
    
    <div class="paybill-info">
      <p>Paybill: <b>[YOUR_PAYBILL]</b></p>
      <p>Account: <b>{user.email.split('@')[0]}</b></p>
    </div>

    <label>Paste M-Pesa Confirmation Message:</label>
    <textarea bind:value={mpesaMsg} placeholder="Example: OCI456789 Confirmed. Ksh1,000.00 paid to..."></textarea>

    <button on:click={submitPayment} disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Verify Payment"}
    </button>
  </div>
</div>

<style>
  .payment-overlay { background: #f9f9f9; padding: 40px; border: 4px solid black; border-radius: 20px; text-align: center; }
  .paybill-info { background: #eee; padding: 20px; margin: 20px 0; border-radius: 10px; font-weight: 800; border: 2px solid black;}
  textarea { width: 100%; height: 120px; border: 2px solid black; padding: 10px; margin-bottom: 20px; border-radius: 8px; }
  button { background: #2563eb; color: white; padding: 15px 30px; border-radius: 10px; font-weight: 900; cursor: pointer; width: 100%; border: none; }
</style>