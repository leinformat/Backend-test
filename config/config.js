import dotenv from 'dotenv';

dotenv.config();

// Exporting environment variables
export const config = {
  sourceApiUrl: "https://rickandmortyapi.com/api",
  hubSpotBaseUrl: "https://api.hubapi.com",
  apiKeySource: process.env.SOURCE_API_KEY,
  apiKeyMirror: process.env.MIRROR_API_KEY,
  apiToken: process.API_TOKEN,
  port: process.env.PORT,
};