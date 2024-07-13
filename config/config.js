import dotenv from 'dotenv';

dotenv.config();

const sourceApiUrl = "https://rickandmortyapi.com/api";
const hubSpotBaseUrl = "https://api.hubapi.com";
const apiKey = process.env.API_KEY;
const port = process.env.PORT;

export const config = { sourceApiUrl, hubSpotBaseUrl, apiKey, port };