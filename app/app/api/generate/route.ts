import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
    }

    // TODO: Replace this placeholder with real API call (Atlas Cloud or self-hosted Flux)
    // Example for real API:
    // const res = await fetch('YOUR_API_URL', { method: 'POST', body: JSON.stringify({ prompt }) });
    // const data = await res.json();

    // Mock for now
    await new Promise(r => setTimeout(r, 1000));

    return NextResponse.json({
      imageUrl: `https://picsum.photos/1024/768?random=${Date.now()}`,
      message: 'Placeholder - connect real generation API for actual images'
    });

  } catch (e) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
