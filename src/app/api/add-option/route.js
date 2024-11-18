import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function POST(req) {
  try {
    const { optionText } = await req.json();

    // Fetch the current poll
    const { data, error } = await supabase.from('polls').select('*').limit(1).single();

    if (error || !data) {
      console.error('Error fetching poll:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch poll.' }), { status: 500 });
    }

    // Add new option
    const updatedOptions = [...data.options, { text: optionText, points: 0 }];

    // Save the updated poll options
    const { error: updateError } = await supabase
      .from('polls')
      .update({ options: updatedOptions })
      .eq('id', data.id);

    if (updateError) {
      console.error('Error updating poll:', updateError);
      return new Response(JSON.stringify({ error: 'Failed to add option.' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Option added successfully.' }), { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error.' }), { status: 500 });
  }
}