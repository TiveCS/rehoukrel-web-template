# Rehoukrel Web Template - Project Guide

## 🔴 IMPORTANT: Read This First

**Before implementing ANY task, read `.claude/instructions.md`**

Key principles for working on this project:
- **ALWAYS ask for clarification** if anything is unclear or confusing
- **NEVER start coding** until you fully understand the requirements
- **USE AskUserQuestion tool** to present options when multiple approaches exist
- **VERIFY your understanding** before making changes
- **ASK questions** rather than making assumptions

This template is designed for flexibility - users may deploy projects separately, use different hosting, or customize the stack. Always confirm the user's specific use case before proceeding.

## Project Structure

This is a monorepo-like template with independent packages:

```
rehoukrel-web-template/
├── apps/
│   ├── backend/              # Backend API (Elysia + Bun + PostgreSQL)
│   └── web/                  # Frontend (React + TanStack Start + Vite)
└── .claude/                  # Claude Code automation
```

## Tech Stack

### Backend (elysia-template)
- **Runtime:** Bun 1.3.4
- **Framework:** Elysia 1.4.18
- **Database:** PostgreSQL with Drizzle ORM
- **Auth:** better-auth
- **Validation:** Zod
- **API Docs:** OpenAPI

### Frontend (react-template)
- **Framework:** React 19.2.1
- **Build Tool:** Vite 7.2.7
- **Router:** TanStack Router
- **SSR:** TanStack Start with Nitro
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI + shadcn/ui patterns
- **Code Quality:** Biome (linting & formatting)
- **Testing:** Vitest + Testing Library

## Development Workflow

### Initial Setup
1. Clone the repo
2. Run `/install` to install dependencies in both projects
3. Setup environment variables:
   - `apps/backend/.env` (database, auth secrets)
   - `apps/web/.env` (API URL)
4. Run database migrations: `/db-migrate`

### Daily Development
- Start dev servers: `/dev`
- Run tests: `/test`
- Check code quality: `/lint`

### Common Patterns

#### Backend (Elysia)
- **File Structure:** Domain-driven modules in `src/modules/`
- **Database:** Drizzle schemas in `src/infra/sql/schemas/`
- **Auth:** better-auth config in `src/infra/auth/`
- **API Routes:** Organized by module with OpenAPI docs

#### Frontend (React)
- **File Structure:** Feature-based in `src/routes/`
- **Components:** shadcn/ui in `src/components/ui/`
- **API Client:** Located in `src/api/`
- **Styling:** Tailwind with CSS-in-JS via @tailwindcss/vite

## Important Notes

1. **Independent Deployments:** Each project can be deployed separately
2. **No Shared Package:** Types are managed independently in each project
3. **Type Safety:** Consider using Elysia Eden for end-to-end type safety
4. **Database:** PostgreSQL required for backend (use Docker/Podman)

## Environment Variable Validation

Both projects use type-safe environment variable validation:

- **Backend:** Zod validation in `src/common/env.ts`
- **Frontend:** @t3-oss/env-core validation in `env.ts`

All environment variables are validated at startup. Missing or invalid values will throw errors with helpful messages.

## Deployment

See `DEPLOYMENT.md` for comprehensive deployment guides.

### Docker Deployment (Recommended)

Production-ready Dockerfiles and docker-compose.prod.yml provided:

```bash
# Build and start all services
docker compose -f docker-compose.prod.yml up -d --build

# Using the deployment script
./scripts/deploy.sh
```

### VPS Deployment with Nginx

Complete VPS setup with SSL:

```bash
# Setup SSL certificates
./scripts/setup-ssl.sh yourdomain.com api.yourdomain.com

# Deploy with Nginx reverse proxy
docker compose -f docker-compose.prod.yml --profile with-nginx up -d
```

### Individual Deployments

- **Backend:** Deploy as Bun runtime or Docker container (port 8080)
- **Frontend:** Deploy with Vite build + Nitro server (port 3000)

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs automatically on:
- Pull requests
- Pushes to main/develop branches

Checks performed:
- ✅ Type checking (TypeScript)
- ✅ Linting and formatting (Biome for frontend)
- ✅ Unit tests (Vitest/Bun test)
- ✅ Build validation
- ✅ Docker build test

## Available Commands

Use these slash commands:
- `/dev` - Start development servers
- `/install` - Install all dependencies
- `/test` - Run all tests
- `/lint` - Check code quality
- `/build` - Build for production
- `/db-migrate` - Run database migrations
- `/clean` - Clean build artifacts

## Production Features

### Included Services

The production stack includes:
- **Backend API** (Elysia + Bun)
- **Frontend** (React + TanStack Start)
- **PostgreSQL** (Database)
- **MinIO** (S3-compatible object storage)
- **Nginx** (Reverse proxy with SSL)

### Security Features

- ✅ SSL/TLS with Let's Encrypt
- ✅ Rate limiting
- ✅ Security headers (HSTS, XSS Protection, etc.)
- ✅ Non-root Docker users
- ✅ Environment variable validation
- ✅ CORS configuration
- ✅ Health checks

### Deployment Scripts

Located in `scripts/`:
- `deploy.sh` - Automated production deployment
- `setup-ssl.sh` - SSL certificate setup with Let's Encrypt
- `update-ssl.sh` - Auto-renewal hook for certificates

## File Structure

```
rehoukrel-web-template/
├── apps/
│   ├── backend/               # Elysia backend
│   │   ├── src/
│   │   │   ├── common/
│   │   │   │   └── env.ts    # Environment validation
│   │   │   ├── infra/        # Infrastructure (auth, db)
│   │   │   └── modules/      # Domain modules
│   │   ├── Dockerfile        # Production Dockerfile
│   │   └── docker-compose.yml # Development database
│   └── web/                   # React frontend
│       ├── src/
│       │   ├── routes/       # TanStack Router pages
│       │   ├── components/   # UI components
│       │   └── api/          # API clients
│       ├── env.ts            # Environment validation
│       └── Dockerfile        # Production Dockerfile
├── nginx/
│   └── nginx.conf            # Nginx configuration
├── scripts/
│   ├── deploy.sh             # Deployment script
│   ├── setup-ssl.sh          # SSL setup script
│   └── update-ssl.sh         # SSL renewal script
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions CI
├── .claude/
│   ├── commands/             # Slash commands
│   ├── docs/                 # Project documentation
│   ├── instructions.md       # Claude behavior rules
│   └── settings.json         # Hooks configuration
├── docker-compose.prod.yml   # Production stack
├── .env.prod.example         # Production env template
├── DEPLOYMENT.md             # Deployment guide
└── .gitignore                # Root gitignore
```
