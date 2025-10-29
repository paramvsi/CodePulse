# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CodePulse is a developer productivity companion built with Next.js 16, TypeScript, and Clerk authentication. The app tracks coding sessions, provides analytics, and features a demo mode for portfolio showcasing. It uses a service layer architecture with mock data providers that will be swapped for Supabase in Phase 2.

**Current Phase**: Phase 1 (MVP with mock data)
**Tech Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui + Clerk + Zustand + Recharts

## Development Commands

### Running the Application
```bash
# Development server (runs on port 3002)
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

### Environment Setup
Before running the app, create `.env.local` in the `codepulse/` directory:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

See `CLERK_SETUP.md` for detailed authentication setup instructions.

## Architecture & Code Organization

### Service Layer Pattern
The codebase follows a service layer architecture that abstracts data providers:

```
Data Flow:
Component → Custom Hook → Zustand Store → API Route → Service Interface → Mock/Supabase Provider
```

- **Components**: Never call APIs directly; use custom hooks
- **Stores** (`lib/stores/`): Zustand stores for global state (session, breaks)
- **API Routes** (`app/api/`): Next.js API routes call service interfaces
- **Services** (`lib/services/`): Business logic layer (placeholder for Phase 2)
- **Mock Providers** (`lib/api/mock/`): In-memory data providers (Phase 1)
- **Supabase Providers** (`lib/api/supabase/`): Real backend (Phase 2)

### Key Architectural Decisions

**Mock Data Services**: All data operations use mock services (`lib/api/mock/`) with in-memory storage. These implement the same interfaces that Supabase providers will use in Phase 2, enabling zero-UI-change data layer swaps.

**Zustand State Management**: Session and break state managed globally via Zustand stores. Session store handles timer state, active sessions, and persists to API on session end.

**Route Groups**:
- `(marketing)`: Public landing page
- `(dashboard)`: Protected authenticated routes
- `demo/`: Public demo mode with simulated data

**Middleware Authentication**: Clerk middleware (`src/middleware.ts`) protects all routes except `/`, `/demo`, `/sign-in`, and `/sign-up`. Note: Uses `middleware.ts` (not `proxy.ts`) because Clerk requires Edge runtime.

## Type System

### Core Types (`src/types/`)
- `session.ts`: Session, ActivityType, ProgrammingLanguage
- `analytics.ts`: Analytics data structures
- `break.ts`: Break tracking types
- `user.ts`: User preferences and settings

### Type Patterns
- Use literal union types for activity types and languages
- All dates stored as ISO 8601 strings
- IDs use format: `{type}_{timestamp}_{random}`

## Component Organization

### shadcn/ui Components (`components/ui/`)
Base UI primitives: Button, Card, Input, Dialog, Sonner (toast). Install new components with:
```bash
npx shadcn@latest add [component-name]
```

### Feature Components (`components/features/`)
Organized by domain:
- `session/`: Session controls, timers, language selectors
- `analytics/`: Charts, date ranges, heatmaps
- `breaks/`: Pomodoro settings, break overlays
- `dashboard/`: Main dashboard components
- `landing/`: Marketing page components
- `reports/`: Weekly reports, gauges

### Layout Components (`components/layout/`)
Shared layouts: Footer, navigation (to be implemented)

## State Management Patterns

### Zustand Stores
- **Session Store** (`lib/stores/session-store.ts`): Manages active session state, timer, and session metadata
- **Break Store** (`lib/stores/break-store.ts`): Manages break reminders and Pomodoro settings

### Store Usage Pattern
```typescript
// In a component
import { useSessionStore } from '@/lib/stores/session-store';

const { isActive, startSession, stopSession } = useSessionStore();
```

### Timer Implementation
Session timer updates every second via `updateElapsedTime()`. Components using timers should call this in a `useEffect` with 1-second interval when session is active.

## API Route Patterns

### Standard API Structure
```typescript
// app/api/[resource]/route.ts
export async function GET(request: Request) {
  // 1. Get user from Clerk auth
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  // 2. Call service layer
  const data = await service.getData(userId);

  // 3. Return response
  return Response.json(data);
}
```

### Current API Routes
- `POST /api/sessions`: Create new session
- `GET /api/sessions`: Get user's sessions
- `PATCH /api/sessions/[id]`: Update session
- `DELETE /api/sessions/[id]`: Delete session
- `GET /api/analytics`: Get analytics data with date range
- `GET /api/reports/weekly`: Get weekly report data

## Design System

### Color Tokens (Tailwind Config)
- **electric-indigo**: `#635BFF` - Primary actions, CTAs
- **soft-cyan**: `#35E2D1` - Accents, hover states
- **deep-space**: `#0E1116` - Background
- **graphite**: `#1A1D24` - Cards, surfaces
- **cloud-gray**: `#9BA1AB` - Secondary text
- **mint-green**: `#4ECDC4` - Success states
- **coral-red**: `#FF6B6B` - Errors, warnings
- **amber-warn**: `#FFD93D` - Warnings

### Typography
- **Inter**: UI text (sans-serif)
- **JetBrains Mono**: Timers, code elements (monospace)

### Animation Principles
- Pulse effects for active states (Electric Indigo glow)
- 0.25s-0.4s transitions for smooth interactions
- Framer Motion for complex animations
- Breathing circles for break reminders

## Development Workflow

### Adding New Features
1. Define types in `src/types/`
2. Create mock service in `lib/api/mock/`
3. Create API route in `app/api/`
4. Add Zustand store if global state needed
5. Build feature components in `components/features/`
6. Wire up in route page (`app/(dashboard)/[page]`)

### Mock Data Best Practices
- Use consistent ID format: `{type}_{timestamp}_{random}`
- Store dates as ISO 8601 strings
- Implement same interface as future Supabase service
- Include realistic data with variety for demo purposes

### Component Patterns
- Use Server Components by default
- Add `"use client"` only when needed (hooks, interactivity)
- Extract client logic to separate `-client.tsx` components
- Keep server components for layouts and data fetching

## Important Conventions

### File Naming
- Components: PascalCase (e.g., `SessionTimer.tsx`)
- Utilities/services: kebab-case (e.g., `session-service.ts`)
- Route groups: parentheses `(marketing)`
- Dynamic routes: brackets `[id]`

### Import Aliases
- Use `@/` for all src imports: `import { Button } from '@/components/ui/button'`
- Configured in `tsconfig.json` paths

### TypeScript
- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Prefer interfaces for object shapes
- Use `as const` for constant objects

## Phase 1 vs Phase 2 Considerations

When working on Phase 1 code:
- Mock services should mirror future Supabase interfaces
- Comment `// TODO: Replace with Supabase in Phase 2` where applicable
- Keep in-memory storage simple; no persistence needed
- Focus on UI/UX polish and functionality

Avoid in Phase 1:
- Real-time subscriptions (will use Supabase Realtime in Phase 2)
- Complex database queries
- Data persistence across server restarts
- Git history import (Phase 2 feature)

## Testing Strategy (Future)

Planned testing infrastructure:
- **Unit Tests**: Vitest for utilities and services
- **Integration Tests**: API route testing
- **E2E Tests**: Playwright for critical flows
- **Target Coverage**: 80%+ for business logic

## Common Patterns

### Protected Route Page
```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  return <YourComponent />;
}
```

### Client Component with Store
```typescript
"use client";

import { useSessionStore } from '@/lib/stores/session-store';

export function Component() {
  const { isActive, startSession } = useSessionStore();
  // Component logic
}
```

### API Error Handling
```typescript
try {
  const data = await service.getData(userId);
  return Response.json(data);
} catch (error) {
  console.error('Error:', error);
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

## Project Documentation

- **CodePulsePlan.md**: Detailed 3-phase development plan
- **CodePulse-Specs.md**: Product specifications and design system
- **CLERK_SETUP.md**: Authentication setup guide
- **.env.local.example**: Environment variable template
