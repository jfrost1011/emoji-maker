"use client";

import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Download, Heart, AlertCircle, Loader2 } from 'lucide-react';

interface EmojiCardProps {
  imageUrl: string;
  prompt: string;
  likes?: number;
  onLike?: (isLiking: boolean) => void;
  onDownload?: () => void;
  id: string;
}

export function EmojiCard({ imageUrl, prompt, likes = 0, onLike, onDownload, id }: EmojiCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window !== 'undefined') {
      const likedEmojis = JSON.parse(localStorage.getItem('likedEmojis') || '{}');
      return !!likedEmojis[id];
    }
    return false;
  });

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
    console.error('Failed to load image:', imageUrl);
  };

  const handleLikeClick = () => {
    const likedEmojis = JSON.parse(localStorage.getItem('likedEmojis') || '{}');
    if (isLiked) {
      delete likedEmojis[id];
    } else {
      likedEmojis[id] = true;
    }
    localStorage.setItem('likedEmojis', JSON.stringify(likedEmojis));
    
    setIsLiked(!isLiked);
    onLike?.(!isLiked);
  };

  const handleDownloadClick = async () => {
    if (!isDownloading) {
      setIsDownloading(true);
      try {
        await onDownload?.();
      } finally {
        setIsDownloading(false);
      }
    }
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
            className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-110 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-all duration-200 group-hover:opacity-100">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleDownloadClick}
          className={`h-10 w-10 transition-transform duration-200 ${isDownloading ? 'scale-95' : 'hover:scale-110'}`}
          disabled={imageError || isDownloading}
        >
          {isDownloading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Download className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleLikeClick}
          className={`h-10 w-10 transition-all duration-200 ${isLiked ? 'bg-red-500 hover:bg-red-600' : ''} ${!isLiked ? 'hover:scale-110' : ''}`}
          disabled={imageError}
        >
          <Heart 
            className={`h-5 w-5 transition-colors duration-200 ${isLiked ? 'text-white' : ''}`} 
            fill={isLiked ? "currentColor" : "none"} 
          />
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-sm text-white flex items-center gap-1">
          <Heart className="h-4 w-4" fill={likes > 0 ? "currentColor" : "none"} />
          <span className="transition-all duration-200">{likes} {likes === 1 ? 'like' : 'likes'}</span>
        </p>
      </div>
    </Card>
  );
}