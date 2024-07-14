import { fixerData } from "../utils/utilities.js";
import { getHubspotObject,createContact } from "../hubSpot/actionsContactMirror.js";

export const webhookContact = async (req, res) => {
  try {
    const newData = fixerData(req.body);

    //Check if the contact exists
    const checkExistentContact = await getHubspotObject({
      objectType:"contacts",
      properties: [
        "hs_object_id",
        "character_id",
        "firstname",
        "lastname",
        "status_character",
        "character_species",
        "character_gender",
        "associatedcompanyid",
      ],
      filters: [
        {
          propertyName: "character_id",
          operator: "EQ",
          value: newData.character_id
        },
      ],
    });

    if (!checkExistentContact.total) {
      delete newData.associatedcompanyid;
      delete newData.hs_object_id;
      const createContactResult = createContact(newData);

      res.json(createContactResult);
    } else {
      console.log(JSON.stringify(checkExistentContact, null, 2));
      res.json(checkExistentContact);
    }
    
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
    res.status(500).json({ error: "Error al obtener datos de la API" });
  }
};
