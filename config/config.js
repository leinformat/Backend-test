import dotenv from 'dotenv';

dotenv.config();

export const config = {
  sourceApiUrl: "https://rickandmortyapi.com/api",
  hubSpotBaseUrl: "https://api.hubapi.com",
  apiKey: process.env.API_KEY,
  apiKeyMirror: process.env.MIRROR_API_KEY,
  port: process.env.PORT,
};