"use client";

import React from 'react';
import { EmojiCard } from './EmojiCard';

// Interface for a single emoji item
interface Emoji {
  imageUrl: string;
  prompt: string;
  likes: number;
}

// Interface for the EmojiGrid props
interface EmojiGridProps {
  emojis: Emoji[];
  onLike: (index: number) => void;
  onDownload: (imageUrl: string) => void;
}

// EmojiGrid component that displays multiple EmojiCard components in a grid
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
          key={emoji.imageUrl}
          imageUrl={emoji.imageUrl}
          prompt={emoji.prompt}
          likes={emoji.likes}
          onLike={() => onLike(index)}
          onDownload={() => onDownload(emoji.imageUrl)}
        />
      ))}
    </div>
  );
} 