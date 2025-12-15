#!/bin/bash
# SSL Certificate Setup with Let's Encrypt
# Usage: ./scripts/setup-ssl.sh yourdomain.com api.yourdomain.com

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo -e "${RED}Certbot is not installed!${NC}"
    echo "Installing certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot
fi

# Get domains from arguments
DOMAINS="$@"

if [ -z "$DOMAINS" ]; then
    echo -e "${RED}Error: No domains specified${NC}"
    echo "Usage: $0 domain1.com domain2.com"
    exit 1
fi

echo -e "${YELLOW}Setting up SSL certificates for: $DOMAINS${NC}"

# Build domain arguments for certbot
DOMAIN_ARGS=""
for domain in $DOMAINS; do
    DOMAIN_ARGS="$DOMAIN_ARGS -d $domain"
done

# Stop nginx if running
echo -e "${YELLOW}Stopping nginx...${NC}"
docker compose -f docker-compose.prod.yml stop nginx || true

# Obtain certificates
echo -e "${YELLOW}Obtaining SSL certificates...${NC}"
sudo certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email admin@${DOMAINS%% *} \
    $DOMAIN_ARGS

# Copy certificates to nginx directory
echo -e "${YELLOW}Copying certificates to nginx directory...${NC}"
sudo mkdir -p ./nginx/ssl
sudo cp /etc/letsencrypt/live/${DOMAINS%% *}/fullchain.pem ./nginx/ssl/
sudo cp /etc/letsencrypt/live/${DOMAINS%% *}/privkey.pem ./nginx/ssl/
sudo chown -R $USER:$USER ./nginx/ssl/
sudo chmod 644 ./nginx/ssl/*.pem

# Set up auto-renewal
echo -e "${YELLOW}Setting up auto-renewal...${NC}"
(crontab -l 2>/dev/null || true; echo "0 12 * * * /usr/bin/certbot renew --quiet --deploy-hook './scripts/update-ssl.sh'") | crontab -

echo -e "${GREEN}✅ SSL certificates installed successfully!${NC}"
echo ""
echo "Certificates location: ./nginx/ssl/"
echo "Auto-renewal configured to run daily at 12:00 PM"
echo ""
echo "Now update nginx/nginx.conf with your actual domain names and restart nginx:"
echo "docker compose -f docker-compose.prod.yml up -d nginx"
