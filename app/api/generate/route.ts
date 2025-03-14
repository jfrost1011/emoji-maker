import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      {
        input: {
          prompt,
          apply_watermark: false,
        },
      }
    );

    console.log('Replicate output:', output);

    // Handle ReadableStream output
    if (Array.isArray(output) && output[0] && output[0] instanceof ReadableStream) {
      const stream = output[0];
      const reader = stream.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      // Combine chunks into a single Uint8Array
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const combinedArray = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        combinedArray.set(chunk, offset);
        offset += chunk.length;
      }

      // Convert to base64
      const base64String = Buffer.from(combinedArray).toString('base64');
      const imageUrl = `data:image/png;base64,${base64String}`;

      console.log('Generated base64 image URL');
      return NextResponse.json({ imageUrl });
    }

    // Handle direct URL output (fallback)
    if (Array.isArray(output) && typeof output[0] === 'string') {
      const imageUrl = output[0];
      console.log('Direct image URL:', imageUrl);
      return NextResponse.json({ imageUrl });
    }

    throw new Error('Unexpected output format from Replicate API');

  } catch (error) {
    console.error('Error generating emoji:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate emoji' },
      { status: 500 }
    );
  }
} 