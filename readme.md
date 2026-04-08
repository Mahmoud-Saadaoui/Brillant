# Talent AI

An intelligent recruitment platform connecting candidates and recruiters with the help of AI.

## Overview

Talent AI is a fullstack application that allows candidates to create detailed profiles and recruiters to post job offers. The platform uses AI to match candidates' skills with companies' needs.

## Technologies

### Frontend
- **React 19** - UI Framework
- **Vite** - Build tool
- **TypeScript** - Static typing
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **React Hook Form** - Form management
- **i18next** - Internationalization (FR/EN)
- **Axios** - HTTP client
- **Tanstack Query** - Server state management

### Backend
- **Node.js + Express** - API Server
- **TypeScript** - Static typing
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Zod** - Data validation
- **Helmet** - HTTP security
- **Rate Limiting** - Abuse protection

## Project Structure

```
talent-ai/
├── frontend/
│   ├── src/
│   │   ├── app/          # Main configuration
│   │   ├── modules/      # Features (auth, home, profiles)
│   │   ├── shared/       # Shared components and utilities
│   │   └── i18n/         # Language configuration
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── modules/      # Routes, controllers, services
    │   ├── middlewares/  # Express middlewares
    │   ├── config/       # Prisma configuration, etc.
    │   └── types/        # TypeScript types
    ├── prisma/
    │   └── schema.prisma # Database schema
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Backend

1. Clone the project and navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend folder:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/talent_ai"
JWT_SECRET="your_jwt_secret_here"
CLIENT_URL="http://localhost:5173"
PORT=4000
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run server
```

The server starts on `http://localhost:4000`

### Frontend

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development client:
```bash
npm run client
```

The frontend starts on `http://localhost:5173`

## Available Scripts

### Backend
| Script | Description |
|--------|-------------|
| `npm run server` | Start in development mode with hot-reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Start production server |

### Frontend
| Script | Description |
|--------|-------------|
| `npm run client` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Features

### Authentication
- Registration (Candidate / Recruiter)
- Login with JWT
- Email verification
- Roles: CANDIDATE, RECRUITER, ADMIN

### Candidate Profiles
- Personal information
- Technical skills and soft skills
- Professional experience
- Education
- Languages
- CV (PDF)

### Recruiter Profiles
- Company information
- Description and industry
- Company size
- Website

## API Routes

| Method | Route | Description |
|---------|-------|-------------|
| GET | `/api/v1/health` | Check server status |
| POST | `/api/v1/auth/register` | Register |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/logout` | Logout |

## Author

**Saadaoui Mahmoud**

## License

ISC
