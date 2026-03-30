<script>
  import { supabase } from '$lib/supabaseClient'; 
  import { goto } from '$app/navigation';

  let email = $state("");
  let date = $state("");
  let message = $state("");
  let prayerGoal = $state("");
  let questions = $state("");
  let currentFavs = $state("");
  let visionBoard = $state("");
  let photoFile = $state(null);
  let uploading = $state(false);

  function handleFileChange(e) {
    photoFile = e.target.files[0];
  }

  async function handleSubmit() {
    if (!email || !date) return alert("Please add an email and unlock date!");
    
    uploading = true;
    let photoUrl = null;

    try {
      // 1. Upload Photo if it exists
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('capsule-media')
          .upload(filePath, photoFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('capsule-media').getPublicUrl(filePath);
        photoUrl = data.publicUrl;
      }

      // 2. REAL INSERT: Save to the database
      const { error } = await supabase
        .from('capsules')
        .insert([{
          email: email,
          unlock_date: date,
          message: message,
          prayer_goals: prayerGoal,
          questions_for_self: questions,
          vision_board_desc: visionBoard,
          current_favorites: currentFavs,
          photo_url: photoUrl
        }]);

      if (error) throw error;

      // 3. Success!
      goto('/sent');

    } catch (err) {
      console.error("Database Error:", err.message);
      alert("Error: " + err.message);
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
      <p>A gift for the "Future You" who hasn't arrived yet.</p>
    </header>
    
    <div class="section-box blue-shadow">
      <h3>01. The Destination</h3>
      <div class="input-group">
        <label for="email">Future Email Address</label>
        <input type="email" id="email" bind:value={email} placeholder="where should we send it?" />
      </div>
      <div class="input-group">
        <label for="date">Unlock Date</label>
        <input type="date" id="date" bind:value={date} />
      </div>
    </div>

    <div class="section-box black-shadow">
      <h3>02. The Heart</h3>
      <label for="message">Dear Future Self...</label>
      <textarea id="message" bind:value={message} placeholder="Write your general thoughts, feelings, or secrets here..."></textarea>
    </div>

    <div class="section-box blue-shadow">
      <h3>03. The Spirit</h3>
      <label for="prayer">🙏 Prayer Goals & Intentions</label>
      <textarea id="prayer" bind:value={prayerGoal} placeholder="What are you trusting God for right now?" class="small-textarea"></textarea>
      
      <label for="questions">❓ Questions for Future Me</label>
      <textarea id="questions" bind:value={questions} placeholder="e.g. Did you ever start that business?" class="small-textarea"></textarea>
    </div>

    <div class="section-box black-shadow">
      <h3>04. The Vision</h3>
      <label for="vision">🖼️ Vision Board (Text Description)</label>
      <textarea id="vision" bind:value={visionBoard} placeholder="Describe the life you are manifesting right now..." class="small-textarea"></textarea>
      
      <label for="file-upload">📸 Current Favourite Photo</label>
      <div class="upload-zone">
        <input type="file" accept="image/*" onchange={handleFileChange} id="file-upload" />
        <p>{photoFile ? `Selected: ${photoFile.name}` : "Click to upload a snapshot of today"}</p>
      </div>
    </div>

    <div class="section-box blue-shadow">
      <h3>05. The Vibe</h3>
      <label for="favs">🎧 Current Favorites (Music, Food, Hobby)</label>
      <input type="text" id="favs" bind:value={currentFavs} placeholder="e.g. Tems, Chapati, Building Apps" />
    </div>

    <button class="lock-btn" onclick={handleSubmit} disabled={uploading}>
      {uploading ? "Sealing Vault..." : "Seal & Lock Capsule 🔒"}
    </button>
  </div>
</section>

<style>
  /* Styles remain exactly as you have them */
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
  .small-textarea { height: 110px; }
  .upload-zone { border: 3px dashed black; padding: 30px; border-radius: 15px; text-align: center; background: #eff6ff; cursor: pointer; position: relative; }
  .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .lock-btn { width: 100%; background: #2563eb; color: white; padding: 25px; font-weight: 900; font-size: 1.6rem; border: 4px solid black; border-radius: 25px; cursor: pointer; box-shadow: 0px 10px 0px black; transition: all 0.1s; }
  .lock-btn:hover { transform: translateY(-2px); box-shadow: 0px 14px 0px black; }
  .lock-btn:active { transform: translateY(6px); box-shadow: 0px 4px 0px black; }
  .lock-btn:disabled { background: #64748b; cursor: not-allowed; }
</style>