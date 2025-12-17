# ViVi Laser App

## Overview
A React-based landing page for ViVi Laser clinic, featuring a modern design with Tailwind CSS and Vite as the build tool. The app includes a booking modal and chat widget powered by Mistral AI.

## Project Structure
- `src/` - Main source code
  - `App.tsx` - Main application component (refactored, ~300 lines)
  - `components/` - React components
    - `sections/` - Page section components (HeroSection, ServicesSection, TechnologySection, SpecialistsSection, FAQSection, ReviewsSection, LocationSection, Footer, MarqueeSection)
    - `ui/` - UI components (Header, FomoBanner, CityToast, MobileNav, ScrollTopButton)
    - `BookingModal.tsx` - Booking modal (lazy loaded)
    - `ChatWidget.tsx` - AI chat widget (lazy loaded)
  - `services/` - Services including Mistral AI integration
  - `assets/` - Images and static assets (logo.jpg, home.webp, etc.)
  - `constants.ts` - Application constants
  - `types.ts` - TypeScript type definitions
  - `index.css` - Global styles with optimized animations
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

## Performance Optimizations
- **Component Architecture**: Split into separate memoized components for optimal React rendering
- **Lazy Loading**: BookingModal and ChatWidget are lazy-loaded for faster initial page load
- **CSS Optimizations**:
  - GPU-accelerated animations using transform3d and will-change
  - CSS containment (contain: layout style) for isolated repaints
  - Reduced motion support for accessibility
  - Optimized transitions with cubic-bezier timing functions
- **React Optimizations**:
  - React.memo on all section and UI components
  - useCallback for stable callback references
  - useMemo for computed values
  - RequestAnimationFrame-based scroll handling

## Recent Changes
- December 2025:
  - Major architecture refactoring for Apple-like smoothness:
    - Split 966-line App.tsx into 14 separate components
    - Created sections/ and ui/ component directories
    - All components wrapped with React.memo
  - CSS animation overhaul:
    - Removed heavy blur effects and blob animations
    - Added GPU acceleration with will-change and transform3d
    - Implemented contain: layout for rendering isolation
    - Smoother transitions with cubic-bezier curves
  - Lazy loading for modals and chat widget
  - Configured for Replit environment (port 5000, allowedHosts enabled)
