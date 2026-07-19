import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
    }

    // Placeholder - replace with real API
    await new Promise(r => setTimeout(r, 1000));

    return NextResponse.json({
      imageUrl: `https://picsum.photos/1024/768?random=${Date.now()}`,
      message: 'Placeholder - connect real API for actual generations'
    });

  } catch (e) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
