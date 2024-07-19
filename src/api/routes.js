import express from 'express';
import { webhookToContact, webhookToCompany } from '../controllers/webhookApiController.js';
import { validateToken } from './middleware.js';

export const apiRoutes = express.Router();

// Endpoint for Updating Mirror account contacts
apiRoutes.post('/update-contact-mirror',validateToken, webhookToContact);

// Endpoint for Updating Mirror account companies
apiRoutes.post('/update-company-mirror', webhookToCompany);