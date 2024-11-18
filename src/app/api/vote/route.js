import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'pollData.json');

export async function POST(req) {
  try {
    const { votes } = await req.json(); // Parse request body
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

    // Update points for each option
    data.options = data.options.map(option => {
      const vote = votes.find(v => v.optionText === option.text);
      if (vote) {
        option.points += vote.voteValue;
      }
      return option;
    });

    // Save updated data
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return new Response(JSON.stringify({ message: 'Vote submitted successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process vote.' }),
      { status: 500 }
    );
  }
}