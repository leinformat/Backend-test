import { config } from '../config/config.js';
import express from 'express';

const app = express();

// Middlewares
app.use(express.json());

// Routes

app.listen(config.port, () => {
  console.log(`Servidor escuchando ${config.port}`);
});