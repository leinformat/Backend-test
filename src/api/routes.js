import express from 'express';
import { webhookToContact, webhookToCompany } from '../controllers/webhookApiController.js';
import { validateToken } from './middlewares.js';

export const apiRoutes = express.Router();

// Endpoint for Updating Mirror account Contacts
apiRoutes.post('/update-contact-mirror',validateToken, webhookToContact);

// Endpoint for Updating Mirror account Companies
apiRoutes.post('/update-company-mirror',validateToken, webhookToCompany);