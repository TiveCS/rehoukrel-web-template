# Deployment Guide

This guide covers deploying your full-stack application to a VPS or containerized environment.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
  - [Docker Compose Deployment](#docker-compose-deployment)
  - [VPS Deployment with Nginx](#vps-deployment-with-nginx)
- [SSL Configuration](#ssl-configuration)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker and Docker Compose installed
- Domain name (for SSL)
- VPS with Ubuntu 20.04+ (for VPS deployment)
- SSH access to your VPS

## Local Development

Start development servers:
```bash
# Using Claude Code slash command
/dev

# Or manually:
cd apps/backend && bun run dev
cd apps/web && bun run dev
```

## Production Deployment

### Docker Compose Deployment

1. **Prepare environment variables**
   ```bash
   cp .env.prod.example .env.prod
   # Edit .env.prod with your production values
   nano .env.prod
   ```

2. **Build and start services**
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

3. **Check service status**
   ```bash
   docker compose -f docker-compose.prod.yml ps
   docker compose -f docker-compose.prod.yml logs -f
   ```

4. **Run database migrations**
   ```bash
   docker compose -f docker-compose.prod.yml exec backend bun run db:push
   ```

### VPS Deployment with Nginx

#### Initial Setup

1. **Connect to your VPS**
   ```bash
   ssh user@your-vps-ip
   ```

2. **Install Docker and Docker Compose**
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose

   # Log out and back in for group changes to take effect
   ```

3. **Clone your repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

4. **Configure environment**
   ```bash
   cp .env.prod.example .env.prod
   nano .env.prod
   # Fill in your production values
   ```

#### SSL Configuration

1. **Setup SSL certificates with Let's Encrypt**
   ```bash
   # Make sure you've pointed your domain DNS to your VPS IP first
   chmod +x scripts/setup-ssl.sh
   ./scripts/setup-ssl.sh yourdomain.com api.yourdomain.com
   ```

2. **Update Nginx configuration**
   ```bash
   nano nginx/nginx.conf
   # Replace 'yourdomain.com' and 'api.yourdomain.com' with your actual domains
   ```

3. **Start services with Nginx**
   ```bash
   docker compose -f docker-compose.prod.yml --profile with-nginx up -d
   ```

#### Automated Deployment

Use the deployment script for future updates:
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## SSL Configuration

### Manual SSL Setup

If you prefer manual SSL setup:

1. **Generate certificates**
   ```bash
   sudo certbot certonly --standalone -d yourdomain.com -d api.yourdomain.com
   ```

2. **Copy certificates**
   ```bash
   sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
   sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/
   ```

3. **Set up auto-renewal**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

### SSL Certificate Renewal

Certificates auto-renew via cron job. To manually renew:
```bash
sudo certbot renew
./scripts/update-ssl.sh
```

## Environment Variables

### Backend (.env)
```bash
PORT=8080
FRONTEND_URL=https://yourdomain.com
DATABASE_URL=postgresql://user:pass@localhost:5432/db
BETTER_AUTH_SECRET=<32-char-secret>
BETTER_AUTH_URL=https://api.yourdomain.com
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=<secure-password>
```

### Frontend (.env)
```bash
VITE_BACKEND_URL=https://api.yourdomain.com
```

### Production (.env.prod)
See `.env.prod.example` for all variables.

## Useful Commands

### Service Management
```bash
# View logs
docker compose -f docker-compose.prod.yml logs -f [service-name]

# Restart a service
docker compose -f docker-compose.prod.yml restart [service-name]

# Stop all services
docker compose -f docker-compose.prod.yml down

# Remove everything including volumes
docker compose -f docker-compose.prod.yml down -v
```

### Database Operations
```bash
# Connect to database
docker compose -f docker-compose.prod.yml exec database psql -U postgres -d mydatabase

# Backup database
docker compose -f docker-compose.prod.yml exec database pg_dump -U postgres mydatabase > backup.sql

# Restore database
cat backup.sql | docker compose -f docker-compose.prod.yml exec -T database psql -U postgres mydatabase
```

### MinIO Operations
```bash
# Access MinIO console
# Open http://your-vps-ip:9001 in browser

# Create bucket via CLI
docker compose -f docker-compose.prod.yml exec minio mc mb /data/uploads
```

## Troubleshooting

### Services won't start
```bash
# Check logs
docker compose -f docker-compose.prod.yml logs

# Check service health
docker compose -f docker-compose.prod.yml ps
```

### SSL issues
```bash
# Test SSL
openssl s_client -connect yourdomain.com:443

# Check certificate expiry
echo | openssl s_client -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Database connection issues
```bash
# Check if database is running
docker compose -f docker-compose.prod.yml exec database pg_isready

# Test connection
docker compose -f docker-compose.prod.yml exec backend bun run -e "console.log(process.env.DATABASE_URL)"
```

### Frontend can't reach backend
1. Check CORS settings in backend
2. Verify `VITE_BACKEND_URL` in frontend env
3. Check Nginx configuration
4. Verify firewall rules allow traffic on ports 80 and 443

## Security Checklist

- [ ] Change all default passwords in `.env.prod`
- [ ] Generate secure `BETTER_AUTH_SECRET` (32+ chars)
- [ ] Set up firewall (UFW):
  ```bash
  sudo ufw allow 22/tcp
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw enable
  ```
- [ ] Configure fail2ban for SSH protection
- [ ] Enable automatic security updates
- [ ] Regular database backups
- [ ] Monitor logs for suspicious activity

## Performance Optimization

- Enable Nginx caching for static assets
- Use CDN for frontend assets
- Configure database connection pooling
- Set up monitoring (Prometheus + Grafana)
- Implement Redis for session storage

## Monitoring

Consider adding:
- Uptime monitoring (UptimeRobot, Pingdom)
- Error tracking (Sentry)
- Analytics (Plausible, Umami)
- Server monitoring (Netdata, Prometheus)

## Support

For issues or questions, refer to:
- Backend docs: `apps/backend/README.md`
- Frontend docs: `apps/web/README.md`
- Project documentation: `.claude/docs/project-guide.md`
