import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const FAL_KEY = "4a39ae4c-2970-4711-b99c-94fbbf4acbaa:f5803130ce7fc34e17f11b87e7202b5";

    const response = await fetch('https://fal.run/black-forest-labs/flux-pro', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        image_size: "landscape_16_9",
        num_inference_steps: 28,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`fal.ai error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return NextResponse.json({ 
      imageUrl: data.images[0].url 
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
