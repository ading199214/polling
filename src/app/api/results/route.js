import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function GET(req) {
  try {
    // Fetch the current poll and its results
    const { data, error } = await supabase.from('polls').select('*').limit(1).single();

    if (error || !data) {
      console.error('Error fetching poll:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch poll results.' }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error.' }), { status: 500 });
  }
}