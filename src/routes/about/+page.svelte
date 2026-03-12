<section class="about">
  <div class="header-group">
    <span class="badge">Our Mission</span>
    <h1>Preserving who you are today for who you'll become tomorrow.</h1>
  </div>

  <div class="content">
    <p class="intro">
      FutureCapsule was born from a simple idea: in a fast-paced world, we often forget the dreams, 
      prayers, and small joys that define our present moments.
    </p>

    <div class="grid">
      <div class="box">
        <h3>Reflect</h3>
        <p>Take a moment to pause and assess where you are. What are you grateful for? What are you struggling with?</p>
      </div>
      <div class="box">
        <h3>Dream</h3>
        <p>Set goals for your future self. Not just professional milestones, but the kind of person you hope to be.</p>
      </div>
    </div>

    <p>
      Inside each capsule, you can write a letter, set personal goals, and record reflections 
      that will be securely stored and delivered to your inbox on the exact date you choose.
    </p>

    <p class="highlight">
      Years from now, your past self will remind you who you once were, 
      the hurdles you've overcome, and the hopes you once whispered.
    </p>
  </div>

  <div class="cta-mini">
    <a href="/create" class="text-link">Ready to write? Create your first capsule →</a>
  </div>
</section>

<style>
  .about {
    max-width: 800px;
    margin: 60px auto;
    line-height: 1.8;
    color: var(--text-dark, #1f2937);
  }

  .header-group {
    text-align: center;
    margin-bottom: 60px;
  }

  .badge {
    display: inline-block;
    padding: 4px 12px;
    background: #e0e7ff;
    color: #4338ca;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 2.75rem);
    line-height: 1.2;
    color: #111827;
    font-weight: 800;
  }

  .intro {
    font-size: 1.25rem;
    color: #4b5563;
    margin-bottom: 40px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin: 40px 0;
  }

  .box {
    background: #f9fafb;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #f3f4f6;
  }

  .box h3 {
    margin-top: 0;
    color: #2563eb;
    font-size: 1.1rem;
  }

  .highlight {
    font-size: 1.1rem;
    font-style: italic;
    border-left: 4px solid #2563eb;
    padding-left: 24px;
    margin: 40px 0;
    color: #374151;
  }

  .cta-mini {
    margin-top: 60px;
    text-align: center;
    border-top: 1px solid #eee;
    padding-top: 30px;
  }

  .text-link {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
    transition: gap 0.2s;
  }

  .text-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>