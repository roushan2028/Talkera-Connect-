const configuredApiUrl = import.meta.env.VITE_API_URL
  || (import.meta.env.PROD ? window.location.origin : "http://localhost:8000");
const apiUrl = configuredApiUrl.startsWith("http")
  ? configuredApiUrl
  : `https://${configuredApiUrl}`;

export const API_URL = apiUrl.replace(/\/+$/, "");
