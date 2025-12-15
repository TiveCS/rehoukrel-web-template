# Rehoukrel Web Template

A production-ready, full-stack web application template with modern tooling, type safety, and deployment automation.

## ✨ Features

### Tech Stack
- **Backend:** Elysia + Bun + PostgreSQL + Drizzle ORM
- **Frontend:** React 19 + TanStack Start + Vite + Tailwind CSS
- **Auth:** better-auth with OAuth support (Google, GitHub)
- **Storage:** MinIO (S3-compatible object storage)
- **UI:** Radix UI + shadcn/ui patterns
- **Testing:** Vitest + Testing Library
- **Code Quality:** Biome (linting & formatting) + TypeScript

### Production Ready
- ✅ **Environment Validation** - Type-safe env vars with Zod
- ✅ **Docker Support** - Production Dockerfiles for both projects
- ✅ **CI/CD** - GitHub Actions with automated testing
- ✅ **SSL/HTTPS** - Let's Encrypt integration with auto-renewal
- ✅ **Reverse Proxy** - Nginx with security headers and rate limiting
- ✅ **Deployment Scripts** - One-command production deployment
- ✅ **Health Checks** - Container health monitoring
- ✅ **Security** - Non-root containers, CORS, CSP headers

### Developer Experience
- 🎯 **Type Safety** - End-to-end TypeScript
- 🔄 **Hot Reload** - Instant feedback during development
- 📝 **Claude Code Integration** - AI-powered development assistance
- 🎨 **Modern UI** - Pre-configured component library
- 🧪 **Testing Setup** - Unit and integration testing ready
- 📚 **Comprehensive Docs** - Deployment guides and examples

## 🚀 Quick Start

### Development

1. **Install dependencies**
   ```bash
   # Install Claude Code (if not already installed)
   # Then use slash command:
   /install

   # Or manually:
   cd apps/backend && bun install
   cd apps/web && bun install
   ```

2. **Setup environment variables**
   ```bash
   # Backend
   cd apps/backend
   cp .env.example .env
   # Edit .env with your values

   # Frontend
   cd apps/web
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Start development services**
   ```bash
   # Start database and MinIO
   cd apps/backend
   docker compose up -d

   # Run migrations
   bun run db:push

   # Start dev servers (both backend and frontend)
   /dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - MinIO Console: http://localhost:9001

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guides.

**Quick Docker deployment:**
```bash
# Setup production environment
cp .env.prod.example .env.prod
# Edit .env.prod with your production values

# Deploy full stack
docker compose -f docker-compose.prod.yml up -d --build
```

**VPS deployment with SSL:**
```bash
# Setup SSL certificates
./scripts/setup-ssl.sh yourdomain.com api.yourdomain.com

# Deploy with Nginx
docker compose -f docker-compose.prod.yml --profile with-nginx up -d
```

## 📁 Project Structure

```
rehoukrel-web-template/
├── apps/
│   ├── backend/          # Elysia backend API
│   └── web/              # React frontend
├── nginx/                # Nginx configuration
├── scripts/              # Deployment scripts
├── .claude/              # Claude Code automation
├── .github/workflows/    # CI/CD pipelines
└── docker-compose.prod.yml
```

## 🛠️ Available Commands

### Claude Code Slash Commands
- `/dev` - Start development servers
- `/install` - Install all dependencies
- `/test` - Run all tests
- `/lint` - Check code quality
- `/build` - Build for production
- `/db-migrate` - Run database migrations
- `/clean` - Clean build artifacts

### Manual Commands

**Backend:**
```bash
bun run dev              # Start dev server
bun test                 # Run tests
bun run db:generate      # Generate migrations
bun run db:push          # Apply migrations
```

**Frontend:**
```bash
bun run dev              # Start dev server
bun run build            # Build for production
bun run check            # Lint and format
bun test                 # Run tests
```

## 🔒 Environment Variables

### Backend Required
- `PORT` - Server port (default: 8080)
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Auth secret (32+ chars)
- `BETTER_AUTH_URL` - Backend URL
- `FRONTEND_URL` - Frontend URL (for CORS)

### Frontend Required
- `VITE_BACKEND_URL` - Backend API URL

See `.env.example` files in each directory for complete variable lists.

## 🧪 Testing

```bash
# Run all tests
/test

# Backend tests only
cd apps/backend && bun test

# Frontend tests only
cd apps/web && bun test
```

## 🚢 CI/CD

GitHub Actions workflow automatically runs on:
- Pull requests
- Pushes to main/develop

Checks include:
- TypeScript type checking
- Linting and formatting
- Unit tests
- Build validation
- Docker build test

## 📖 Documentation

- **[Deployment Guide](./DEPLOYMENT.md)** - Complete deployment instructions
- **[Project Guide](./.claude/docs/project-guide.md)** - Architecture and patterns
- **[Claude Instructions](./.claude/instructions.md)** - AI assistant behavior rules

## 🔐 Security

- Environment variable validation
- SSL/TLS with Let's Encrypt
- Security headers (HSTS, CSP, X-Frame-Options)
- Rate limiting
- CORS configuration
- Non-root Docker containers
- Regular dependency updates

## 🤝 Contributing

This is a template repository. To use it:

1. Click "Use this template" on GitHub
2. Clone your new repository
3. Customize for your needs
4. Deploy!

## 📝 License

MIT License - feel free to use this template for any project.

## 🙏 Acknowledgments

Built with:
- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Elysia](https://elysiajs.com/) - Ergonomic web framework
- [React](https://react.dev/) - UI library
- [TanStack](https://tanstack.com/) - Routing and state management
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Unstyled accessible components

---

**Need help?** Check the documentation in `.claude/docs/` or open an issue.
