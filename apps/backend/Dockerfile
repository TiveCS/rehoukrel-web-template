# Production Dockerfile for Elysia Backend

# Base stage
FROM oven/bun:1.3.4-alpine AS base
WORKDIR /app

# Install dependencies stage
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Build stage (for TypeScript compilation if needed)
FROM base AS build
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
# TypeScript type checking
RUN bun run --bun tsc --noEmit

# Production stage
FROM base AS production
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 elysia && \
    chown -R elysia:nodejs /app

USER elysia

# Expose application port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun run --bun -e "fetch('http://localhost:8080').then(() => process.exit(0)).catch(() => process.exit(1))"

# Start the application
CMD ["bun", "run", "src/index.ts"]
