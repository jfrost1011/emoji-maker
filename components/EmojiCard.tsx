"use client";

import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Download, Heart, AlertCircle } from 'lucide-react';

// Interface for the emoji data
interface EmojiCardProps {
  imageUrl: string;
  prompt: string;
  likes?: number;
  onLike?: () => void;
  onDownload?: () => void;
}

// EmojiCard component that uses our Tailwind components
export function EmojiCard({ imageUrl, prompt, likes = 0, onLike, onDownload }: EmojiCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
    console.error('Failed to load image:', imageUrl);
  };

  return (
    <Card className="group relative overflow-hidden">
      <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-4">
            <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
            <p className="text-sm text-center text-muted-foreground">Failed to load emoji</p>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={prompt}
            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      
      {/* Overlay with actions */}
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="secondary"
          size="icon"
          onClick={onDownload}
          className="h-10 w-10"
          disabled={imageError}
        >
          <Download className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={onLike}
          className="h-10 w-10"
          disabled={imageError}
        >
          <Heart className="h-5 w-5" fill={likes > 0 ? "white" : "none"} />
        </Button>
      </div>

      {/* Footer with likes count */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-sm text-white">{likes} likes</p>
      </div>
    </Card>
  );
} 