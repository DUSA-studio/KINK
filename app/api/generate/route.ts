import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    // Force real Flux call
    const API_KEY = "bfl_XextsHdaBsh2LsFGjb7K87BI0a0Ttjf9";

    const response = await fetch('https://api.bfl.ml/v1/flux-pro', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt || "test image",
        width: 1024,
        height: 768,
      }),
    });

    const data = await response.json();

    return NextResponse.json({ 
      imageUrl: data.images?.[0]?.url || 'https://picsum.photos/1024/768',
      raw: data 
    });

  } catch (e) {
    return NextResponse.json({ error: e.message, imageUrl: 'https://picsum.photos/1024/768' });
  }
}
