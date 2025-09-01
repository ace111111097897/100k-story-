# Setup Guide

## Fixing the Convex Configuration Error

The error you're seeing is because Convex isn't properly configured. Here's how to fix it:

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set up Convex
```bash
npx convex dev
```

This command will:
- Create a `.env.local` file with your Convex deployment URL
- Set up authentication
- Start the Convex development server

### Step 3: Start the Development Server
In a new terminal, run:
```bash
npm run dev
```

This will start both the frontend and backend servers.

### Alternative: Manual Setup

If the automatic setup doesn't work, you can manually create a `.env.local` file in the root directory with:

```
VITE_CONVEX_URL=your_convex_deployment_url_here
```

### Troubleshooting

1. **If you get permission errors**: Make sure you have Node.js and npm installed
2. **If the .env.local file isn't created**: Try running `npx @convex-dev/auth --skip-git-check`
3. **If you still get the error**: Make sure both `convex dev` and `npm run dev` are running simultaneously

### Production Deployment

For production, you'll need to:
1. Deploy your Convex functions: `npx convex deploy`
2. Set the `VITE_CONVEX_URL` environment variable to your production Convex URL
3. Build and deploy your frontend

The app should now work without the Convex configuration error! 