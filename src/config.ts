import esriConfig from "@arcgis/core/config";


esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;
esriConfig.request.useIdentity = false;

export const API_URL = "https://lm-interactive-presentation-builder-api-dev-bzgvc8cfhsasaxd7.eastus-01.azurewebsites.net"
export const LOCAL_API_URL = "http://localhost:8000"

export const BASE_URL = import.meta.env.MODE === "development" ? LOCAL_API_URL : API_URL