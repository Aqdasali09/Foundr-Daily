# FoundrDaily Project Structure

## Overview
FoundrDaily is a Next.js application that displays daily updates from founders building amazing products. The project follows a clean, modular architecture with TypeScript and Tailwind CSS.

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage component
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   │   ├── PostCard.tsx  # Individual post card component
│   │   └── PostsList.tsx # List of post cards
│   └── layout/           # Layout-specific components
├── data/                 # Static data and mock data
│   └── posts.ts         # Sample posts data
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
│   └── utils/           # Utility functions
│       └── time.ts      # Time formatting utilities
├── types/               # TypeScript type definitions
│   └── post.ts         # Post interface
├── constants/           # Application constants
└── styles/             # Additional stylesheets
```

## Key Components

### PostCard Component
- Displays individual post with profile image, name, time, streak count
- Shows project name, one-liner description
- Interactive like, comment, and share buttons
- Responsive design with hover effects

### PostsList Component
- Renders a list of PostCard components
- Handles the layout and spacing of multiple posts

## Data Structure

### Post Interface
```typescript
interface Post {
  profileImg: string;
  oneLiner: string;
  projectName: string;
  projectUrl: string;
  personName: string;
  likeCount: number;
  commentCount: number;
  isLikedByMe: boolean;
  streakCount: number;
  title: string;
  time: string;
}
```

## Styling

### Color Palette
- **Sky Blue**: Primary brand color (#3b82f6)
- **Sky Blue Light**: Lighter variant (#60a5fa)
- **Flame Orange**: Accent color (#f97316)
- **Flame Orange Light**: Lighter variant (#fb923c)

### CSS Variables
Custom CSS variables are defined in `globals.css` for consistent theming across components.

## Development Workflow

### Commitizen Setup
The project uses Commitizen with Conventional Commits:
- `npm run commit` - Opens interactive commit prompt
- Commit messages are validated using commitlint
- Husky hooks enforce commit message format

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run commit` - Create commit with Commitizen

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Adding New Features

1. Create TypeScript interfaces in `src/types/`
2. Add utility functions in `src/lib/utils/`
3. Create components in `src/components/`
4. Add sample data in `src/data/`
5. Use `npm run commit` for conventional commits 