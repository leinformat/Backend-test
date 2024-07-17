import { fixerData,delayExecution } from "../utils/utilities.js";
import { getHubspotObject,createHubspotObject, updateHubspotObject,createHubspotObjectAssociation,createContactAndAssociation } from "../hubSpot/actionsHubspotObjectsMirror.js";
import { getHubspotObjectSource } from "../hubSpot/actions.js";
 
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

    let companyHubspotId = null;

    // If has association Company
    if (dataWithoutHubspotIds.location_id) {
      // Wait for the settings to be applied in hubspot
      await delayExecution(2000);
      
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

      companyHubspotId = checkSourceAssociatedCompanyId.results[0];
    }
    //If the contact doen't exist create 
    if (!checkExistentContact?.total) {
      console.log('character data',dataWithoutHubspotIds)
      // Wait for the settings to be applied in hubspot

      const companyHsId = companyHubspotId;
      const properties = dataWithoutHubspotIds;
      let associations = [
        {
          types: [
            { associationCategory: "HUBSPOT_DEFINED", associationTypeId:279 },
          ],
          to: { id: companyHsId?.id },
        },
      ]

      console.log("Contact Association and Created Contact", JSON.stringify(associations,null,2));
      // If the character there's no a related Location delete the association object
      if(!companyHsId){
        
        associations = null;
      }
            
      const createdContactData = await createContactAndAssociation(properties,associations);
      
      //console.log("Contact Association and Created Contact -> createContactAndAssociation", JSON.stringify(createdContactData,null,2));

      /*
      If exist a company association search this in Source
      accound to check its location_id
      */
      //console.log('Contact Created Data',JSON.stringify(dataWithoutHubspotIds,null,2));

      return
      if (!!associatedcompanyid) {
        //Search location_id in Source accound
        const checkSourceAssociatedCompanyResult = await getHubspotObjectSource({
          objectType: "companies",
          properties: ["hs_object_id", "location_id"],
          filters: [
            {
              propertyName: "hs_object_id",
              operator: "EQ",
              value: associatedcompanyid,
            },
          ],
        });
       
        console.log("Associated Source Company:",JSON.stringify(checkSourceAssociatedCompanyResult, null, 2));

        const sourceLocationId = checkSourceAssociatedCompanyResult.results[0].properties.location_id;

        console.log('sourceLocationId ->',sourceLocationId);
        //Search location_id in Mirror accound
        const checkMirrorAssociatedCompanyResult = await getHubspotObject({
          objectType: "companies",
          properties: ["hs_object_id", "location_id"],
          filters: [
            {
              propertyName: "location_id",
              operator: "EQ",
              value: sourceLocationId,
            },
          ],
        });
        
        console.log('checkMirrorAssociatedCompanyResult ->',checkMirrorAssociatedCompanyResult)

        // Mirror contact I and Mirror Company Id to associate
        const mirrorContactId = createdContactResult.id;
        const mirrorLocationId = checkMirrorAssociatedCompanyResult.results[0].properties.hs_object_id;

        if(!!mirrorLocationId && !!mirrorContactId){
          let associationValues = {
            objectType: "contact",
            objectId: mirrorContactId,
            toObjectType: "company",
            toObjectId: mirrorLocationId,
            associationTypeId: 279,
          };
    
          // Wait for the settings to be applied in hubspot
          //await delayExecution(3000);
          const createdAssociationData = await createHubspotObjectAssociation(associationValues);
          console.log("Association Contact to Company:",JSON.stringify(createdAssociationData, null, 2));
        }
      }else{
        console.log('The company was not found in SOURCE',JSON.stringify(associatedcompanyid, null, 2));
      }
    }
    
    /* If the contact exist update it */
    else {
      return
      const updatedContactResult = await updateHubspotObject({
        properties: dataWithoutHubspotIds,
        objectId: checkExistentContact.results[0].id,
        objectType: "contacts",
      });
      console.log('Contact Updated',JSON.stringify(updatedContactResult, null, 2));
    }

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

    console.log('Err in getHubspotObject:',checkExistentCompany);
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
    res.json({message:'Success'});
  } catch (error) {
    console.error("Error getting data from API:", error);
    res.status(500).json({ error: "Error getting data from API" });
  }
};