'use client';

import React, { useState } from 'react';

const kinkTags = [
  { id: 'anal', label: 'Anal Focus', promptAdd: 'detailed anal play, spreading ass, tight anus' },
  { id: 'rimming', label: 'Rimming', promptAdd: 'deep rimming, tongue on anus, ass eating' },
  { id: 'enema', label: 'Milk Enema', promptAdd: 'milk enema play, creamy white fluid expulsion, messy enema' },
  { id: 'food', label: 'Food Play', promptAdd: 'food play, creamy substances, milk and cream, messy food fetish' },
  { id: 'spreading', label: 'Spreading', promptAdd: 'ass spreading wide, cheeks pulled apart, exposed anus' },
  { id: 'messy', label: 'Messy/Creamy', promptAdd: 'messy creamy fluids, dripping, wet and glossy' },
];

export default function KinkImageGen() {
  const [prompt, setPrompt] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const getEnhancedPrompt = () => {
    let enhanced = prompt.trim();
    const selectedPromptAdds = selectedTags.map(id => 
      kinkTags.find(t => t.id === id)?.promptAdd || ''
    ).filter(Boolean).join(', ');

    if (selectedPromptAdds) enhanced = `${enhanced}, ${selectedPromptAdds}`;

    enhanced += ', photorealistic, highly detailed anatomy, sensual lighting, glossy skin, explicit adult consensual kink, 8k, sharp focus';

    return enhanced;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description');
      return;
    }

    setError('');
    setIsGenerating(true);
    setGeneratedImage(null);

    const finalPrompt = getEnhancedPrompt();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt, tags: selectedTags }),
      });

      const data = await response.json();
      setGeneratedImage(data.imageUrl || 'https://picsum.photos/1024/768?random=' + Date.now());
    } catch (err) {
      setError('Generation failed - check API setup');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8">KinkForge</h1>
        <p className="text-center text-zinc-400 mb-12">Consensual adult kink image generator</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Two fit women in yoga outfits, intense anal play..."
              className="w-full h-40 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-lg"
            />

            <div className="mt-6">
              <p className="text-sm mb-3">Kink Tags</p>
              <div className="flex flex-wrap gap-2">
                {kinkTags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-4 py-2 rounded-full text-sm border ${selectedTags.includes(tag.id) ? 'bg-white text-black' : 'bg-zinc-900 border-zinc-700'}`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="mt-8 w-full py-4 bg-white text-black font-bold rounded-xl"
            >
              {isGenerating ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
            {generatedImage ? (
              <img src={generatedImage} alt="Generated" className="max-h-full" />
            ) : (
              <p className="text-zinc-500">Image will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
