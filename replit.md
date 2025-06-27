# Z-Score Calculator

## Overview

This is a full-stack web application for calculating z-scores, built with a modern TypeScript stack. The application allows users to input their result, program mean, and standard deviation to calculate how many standard deviations their result is from the mean. It features a clean, responsive UI with comprehensive validation and user feedback.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with Tailwind CSS for styling
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for bundling server code

### Data Storage
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definition in `shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations
- **Development Storage**: In-memory storage implementation for development

## Key Components

### Database Schema
- **Users Table**: Basic user authentication structure with username/password
- **Validation**: Zod schemas for runtime type checking
- **Type Safety**: Full TypeScript integration with Drizzle

### Frontend Components
- **Home Page**: Main z-score calculator interface with form validation
- **UI Components**: Comprehensive Radix UI component library (cards, inputs, buttons, tooltips, etc.)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Toast notifications for user feedback
- **Accessibility**: Full keyboard navigation and screen reader support

### Backend Components
- **Express Server**: RESTful API structure with middleware for logging
- **Route Registration**: Modular route handling system
- **Storage Interface**: Abstract storage layer supporting both in-memory and database implementations
- **Error Handling**: Centralized error handling middleware

## Data Flow

1. **User Input**: User enters values in the z-score calculator form
2. **Client Validation**: React Hook Form with Zod schemas validates input
3. **Calculation**: Z-score calculation performed client-side with mathematical interpretation
4. **Results Display**: Formatted results with color-coded interpretation and tooltips
5. **API Communication**: TanStack Query manages server state and caching
6. **Database Operations**: Drizzle ORM handles type-safe database interactions

## External Dependencies

### Frontend Dependencies
- **@radix-ui/***: Accessible UI primitive components
- **@tanstack/react-query**: Server state management
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router
- **react-hook-form**: Performant form library
- **zod**: Runtime type validation

### Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe ORM
- **@neondatabase/serverless**: PostgreSQL client for serverless environments
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development
- **Environment**: Replit with Node.js 20, PostgreSQL 16
- **Hot Reload**: Vite HMR for frontend, tsx for backend
- **Port Configuration**: Frontend served on port 5000
- **Database**: PostgreSQL via Replit's managed database service

### Production
- **Build Process**: 
  1. Vite builds optimized frontend bundle
  2. esbuild bundles server code for Node.js
- **Deployment Target**: Replit Autoscale
- **Static Assets**: Frontend built to `dist/public`
- **Server Bundle**: Backend built to `dist/index.js`

### Environment Configuration
- **Database URL**: Configured via `DATABASE_URL` environment variable
- **Build Commands**: Separate build steps for client and server
- **Start Command**: Production server runs bundled JavaScript

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```