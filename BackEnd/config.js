import "dotenv/config";

const configuredFrontendUrl = process.env.FRONTEND_URL;

export const frontendOrigin = configuredFrontendUrl
  ? new URL(
      configuredFrontendUrl.startsWith("http")
        ? configuredFrontendUrl
        : `https://${configuredFrontendUrl}`
    ).origin
  : "http://localhost:5173";
