"use client";

import { useState, useEffect } from 'react';
import { EmojiGrid } from "@/components/EmojiGrid";
import { EmojiForm } from "@/components/EmojiForm";

interface Emoji {
  id: string;
  imageUrl: string;
  prompt: string;
  likes: number;
}

export default function Home() {
  const [emojis, setEmojis] = useState<Emoji[]>(() => {
    if (typeof window !== 'undefined') {
      const savedEmojis = localStorage.getItem('emojis');
      return savedEmojis ? JSON.parse(savedEmojis) : [];
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('emojis', JSON.stringify(emojis));
  }, [emojis]);

  const handleGenerateEmoji = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Generating emoji with prompt:', prompt);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);

      if (!data.imageUrl) {
        throw new Error('No image URL returned from the API');
      }

      const newEmoji: Emoji = {
        id: crypto.randomUUID(),
        imageUrl: data.imageUrl,
        prompt,
        likes: 0
      };

      setEmojis(prev => [newEmoji, ...prev]);

    } catch (err) {
      console.error('Error generating emoji:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate emoji');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (index: number, isLiking: boolean) => {
    setEmojis(prev => prev.map((emoji, i) => 
      i === index ? { ...emoji, likes: emoji.likes + (isLiking ? 1 : -1) } : emoji
    ));
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'emoji.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading emoji:', err);
      setError('Failed to download emoji');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-4xl font-bold">Emoji Maker</h1>
          <p className="text-muted-foreground mt-2">Create custom emojis with AI</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-12">
          <EmojiForm onSubmit={handleGenerateEmoji} isLoading={isLoading} />
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        <EmojiGrid 
          emojis={emojis}
          onLike={handleLike}
          onDownload={handleDownload}
        />
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto py-6 px-4 text-center text-muted-foreground">
          <p>© 2024 Emoji Maker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}