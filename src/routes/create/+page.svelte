<script>
  import { supabase } from "$lib/supabase";
  import { fade } from 'svelte/transition';

  let email = "";
  let title = "";
  let letter = "";
  let goals = "";
  let prayer = "";
  let delivery_date = "";
  let imageFile = null;
  
  let isLoading = false;
  let errorMessage = "";

  async function uploadImage() {
    if (!imageFile) return null;

    // Use a folder-based naming convention for better organization
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `capsules/${fileName}`;

    const { data, error } = await supabase.storage
      .from("visionboards")
      .upload(filePath, imageFile);

    if (error) throw error;

    const { data: { publicUrl } } = supabase
      .storage
      .from("visionboards")
      .getPublicUrl(filePath);

    return publicUrl;
  }

  async function submitCapsule() {
    // Basic validation
    if (!email || !delivery_date || !letter) {
      errorMessage = "Please fill in your email, letter, and delivery date.";
      return;
    }

    isLoading = true;
    errorMessage = "";

    try {
      const imageUrl = await uploadImage();

      const res = await fetch("/api/capsule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          title,
          letter,
          goals,
          prayer,
          delivery_date,
          vision_image: imageUrl
        })
      });

      if (res.ok) {
        window.location = "/success";
      } else {
        throw new Error("Failed to save capsule. Please try again.");
      }
    } catch (err) {
      console.error(err);
      errorMessage = err.message || "An unexpected error occurred.";
    } finally {
      isLoading = false;
    }
  }
</script>

<section class="form-container">
  <header>
    <h1>Create Your Future Capsule</h1>
    <p>A gift for the person you are becoming.</p>
  </header>

  <div class="form-card">
    <div class="input-group">
      <label for="email">Email Address</label>
      <input id="email" type="email" placeholder="Where should we send this?" bind:value={email} required>
    </div>

    <div class="input-group">
      <label for="title">Capsule Title</label>
      <input id="title" type="text" placeholder="e.g., My 30th Birthday Letter" bind:value={title}>
    </div>

    <div class="input-group">
      <label for="letter">Letter to your future self</label>
      <textarea id="letter" rows="6" placeholder="Dear future me..." bind:value={letter}></textarea>
    </div>

    <div class="grid-fields">
      <div class="input-group">
        <label for="goals">Your Goals</label>
        <textarea id="goals" rows="3" placeholder="What do you want to achieve?" bind:value={goals}></textarea>
      </div>
      <div class="input-group">
        <label for="prayer">Prayer or Reflection</label>
        <textarea id="prayer" rows="3" placeholder="A quiet thought or prayer..." bind:value={prayer}></textarea>
      </div>
    </div>

    <div class="grid-fields">
      <div class="input-group">
        <label for="image">Vision Board Image</label>
        <input id="image" type="file" accept="image/*" on:change={(e) => imageFile = e.target.files[0]}>
      </div>
      <div class="input-group">
        <label for="date">Delivery Date</label>
        <input id="date" type="date" bind:value={delivery_date} required>
      </div>
    </div>

    {#if errorMessage}
      <p class="error" transition:fade>{errorMessage}</p>
    {/if}

    <button on:click={submitCapsule} disabled={isLoading}>
      {#if isLoading}
        Creating your capsule...
      {:else}
        Seal the Capsule
      {/if}
    </button>
  </div>
</section>

<style>
  .form-container {
    max-width: 700px;
    margin: 40px auto;
    padding: 0 20px;
  }

  header {
    text-align: center;
    margin-bottom: 40px;
  }

  h1 { font-size: 2rem; color: #111827; margin-bottom: 8px; }
  header p { color: #6b7280; }

  .form-card {
    background: white;
    padding: 32px;
    border-radius: 20px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
  }

  input, textarea {
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s, ring 0.2s;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .grid-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .error {
    color: #dc2626;
    background: #fef2f2;
    padding: 12px;
    border-radius: 8px;
    font-size: 0.9rem;
    text-align: center;
  }

  button {
    background: #2563eb;
    color: white;
    padding: 16px;
    border-radius: 12px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    margin-top: 10px;
  }

  button:hover:not(:disabled) {
    background: #1d4ed8;
  }

  button:active:not(:disabled) {
    transform: scale(0.98);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    .grid-fields { grid-template-columns: 1fr; }
  }
</style>