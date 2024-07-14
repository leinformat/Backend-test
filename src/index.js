import express from 'express';
import { config } from '../config/config.js';
import { apiRoutes } from './api/routes.js';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

app.listen(config.port, () => {
  console.log(`Listen in Port ${config.port}`);
});