import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function GET(req) {
  try {
    // Fetch poll data
    const { data, error } = await supabase.from('polls').select('*').limit(1).single();

    if (error) {
      console.error('Error fetching poll:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch poll.' }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error.' }), { status: 500 });
  }
}