<script>
  import { onMount } from 'svelte';

  onMount(() => {
    console.log("Capsule successfully locked in the vault.");
  });
</script>

<section class="sent-wrapper">
  <div class="success-card">
    <div class="stamp">OFFICIAL SEAL</div>
    
    <div class="icon-box">
      <span class="rocket">🚀</span>
    </div>

    <h1>Locked & Loaded!</h1>
    
    <div class="details">
      <p>Your future self is going to love this.</p>
      <div class="info-tag">
        <span>Status:</span> <strong>Encrypted</strong>
      </div>
      <div class="info-tag">
        <span>Location:</span> <strong>Digital Vault</strong>
      </div>
    </div>

    <p class="note">
      We've sent a "Receipt from the Past" to your email. Your vision board and prayer goals are now safe.
    </p>

    <div class="action-stack">
      <a href="/" class="btn-primary">Back to Present Day</a>
      <a href="/create" class="btn-secondary">Write Another?</a>
    </div>
  </div>
</section>

<style>
  .sent-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 20px;
    background: #f8fafc;
    min-height: 80vh;
  }

  .success-card {
    background: white;
    border: 5px solid black;
    padding: 60px 40px;
    border-radius: 40px;
    max-width: 550px;
    width: 100%;
    text-align: center;
    position: relative;
    box-shadow: 15px 15px 0px #2563eb; 
  }

  .stamp {
    position: absolute;
    top: 20px;
    right: 20px;
    border: 3px solid #2563eb;
    color: #2563eb;
    padding: 5px 10px;
    font-weight: 900;
    font-size: 0.7rem;
    transform: rotate(15deg);
    border-radius: 4px;
  }

  .icon-box {
    width: 100px;
    height: 100px;
    background: #eff6ff;
    border: 3px solid black;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 30px;
  }

  .rocket { font-size: 3rem; }

  h1 {
    font-weight: 900;
    font-size: 3rem;
    letter-spacing: -2px;
    margin-bottom: 20px;
  }

  .details {
    background: #f1f5f9;
    padding: 20px;
    border-radius: 20px;
    border: 3px solid black;
    margin-bottom: 30px;
  }

  .info-tag {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  .note {
    font-size: 1rem;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 40px;
  }

  .action-stack {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .btn-primary {
    background: #2563eb;
    color: white;
    padding: 20px;
    border-radius: 15px;
    border: 4px solid black;
    font-weight: 900;
    font-size: 1.2rem;
    text-decoration: none;
    box-shadow: 0px 6px 0px black;
    display: block;
  }

  .btn-secondary {
    color: black;
    font-weight: 800;
    text-decoration: none;
    padding: 10px;
  }
</style>