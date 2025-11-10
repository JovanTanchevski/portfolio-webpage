# Portfolio Website

A modern, responsive portfolio website built with React, Vite, TypeScript, Tailwind CSS, and Three.js. Features an animated WebGL background, smooth section transitions, and an interactive FAQ chat system.

## Features

- **Modern Tech Stack**: React + Vite + TypeScript + Tailwind CSS
- **Animated Background**: Three.js WebGL background with fluid motion and mouse interaction
- **Responsive Design**: Fully mobile-friendly with collapsible sidebar
- **Section Navigation**: Home, Projects, Info, Contact, FAQ
- **FAQ Chat**: Interactive chat interface that queries backend for answers
- **Dark Theme**: Minimalist dark theme with monospaced font
- **GitHub Pages Ready**: Configured for easy deployment

## Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Three.js (@react-three/fiber, @react-three/drei)
- Font Awesome Icons

### Backend
- Node.js
- Express
- TypeScript
- CORS enabled

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults are provided):
```bash
cp .env.example .env
```

4. Start the development server (runs both frontend and backend):
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

### Development Scripts

- `npm run dev` - Run both frontend and backend concurrently
- `npm run dev:client` - Run only the frontend (Vite)
- `npm run dev:server` - Run only the backend (Express)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
portfolio/
├── server/                 # Backend Express server
│   ├── index.ts           # Express app setup
│   ├── routes/            # API routes
│   │   └── faq.ts        # FAQ endpoint
│   └── data/             # Static data
│       └── faqData.json  # FAQ questions and answers
├── src/
│   ├── features/         # Feature components
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── Info.tsx
│   │   ├── Contact.tsx
│   │   └── FAQ.tsx
│   ├── ui/              # UI components
│   │   ├── Sidebar.tsx
│   │   ├── Background.tsx
│   │   └── FAQChat.tsx
│   ├── lib/             # Utilities and types
│   │   └── types.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Configuration

### GitHub Pages Deployment

1. Update the `base` path in `vite.config.ts` to match your repository name:
```typescript
base: '/portfolio/', // Change to '/your-repo-name/' or '/' for custom domain
```

2. Build the project:
```bash
npm run build
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

**Note:** Make sure you have `gh-pages` installed and your repository is properly configured for GitHub Pages deployment.

### FAQ Data

Edit `server/data/faqData.json` to customize FAQ questions and answers.

### API Endpoint

The FAQ chat uses the `/api/ask` endpoint. Update the `VITE_API_URL` in `.env` if your backend is hosted elsewhere.

## Backend API

### POST /api/ask

Accepts a question and returns the best matching answer from the FAQ dataset.

**Request:**
```json
{
  "message": "Who are you?"
}
```

**Response:**
```json
{
  "answer": "I am a front-end developer born in 1999 in Bitola, Macedonia."
}
```

## Customization

- Update project data in `src/features/Projects.tsx`
- Modify personal information in `src/features/Info.tsx` and `src/features/Contact.tsx`
- Customize sidebar links in `src/ui/Sidebar.tsx`
- Adjust Three.js background animation in `src/ui/Background.tsx`
- Update FAQ data in `server/data/faqData.json`

## License

MIT

