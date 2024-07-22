import { fixerData } from "../utils/utilities.js";
import { getHubspotObject,createHubspotObject, updateHubspotObject,createHubspotObjectAssociation,createContactAndAssociation } from "../hubSpot/actionsHubspotObjectsMirror.js";
 
// Controller for Updating  Hubspot mirror contacts
export const webhookToContact = async (req, res) => {
  try {
    const newData = fixerData(req.body, {
      character_id: "character_id",
      firstname: "firstname",
      lastname: "lastname",
      location_id: "location_id",
      status_character: "status_character",
      character_species: "character_species",
      character_gender: "character_gender",
    });
    
    //Check if the contact exists en the mirror account   
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
        "location_id"
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
    const { hs_object_id, ...dataWithoutHubspotIds } = newData;
    console.log('checkExistentContact ->',JSON.stringify(dataWithoutHubspotIds,null,2));

    // Company MIrror ID
    let companyHubspotId = null;

    // If has association Company
    if (dataWithoutHubspotIds.location_id) {

      //Search location_id in Source accound and looking for his associated company.
      const checkSourceAssociatedCompanyId = await getHubspotObject({
        objectType: "companies",
        properties: ["hs_object_id", "location_id"],
        filters: [
          {
            propertyName: "location_id",
            operator: "EQ",
            value: dataWithoutHubspotIds.location_id,
          },
        ],
      });
      console.log(JSON.stringify(checkSourceAssociatedCompanyId,null,2));

      companyHubspotId = checkSourceAssociatedCompanyId?.results[0]?.id;
    }
    
    //If the contact doen't exist create 
    if (!checkExistentContact?.total) {
      console.log('character data',dataWithoutHubspotIds)

      const companyHsId = companyHubspotId;
      const properties = dataWithoutHubspotIds;
      let associations = [
        {
          types: [
            { associationCategory: "HUBSPOT_DEFINED", associationTypeId:279 },
          ],
          to: { id: companyHsId },
        },
      ]

      // If the character there's no a related Location delete the association object
      if(!companyHsId){
        associations = null;
      }
            
      const createdContactData = await createContactAndAssociation(properties,associations);
      
      console.log("Contact Association and Created Contact", JSON.stringify(createdContactData,null,2));
    }

    /* If the contact exist update it */
    else {
        const updatedContactResult = await updateHubspotObject({
          properties: dataWithoutHubspotIds,
          objectId: checkExistentContact?.results[0]?.id,
          objectType: "contacts",
        });
        console.log("Contact Updated",JSON.stringify(updatedContactResult, null, 2));

        // Mirror contact I and Mirror Company Id to associate
        const mirrorContactId = checkExistentContact?.results[0]?.id;

        if (!!companyHubspotId) {
          let associationValues = {
            objectType: "contact",
            objectId: mirrorContactId,
            toObjectType: "company",
            toObjectId: companyHubspotId,
            associationTypeId: 279,
          };

          const createdAssociationData = await createHubspotObjectAssociation(
            associationValues
          );
          console.log("Association Contact to Company:",JSON.stringify(createdAssociationData, null, 2));
        }
    }

    res.status(201).json({ message: "Successful Request" });
  } catch (error) {
    console.error("Error getting data from API:", error);
    res.status(500).json({ error: "Error getting data from API" });
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

      // Creating Company and getting its information
      const createdCompanyResult = await createHubspotObject({
        properties: dataWithoutHubspotIds,
        objectType: "companies",
      });

      console.log('Company Created',JSON.stringify(createdCompanyResult, null, 2));
    } 
    /* If the Company exist update it */
    else {
      const updatedCompanyResult = await updateHubspotObject({
        properties: dataWithoutHubspotIds,
        objectId: checkExistentCompany.results[0].id,
        objectType: "companies",
      });
      
      console.log(JSON.stringify(updatedCompanyResult, null, 2));
    }
    res.status(201).json({ message: "Successful Request" });
  } catch (error) {
    console.error("Error getting data from API:", error);
    res.status(500).json({ error: "Error getting data from API" });
  }
};