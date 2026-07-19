import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    console.log('Prompt received:', prompt);

    // Hardcoded test - always try Flux
    const API_KEY = "bfl_XextsHdaBsh2LsFGjb7K87BI0a0Ttjf9";

    const response = await fetch('https://api.bfl.ml/v1/flux-pro', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt || "two women in yoga outfits intense anal play",
        width: 1024,
        height: 768,
      }),
    });

    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { raw };
    }

    return NextResponse.json({ 
      imageUrl: data.images?.[0]?.url || 'https://picsum.photos/1024/768',
      status: response.status,
      data 
    });

  } catch (e) {
    return NextResponse.json({ error: e.message, imageUrl: 'https://picsum.photos/1024/768' });
  }
}
