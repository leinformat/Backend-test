import { fixerData,delayExecution } from "../utils/utilities.js";
import { getHubspotObject,createHubspotObject, updateHubspotObject } from "../hubSpot/actionsHubspotObjectsMirror.js";

// Controller for Updating  Hubspot mirror contacts
export const webhookToContact = async (req, res) => {
  try {
    const newData = fixerData(req.body, {
      associatedcompanyid: "associatedcompanyid",
      character_id: "character_id",
      firstname: "firstname",
      lastname: "lastname",
      status_character: "status_character",
      character_species: "character_species",
      character_gender: "character_gender",
    });

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

    // Excluding Hubspot Source IDs
    const { associatedcompanyid, hs_object_id, ...dataWithoutHubspotIds } = newData;

    /*
    If the contact doen't exist create and looking for
    his associated company.
    */
    if (!checkExistentContact?.total) {
      // Wait for the settings to be applied in hubspot
      delayExecution(1000);

      // Creating Contact and getting its information
      const createdContactResult = await createHubspotObject({
        properties: dataWithoutHubspotIds,
        objectType: "contacts",
      });

      console.log(createdContactResult);
      res.json(createdContactResult);
    } 
    /* If the contact exist update it */
    else {
      const updatedContactResult = await updateHubspotObject({
        properties: dataWithoutHubspotIds,
        objectId: checkExistentContact.results[0].id,
        objectType: "contacts",
      });
      console.log(JSON.stringify(updatedContactResult, null, 2));
      res.json(updatedContactResult);
    }
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
    res.status(500).json({ error: "Error al obtener datos de la API" });
  }
};

// Controller for Updating  Hubspot mirror contacts
export const webhookToCompany = async (req, res) => {
  try {
    const newData = fixerData(req.body, {
      location_id: "location_id",
      name: "name",
      location_type: "location_type",
      dimension: "dimension",
      creation_date: "creation_date",
    });

    //Check if the contact exists
    const checkExistentCompany = await getHubspotObject({
      objectType:"companies",
      properties: [
        "hs_object_id",
        "location_id",
        "name",
        "location_type",
        "dimension",
        "creation_date"
      ],
      filters: [
        {
          propertyName: "location_id",
          operator: "EQ",
          value: newData.location_id
        },
      ],
    });

    // Excluding Hubspot Source IDs
    const { hs_object_id, ...dataWithoutHubspotIds } = newData;

    /*
    If the contact doen't exist create and looking for
    his associated company
    */
    if (!checkExistentCompany?.total) {
      // Wait for the settings to be applied in hubspot
      delayExecution(1000);

      // Creating Company and getting its information
      const createdCompanyResult = await createHubspotObject({
        properties: dataWithoutHubspotIds,
        objectType: "companies",
      });

      console.log(createdCompanyResult);
      res.json(createdCompanyResult);
    } 
    /* If the Company exist update it */
    else {
      const updatedCompanyResult = await updateHubspotObject({
        properties: dataWithoutHubspotIds,
        objectId: checkExistentCompany.results[0].id,
        objectType: "companies",
      });
      console.log('aqui')
      console.log(JSON.stringify(newData, null, 2));
      console.log(JSON.stringify(updatedCompanyResult, null, 2));
      res.json(updatedCompanyResult);
    }
    
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
    res.status(500).json({ error: "Error al obtener datos de la API" });
  }
};
