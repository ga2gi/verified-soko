<section class="about-section">
  <h1 class="title">How it <span class="blue-text">Works</span></h1>
  
  <div class="grid">
    <div class="step-card">
      <span class="number">01</span>
      <h3>Write</h3>
      <p>Pour your heart out. Tell your future self about your current dreams, fears, or just what you ate for lunch.</p>
    </div>

    <div class="step-card">
      <span class="number">02</span>
      <h3>Seal</h3>
      <p>Pick a date. It could be 6 months from now or 10 years. We encrypt it so nobody (not even us) can read it.</p>
    </div>

    <div class="step-card">
      <span class="number">03</span>
      <h3>Receive</h3>
      <p>On your chosen date, the vault opens. You'll get an email with your message. It's like a gift from the past.</p>
    </div>
  </div>

  <div class="faq">
    <h2>Common Questions</h2>
    <details>
      <summary>Is it really free?</summary>
      <p>Yes. Preserving memories shouldn't cost a thing.</p>
    </details>
    <details>
      <summary>What if I change my email?</summary>
      <p>We are working on a dashboard where you can update your delivery address using a unique key.</p>
    </details>
  </div>
</section>

<style>
  .about-section { max-width: 1000px; margin: 80px auto; padding: 0 20px; text-align: center; }
  .title { font-size: 4rem; font-weight: 900; margin-bottom: 60px; }
  .blue-text { color: #2563eb; }
  
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-bottom: 80px; }
  
  .step-card {
    background: white;
    border: 3px solid black;
    padding: 40px;
    border-radius: 20px;
    text-align: left;
    position: relative;
  }
  .number {
    position: absolute;
    top: -20px;
    right: 20px;
    background: #2563eb;
    color: white;
    padding: 5px 15px;
    font-weight: 900;
    border: 3px solid black;
    border-radius: 8px;
  }
  h3 { font-weight: 900; font-size: 1.5rem; margin-bottom: 15px; }
  
  .faq { text-align: left; max-width: 700px; margin: 0 auto; }
  .faq h2 { font-weight: 900; margin-bottom: 30px; font-size: 2rem; }
  
  details {
    border-bottom: 3px solid black;
    padding: 20px 0;
    cursor: pointer;
  }
  summary { font-weight: 800; font-size: 1.2rem; list-style: none; }
  details p { margin-top: 15px; color: #555; }
</style>