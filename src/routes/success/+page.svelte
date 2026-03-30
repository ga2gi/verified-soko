<section class="sent-container">
  <div class="success-card">
    <div class="icon-circle">🚀</div>
    <h1>It's in the Vault!</h1>
    <p>Your capsule has been locked. We’ve sent a confirmation to your email. See you in the future!</p>
    
    <div class="button-stack">
      <a href="/" class="btn-home">Back Home</a>
      <a href="/create" class="btn-another">Write Another?</a>
    </div>
  </div>
</section>

<style>
  .sent-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 20px;
    text-align: center;
  }
  .success-card {
    background: white;
    border: 4px solid black;
    padding: 60px 40px;
    border-radius: 30px;
    max-width: 500px;
    box-shadow: 12px 12px 0px #2563eb;
  }
  .icon-circle {
    font-size: 4rem;
    margin-bottom: 20px;
  }
  h1 { font-weight: 900; font-size: 2.5rem; margin-bottom: 20px; }
  p { font-size: 1.1rem; color: #444; line-height: 1.6; margin-bottom: 40px; }
  
  .button-stack { display: flex; flex-direction: column; gap: 15px; }
  
  .btn-home {
    background: black;
    color: white;
    padding: 15px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 800;
  }
  .btn-another {
    color: #2563eb;
    font-weight: 800;
    text-decoration: none;
  }
</style>