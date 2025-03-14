# Emoji Maker

A Next.js web application that generates custom emojis using AI. Built with modern web technologies and a beautiful, responsive UI.

## Features

- Generate custom emojis using AI with text prompts
- Modern, responsive UI built with Tailwind CSS and Shadcn/ui
- Real-time emoji generation with loading states
- Like and download generated emojis
- Grid layout for displaying generated emojis

## Tech Stack

- Next.js 15.2
- React
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Replicate AI API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/emoji-maker.git
cd emoji-maker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Replicate API key:
```bash
REPLICATE_API_TOKEN=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `REPLICATE_API_TOKEN`: Your Replicate API token (required)

## Usage

1. Enter a descriptive prompt for your desired emoji
2. Click "Generate" and wait for the AI to create your emoji
3. Like or download your generated emojis
4. View all your generated emojis in the grid layout

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
