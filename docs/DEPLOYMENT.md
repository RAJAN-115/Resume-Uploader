# Deployment Guide

This guide provides instructions for deploying the Resume Uploader application to various platforms.

## Prerequisites

Before deploying, ensure you have:

1. Git installed
2. Node.js and npm installed
3. MongoDB Atlas account (for cloud database)
4. Accounts for chosen deployment platforms

## Deployment Options

### 1. Frontend Deployment (React)

#### Option A: Vercel (Recommended)

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Navigate to frontend directory:

```bash
cd resumeuploaderreactjsui
```

3. Deploy:

```bash
vercel
```

4. Configure environment variables in Vercel dashboard:

```
REACT_APP_API_URL=https://your-backend-url.com
```

#### Option B: Netlify

1. Install Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Build the project:

```bash
npm run build
```

3. Deploy:

```bash
netlify deploy
```

4. Set environment variables in Netlify dashboard

### 2. Backend Deployment (Express)

#### Option A: Heroku

1. Install Heroku CLI:

```bash
npm install -g heroku
```

2. Login to Heroku:

```bash
heroku login
```

3. Create Heroku app:

```bash
heroku create your-app-name
```

4. Add MongoDB addon:

```bash
heroku addons:create mongolab
```

5. Set environment variables:

```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
```

6. Deploy:

```bash
git push heroku main
```

#### Option B: Railway

1. Install Railway CLI:

```bash
npm i -g @railway/cli
```

2. Login to Railway:

```bash
railway login
```

3. Initialize project:

```bash
railway init
```

4. Deploy:

```bash
railway up
```

### 3. Database Deployment (MongoDB)

#### MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create new cluster
3. Set up database user
4. Configure network access
5. Get connection string

Update backend `.env`:

```
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/resumeuploader
```

## Production Configuration

### 1. Environment Variables

Backend `.env`:

```
NODE_ENV=production
PORT=8000
DATABASE_URL=your-mongodb-url
JWT_SECRET=your-secret
CORS_ORIGIN=https://your-frontend-url.com
```

Frontend `.env`:

```
REACT_APP_API_URL=https://your-backend-url.com
```

### 2. Security Measures

1. Enable HTTPS
2. Set up CORS properly
3. Configure rate limiting
4. Enable security headers
5. Set up proper file upload restrictions

### 3. Performance Optimization

1. Enable compression
2. Set up caching
3. Configure CDN
4. Optimize images
5. Enable minification

## Monitoring and Maintenance

### 1. Logging

Set up logging service (e.g., Papertrail, Loggly):

```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

### 2. Error Tracking

Set up error tracking (e.g., Sentry):

```javascript
const Sentry = require('@sentry/node');
Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: 'production',
});
```

### 3. Performance Monitoring

Set up monitoring (e.g., New Relic, Datadog):

```javascript
require('newrelic');
```

## Backup and Recovery

### 1. Database Backups

Set up automated MongoDB backups:

```bash
# Using mongodump
mongodump --uri="your-mongodb-uri" --out=/backup/path

# Restore
mongorestore --uri="your-mongodb-uri" /backup/path
```

### 2. File Storage Backups

Set up cloud storage backup:

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Backup files
s3.upload({
  Bucket: 'your-bucket',
  Key: 'backup/file.pdf',
  Body: fileStream,
}).promise();
```

## Scaling

### 1. Horizontal Scaling

Set up load balancing:

```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  require('./app.js');
}
```

### 2. Caching

Implement Redis caching:

```javascript
const Redis = require('ioredis');
const redis = new Redis();

// Cache middleware
const cache = async (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = await redis.get(key);

  if (cachedResponse) {
    return res.json(JSON.parse(cachedResponse));
  }

  next();
};
```

## SSL/TLS Configuration

### 1. SSL Certificate

Obtain SSL certificate (e.g., Let's Encrypt):

```bash
certbot certonly --standalone -d your-domain.com
```

### 2. HTTPS Configuration

Configure Express for HTTPS:

```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('path/to/key.pem'),
  cert: fs.readFileSync('path/to/cert.pem'),
};

https.createServer(options, app).listen(443);
```

## Maintenance Mode

Implement maintenance mode:

```javascript
const maintenance = (req, res, next) => {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return res.status(503).json({
      error: 'System under maintenance',
    });
  }
  next();
};
```

## Rollback Procedure

1. Keep previous versions tagged in Git
2. Document database migration steps
3. Maintain backup before deployments
4. Test rollback procedures regularly

## Support and Monitoring

1. Set up uptime monitoring
2. Configure alert notifications
3. Document incident response procedures
4. Maintain deployment logs
