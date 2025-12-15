#!/bin/bash
# Update SSL certificates after renewal (called by certbot)
# This script is automatically run by the cron job set up in setup-ssl.sh

set -e

echo "Updating SSL certificates..."

# Get the first domain from certbot's renewed certificate
DOMAIN=$(ls -t /etc/letsencrypt/live/ | head -1)

# Copy renewed certificates
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ./nginx/ssl/
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ./nginx/ssl/

# Reload nginx
docker compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "SSL certificates updated and nginx reloaded"
