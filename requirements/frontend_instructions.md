# Project overview
Use this guide to build a web app where users can give a text prompt to generate emoji using model hosted on Replicate.

# Feature requirements
We will use Next.js, Shadcn, Lucid, Supabase, Clerk
Create a forum where users can put in prompt, and clicking on button that calls the replicate model to generate emoji
Have a nice UI and animation when the emoji is blank or generating
Display all the images ever generated in grid
When hover each emoji img, an icon button for download, and an icon button for like should be shown up

# UI Reference
The app should follow a similar style to these tech company tiger emojis:
- Clean, flat design
- Consistent size and padding
- Hover effects for interactions
- Clear grid layout
- Minimal, modern aesthetic

![Tech Company Tiger Emojis Reference](../public/tiger-emojis-reference.png)

# Relevant docs
Set the REPLICATE_API_TOKEN environment variable

export REPLICATE_API_TOKEN=r8_0v1**********************************

Visibility

Copy
Learn more about authentication

Install Replicate's Node.js client library

npm install replicate

Copy
Learn more about setup
Run fofr/sdxl-emoji using Replicate's API. Check out the model's schema for an overview of inputs and outputs.

import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "A TOK emoji of a man",
    apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });

import { writeFile } from "node:fs/promises";
for (const [index, item] of Object.entries(output)) {
  await writeFile(`output_${index}.png`, item);
}
//=> output_0.png written to disk

# Current File structure

# Emoji Maker Project Structure

```
emoji-maker/
├── .next/                  # Next.js build output
├── app/                    # Next.js app directory
│   ├── page.tsx            # Home page component
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── favicon.ico         # Site favicon
├── components/             # React components
│   ├── EmojiCard.tsx       # Card component for displaying emojis
│   ├── EmojiForm.tsx       # Form for creating/editing emojis
│   ├── EmojiGrid.tsx       # Grid layout for emoji cards
│   └── ui/                 # UI component library
├── lib/                    # Utility functions and shared code
├── public/                 # Static assets
├── node_modules/           # Dependencies
├── requirements/           # Project requirements and documentation
│   └── frontend_instructions.md  # Frontend documentation
├── .git/                   # Git repository data
├── .gitignore              # Git ignore file
├── components.json         # UI components configuration
├── eslint.config.mjs       # ESLint configuration
├── next-env.d.ts           # Next.js TypeScript declarations
├── next.config.ts          # Next.js configuration
├── package-lock.json       # NPM lock file
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project readme
└── tsconfig.json           # TypeScript configuration
```

This ASCII tree represents the current structure of the Emoji Maker project, showing all major directories and files.

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified
- All new pages go in /app
