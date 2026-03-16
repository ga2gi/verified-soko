<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  // Your new secret key
  const SECRET_KEY = "SG2978"; 
  
  let authorized = false;
  let requests: any[] = [];
  let loading = true;
  let processingId: string | null = null;
  let copiedId: string | null = null;

  onMount(() => {
    if ($page.params.secret === SECRET_KEY) {
      authorized = true;
      fetchRequests();
    } else {
      loading = false;
    }
  });

  async function fetchRequests() {
    loading = true;
    const { data } = await supabase
      .from('verification_requests')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    requests = data || [];
    loading = false;
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    copiedId = id;
    setTimeout(() => (copiedId = null), 2000);
  }

  async function approveStore(request: any) {
    processingId = request.id;
    const { error: insertError } = await supabase.from('stores').insert([{
      name: request.store_name,
      handle: request.handle,
      platform: request.platform,
      is_verified: true,
      notes: `Verified via ${request.requester_type} request.`
    }]);

    if (insertError) {
      alert("Error: " + insertError.message);
      processingId = null;
      return;
    }

    await supabase.from('verification_requests').update({ status: 'approved' }).eq('id', request.id);
    processingId = null;
    fetchRequests();
  }

  async function rejectStore(id: string) {
    if (!confirm("Reject this store?")) return;
    processingId = id;
    await supabase.from('verification_requests').update({ status: 'rejected' }).eq('id', id);
    processingId = null;
    fetchRequests();
  }

  function getVerifyLink(platform: string, handle: string) {
    return platform === 'TikTok' ? `https://tiktok.com/@${handle}` : `https://instagram.com/${handle}`;
  }
</script>

<div class="prose-container">
  {#if !authorized && !loading}
    <div class="error-state" in:fade>
      <h1>404</h1>
      <p>Directory not found.</p>
    </div>
  {:else}
    <header class="admin-header">
      <h1>Vetting <span>Queue</span></h1>
      <div class="stats-badge">{requests.length} Pending</div>
    </header>

    {#if loading}
      <div class="loading-bar"></div>
    {:else}
      <div class="queue-stack">
        {#each requests as req (req.id)}
          <div class="request-card" in:slide>
            <div class="req-content">
              <div class="req-header">
                <span class="type-tag" class:owner={req.requester_type === 'owner'}>
                  {req.requester_type}
                </span>
                <a href={getVerifyLink(req.platform, req.handle)} target="_blank" class="ext-link">
                  Open {req.platform} ↗
                </a>
              </div>

              <h3>{req.store_name}</h3>
              <p class="handle-text">@{req.handle}</p>

              <button class="btn-copy" on:click={() => copyToClipboard(req.store_name, req.id)}>
                {copiedId === req.id ? 'Copied!' : 'Copy Name for M-Pesa Search'}
              </button>
            </div>

            <div class="req-actions">
              <button class="btn-approve" disabled={processingId === req.id} on:click={() => approveStore(req)}>
                {processingId === req.id ? '...' : 'Approve'}
              </button>
              <button class="btn-reject" disabled={processingId === req.id} on:click={() => rejectStore(req.id)}>
                Reject
              </button>
            </div>
          </div>
        {:else}
          <div class="empty-state">
            <p>No pending requests.</p>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
  .stats-badge { background: var(--bg-soft); padding: 4px 12px; border-radius: 20px; font-weight: 800; font-size: 0.8rem; color: var(--primary-blue); }
  
  .queue-stack { display: flex; flex-direction: column; gap: 20px; }
  
  .request-card {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;
    align-items: center;
  }

  .req-header { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }
  .ext-link { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--primary-blue); text-decoration: none; }
  
  .type-tag { font-size: 0.6rem; font-weight: 900; padding: 4px 8px; border-radius: 6px; background: #f1f5f9; text-transform: uppercase; }
  .type-tag.owner { background: #dcfce7; color: #166534; }

  .handle-text { color: var(--text-light); font-weight: 600; margin: 4px 0 16px 0; }
  h3 { margin: 0; font-size: 1.3rem; letter-spacing: -0.02em; }

  .btn-copy {
    background: var(--bg-soft);
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    color: var(--text-dark);
  }

  .req-actions { display: flex; flex-direction: column; gap: 10px; }
  .btn-approve { background: var(--trust-green); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 800; cursor: pointer; }
  .btn-reject { background: transparent; color: #ef4444; border: 1px solid #fee2e2; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; }

  .loading-bar { height: 4px; background: var(--bg-soft); border-radius: 2px; overflow: hidden; position: relative; }
  .loading-bar::after { content: ''; position: absolute; width: 40%; height: 100%; background: var(--primary-blue); animation: load 1s infinite linear; }
  @keyframes load { 0% { left: -40%; } 100% { left: 100%; } }

  @media (max-width: 600px) {
    .request-card { grid-template-columns: 1fr; }
    .req-actions { flex-direction: row; }
    .btn-approve, .btn-reject { flex: 1; }
  }
</style>