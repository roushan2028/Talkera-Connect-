# Chatapp deployment

## Deploy with Render

This repository is configured as a Render Blueprint with two services:

- `chatapp-api`: Express and Socket.IO backend
- `chatapp-web`: Vite static frontend

The backend is configured for Render's free web-service plan and the frontend is a free static site. Free backend services can spin down after inactivity, so the first request or socket connection may take about a minute to respond.

1. Push this project to a GitHub repository and create a MongoDB Atlas database.
2. In Render, create a new **Blueprint** from the repository and select the root `render.yaml`.
3. When prompted, set `MONGODB_URL` to the Atlas connection string. The Blueprint generates `JWT_TOKEN` for you. `FRONTEND_URL` can temporarily be `http://localhost:5173`.
4. After both services are deployed, copy the frontend's public URL and set it as `FRONTEND_URL` on the `chatapp-api` service. Include `https://`, save the change, and let Render redeploy the backend.
5. Open the frontend URL and test signup, login, loading users, sending messages, and live online status.

`VITE_API_URL` is wired to the backend service by the Blueprint. Keep the MongoDB connection string and JWT secret in Render's environment settings; do not commit real values in `.env` files.

For local development, copy `BackEnd/.env.example` to `BackEnd/.env` and `BackEnd/FrontEnd/.env.example` to `BackEnd/FrontEnd/.env`.
