<script>
  import { toast } from './toastStore';
  import { fade, fly } from 'svelte/transition';
</script>

{#if $toast}
  <div 
    in:fly={{ y: 50, duration: 400 }} 
    out:fade 
    class="toast {$toast.type}"
  >
    <span class="icon">
      {#if $toast.type === 'success'} ✅ {:else if $toast.type === 'error'} ❌ {:else} ℹ️ {/if}
    </span>
    {$toast.message}
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 700;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 9999;
    color: white;
    min-width: 300px;
  }
  .success { background: #059669; border: 1px solid #10b981; }
  .error { background: #dc2626; border: 1px solid #ef4444; }
  .info { background: #0f172a; border: 1px solid #1e293b; }
  .icon { font-size: 1.2rem; }
</style>