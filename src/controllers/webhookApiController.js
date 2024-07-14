import { fixerData } from "../utils/utilities.js";
import { getContact,createContact } from "../hubSpot/actionsContactMirror.js";

export const webhookContact = async (req, res) => {
  try {
    const newData = fixerData(req.body);

    //Check if the contact exists
    const checkExistentContact = await getContact(newData.character_id);

    if(!checkExistentContact.total){
      const createContactResult = createContact(newData);
    }

    console.log(JSON.stringify(checkExistentContact, null, 2));

    res.json(newData);
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
    res.status(500).json({ error: "Error al obtener datos de la API" });
  }
};
