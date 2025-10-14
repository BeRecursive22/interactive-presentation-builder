import esriConfig from "@arcgis/core/config";


esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;
esriConfig.request.useIdentity = true;



export const API_URL = "https://lm-product-dev-be-cyfzfhf3gjgtezhp.eastus-01.azurewebsites.net"
export const LOCAL_API_URL = "http://localhost:8000"

export const BASE_URL = LOCAL_API_URL