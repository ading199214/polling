import fs from 'fs';
import path from 'path';

// Path to the JSON file storing poll data
const dataFilePath = path.join(process.cwd(), 'data', 'pollData.json');

export async function GET(req) {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch poll data.' }),
      { status: 500 }
    );
  }
}