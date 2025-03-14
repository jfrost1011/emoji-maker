"use client";

import React from 'react';
import { EmojiCard } from './EmojiCard';

interface Emoji {
  id: string;
  imageUrl: string;
  prompt: string;
  likes: number;
}

interface EmojiGridProps {
  emojis: Emoji[];
  onLike: (index: number, isLiking: boolean) => void;
  onDownload: (imageUrl: string) => void;
}

export function EmojiGrid({ emojis, onLike, onDownload }: EmojiGridProps) {
  if (emojis.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No emojis generated yet. Enter a prompt above to create one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {emojis.map((emoji, index) => (
        <EmojiCard
          key={emoji.id}
          id={emoji.id}
          imageUrl={emoji.imageUrl}
          prompt={emoji.prompt}
          likes={emoji.likes}
          onLike={(isLiking) => onLike(index, isLiking)}
          onDownload={() => onDownload(emoji.imageUrl)}
        />
      ))}
    </div>
  );
}