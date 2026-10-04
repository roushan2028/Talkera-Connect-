# Chatapp deployment

## Deploy with Render

This repository is configured as one Render Web Service. It builds the Vite frontend and serves it from Express alongside the API and Socket.IO, so the website and backend use the same `onrender.com` URL. The service uses Render's free plan and may spin down after inactivity; the first request or socket connection afterward can take about a minute.

1. In the existing Render Web Service, set **Root Directory** to `BackEnd`.
2. Set **Build Command** to `npm ci && npm ci --include=dev --prefix FrontEnd && npm run build --prefix FrontEnd`.
3. Set **Start Command** to `npm start`.
4. Configure `MONGODB_URL` with the Atlas connection string, `JWT_TOKEN` with a long random secret, and `NODE_ENV` as `production`.
5. Deploy the latest commit, then open the Web Service URL (for example, `https://talkera-connect.onrender.com/login`). The same URL serves the API and Socket.IO.

Keep the MongoDB connection string and JWT secret in Render's environment settings; do not commit real values in `.env` files.

For local development, copy `BackEnd/.env.example` to `BackEnd/.env` and `BackEnd/FrontEnd/.env.example` to `BackEnd/FrontEnd/.env`.
