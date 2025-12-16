# ViVi Laser App

## Overview
A React-based landing page for ViVi Laser clinic, featuring a modern design with Tailwind CSS and Vite as the build tool. The app includes a booking modal and chat widget powered by Mistral AI.

## Project Structure
- `src/` - Main source code
  - `App.tsx` - Main application component
  - `components/` - React components (BookingModal, ChatWidget)
  - `services/` - Services including Mistral AI integration
  - `assets/` - Images and static assets (logo.jpg, home.webp, etc.)
  - `constants.ts` - Application constants
  - `types.ts` - TypeScript type definitions
  - `vite-env.d.ts` - TypeScript declarations for image imports
- `vite.config.ts` - Vite configuration (port 5000, all hosts allowed)
- `postcss.config.js` - PostCSS configuration for Tailwind
- `tsconfig.json` - TypeScript configuration
- `public/` - Static assets including favicon

## Tech Stack
- React 18
- TypeScript
- Vite 6
- Tailwind CSS 4
- Lucide React (icons)
- Mistral AI (chat functionality via REST API)

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` to build for production
- Run `npm run preview` to preview the production build

## Environment Variables
- `MISTRAL_API_KEY` - API key for Mistral AI (optional, for chat functionality)

## Security Notes
- The chat widget uses Mistral AI. For production, the API key should be proxied through a backend service to avoid exposing it in the browser bundle. The current implementation is suitable for development/demo purposes. Without an API key, the chat gracefully shows a fallback message.

## Recent Changes
- December 2025: 
  - Replaced Google Gemini AI with Mistral AI for chat functionality
  - Major performance optimization:
    - Moved component-local state (activeCategory, activeFaq) into PageContent to enable effective memoization
    - Wrapped callbacks with useCallback for stable references
    - Improved scroll handler with refs to avoid unnecessary re-renders
    - Removed heavy blur effects (blur-[100px]) and replaced with static gradients
    - Disabled expensive blob animations
    - Replaced backdrop-filter elements with solid backgrounds
    - Added CSS containment (contain: paint) for better rendering performance
    - Slowed down remaining animations for smoother experience
    - Added reduced motion support for accessibility
  - Added favicon from logo.jpg
  - Updated header and footer to use the logo from assets
  - Configured for Replit environment (port 5000, allowedHosts enabled)
