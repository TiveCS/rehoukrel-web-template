# Production Dockerfile for React Frontend (TanStack Start + Vite)

# Base stage
FROM oven/bun:1.3.4-alpine AS base
WORKDIR /app

# Install dependencies stage
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build stage
FROM base AS build
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the application
ENV NODE_ENV=production
RUN bun run build

# Production stage
FROM base AS production
WORKDIR /app

# Copy built output
# TanStack Start with Nitro creates .output directory
COPY --from=build /app/.output ./output
COPY --from=build /app/package.json ./

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 react && \
    chown -R react:nodejs /app

USER react

# Expose application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start the Nitro server
CMD ["bun", "run", ".output/server/index.mjs"]
