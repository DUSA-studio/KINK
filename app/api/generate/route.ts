import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, tags } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // === Black Forest Labs Flux API ===
    const API_KEY = process.env.AI_API_KEY || "bfl_XextsHdaBsh2LsFGjb7K87BI0a0Ttjf9";

    const response = await fetch('https://api.bfl.ml/v1/flux-pro', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        width: 1024,
        height: 768,
        steps: 28,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Flux API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return NextResponse.json({ 
      imageUrl: data.images?.[0]?.url || data.image_url || data.url,
      enhancedPrompt: prompt 
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
