import express from 'express';
import { fixerData } from '../utils/utilities.js'
{  }

const webhookContact = async (req, res) => {
  try {
    const newData = fixerData(req.body);
    console.log(JSON.stringify(req.body, null, 2));
    res.json(newData);
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
    res.status(500).json({ error: "Error al obtener datos de la API" });
  }
};

export const apiRoutes = express.Router();

// Endpoint para obtener datos de la API externa
apiRoutes.post('/update-contact-mirror', webhookContact);