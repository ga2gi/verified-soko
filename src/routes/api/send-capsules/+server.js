import { supabase } from "$lib/supabase";
import { sendCapsuleEmail } from "$lib/email";

export async function GET() {
  // 1. Get today's date in YYYY-MM-DD format (Nairobi/Local time)
  const today = new Date().toISOString().split("T")[0];

  // 2. Fetch unsent capsules for today
  const { data: capsules, error: fetchError } = await supabase
    .from("capsules")
    .select("*")
    .eq("delivery_date", today)
    .eq("sent", false);

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), { status: 500 });
  }

  // 3. Handle empty queue
  if (!capsules || capsules.length === 0) {
    return new Response(JSON.stringify({ 
      success: true, 
      message: `No capsules found for delivery date: ${today}` 
    }));
  }

  const results = {
    total: capsules.length,
    sent: 0,
    failed: 0
  };

  // 4. Process capsules in parallel
  await Promise.allSettled(
    capsules.map(async (capsule) => {
      try {
        const emailResult = await sendCapsuleEmail(capsule);
        
        if (emailResult.success) {
          // 5. Update database only on successful email handoff
          const { error: updateError } = await supabase
            .from("capsules")
            .update({ 
              sent: true, 
              delivered_at: new Date().toISOString() 
            })
            .eq("id", capsule.id);
          
          if (updateError) throw updateError;
          results.sent++;
        } else {
          throw new Error(emailResult.error);
        }
      } catch (err) {
        console.error(`Failed to deliver capsule ${capsule.id}:`, err);
        results.failed++;
      }
    })
  );

  return new Response(JSON.stringify({
    success: true,
    summary: results
  }));
}