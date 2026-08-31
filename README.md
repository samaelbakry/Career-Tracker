# Career Tracker

A full-featured job marketplace platform that connects job seekers with employers. The platform streamlines the hiring process with job posting, application tracking, and candidate management tools.

## Overview

Career Tracker is a dual-sided platform serving two distinct user roles:

- **Job Seekers**: Search for opportunities, apply to positions, track applications, and manage interviews
- **Employers**: Post job openings, review applications, manage the hiring pipeline, and explore candidates

## Features

### For Job Seekers

- Search and filter job opportunities by location, salary, experience level, and employment type
- Apply to positions with resume and cover letter
- Track application status across all submitted applications
- Save jobs for later review
- Manage interview schedules and details
- Explore company profiles and career pages
- Centralized dashboard showing all applications and saved jobs

### For Employers

- Create and manage job listings
- Review and filter applications from candidates
- Manage candidate pipeline across multiple interview stages
- View detailed candidate profiles
- Explore other companies on the platform
- Track open positions and hiring progress

## Tech Stack

### Frontend

- Next.js 16.2.11 - React framework with SSR
- React 19.2.4 - UI library
- TypeScript 5 - Type safety
- Tailwind CSS 4 - Styling
- shadcn/ui - Component library

### State Management & Data

- Redux Toolkit 2.12.0 - Application state
- React Redux 9.3.0 - React integration
- React Query 5.101.4 - Server state
- React Hook Form 7.82.0 - Form management
- Zod 4.4.3 - Schema validation

### Backend

- Supabase - Database and authentication
- PostgreSQL - Data storage

### UI Components

- Lucide React - Icons
- Sonner - Toast notifications
- Base UI - Component library

## Project Structure

```
careertracker/
├── app/                     # Next.js app router
│   ├── (auth)/             # Authentication routes
│   ├── (screens)/          # Protected application routes
│   │   ├── employer/       # Employer features
│   │   └── jobSeeker/      # Job seeker features
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── companies/
│   ├── dashboard/
│   ├── jobs/
│   ├── search/
│   ├── shared/
│   ├── skeletons/
│   └── ui/                # shadcn/ui components
├── constants/             # App constants
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and config
├── providers/             # Context providers
├── schemas/               # Zod validation schemas
├── services/              # API layer
├── store/                 # Redux store
├── types/                 # TypeScript types
└── public/               # Static assets
```

