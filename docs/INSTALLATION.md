# Installation Guide

This guide will help you set up the Resume Uploader project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git
- npm or yarn package manager

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd resume-uploader
```

## Step 2: Backend Setup

1. Navigate to the backend directory:

```bash
cd resumeuploaderexpressapi
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .envExample .env
```

4. Configure your `.env` file:

```
PORT=8000
DATABASE_URL=mongodb://localhost:27017/resumeuploader
```

5. Start MongoDB service:

```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo service mongod start
```

6. Start the backend server:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Step 3: Frontend Setup

1. Navigate to the frontend directory:

```bash
cd resumeuploaderreactjsui
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure your `.env` file:

```
REACT_APP_API_URL=http://localhost:8000
```

5. Start the frontend development server:

```bash
npm start
```

## Step 4: Verify Installation

1. Backend API should be running on `http://localhost:8000`
2. Frontend application should be running on `http://localhost:3000`
3. MongoDB should be running on `mongodb://localhost:27017`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB service is running
   - Check if the connection URL in `.env` is correct
   - Verify MongoDB is installed and accessible

2. **Port Already in Use**

   - Change the port number in `.env` file
   - Kill the process using the port:

     ```bash
     # Windows
     netstat -ano | findstr :8000
     taskkill /PID <PID> /F

     # macOS/Linux
     lsof -i :8000
     kill -9 <PID>
     ```

3. **Node Modules Issues**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

### Getting Help

If you encounter any issues not covered here:

1. Check the [GitHub Issues](https://github.com/your-repo/issues)
2. Create a new issue with detailed information about your problem
3. Include your operating system and Node.js version

## Next Steps

After successful installation:

1. Read the [Code Explanation](CODE_EXPLANATION.md) to understand the project structure
2. Check the [API Documentation](API_DOCUMENTATION.md) for available endpoints
3. Follow the [Deployment Guide](DEPLOYMENT.md) to deploy your application
