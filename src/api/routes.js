import express from 'express';
import { webhookContact } from '../controllers/webhookApiController.js';

export const apiRoutes = express.Router();

// Endpoint for Updating Mirror account contacts
apiRoutes.post('/update-contact-mirror', webhookContact);