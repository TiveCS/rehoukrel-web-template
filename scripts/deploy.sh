#!/bin/bash
# Production deployment script for VPS
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.prod exists
if [ ! -f ".env.prod" ]; then
    echo -e "${RED}Error: .env.prod file not found!${NC}"
    echo "Please copy .env.prod.example to .env.prod and fill in your values."
    exit 1
fi

# Load environment variables
export $(grep -v '^#' .env.prod | xargs)

echo -e "${YELLOW}Pulling latest changes...${NC}"
git pull origin main

echo -e "${YELLOW}Building Docker images...${NC}"
docker compose -f docker-compose.prod.yml build

echo -e "${YELLOW}Stopping old containers...${NC}"
docker compose -f docker-compose.prod.yml down

echo -e "${YELLOW}Starting new containers...${NC}"
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d

echo -e "${YELLOW}Running database migrations...${NC}"
docker compose -f docker-compose.prod.yml exec backend bun run db:push

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Services status:"
docker compose -f docker-compose.prod.yml ps

echo ""
echo -e "${GREEN}🎉 Your application is now running!${NC}"
echo "Frontend: https://yourdomain.com"
echo "Backend API: https://api.yourdomain.com"
