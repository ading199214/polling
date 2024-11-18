import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'pollData.json');

export async function POST(req) {
  try {
    const { optionText } = await req.json(); // Parse request body
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

    // Add the new option
    data.options.push({ text: optionText, points: 0 });

    // Save updated data
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return new Response(JSON.stringify({ message: 'Option added successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to add option.' }),
      { status: 500 }
    );
  }
}