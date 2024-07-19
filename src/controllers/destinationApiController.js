import { delayExecution } from '../utils/utilities.js';
import { createContactAndAssociation, createCompany } from '../hubSpot/actions.js';

const createContactAndLocationAssociation = async (dataCharacters,dataLocations) => {
  const allCharacters = dataCharacters;
  const allLocations = dataLocations;

  const locationsDictionary = {};
  
  // Creating the Locations with his IDs
  for (const character of allCharacters) {
    try {
      const characterLocationUrl = character.location.url;

      if(!locationsDictionary[characterLocationUrl]){
        const contactRelatedLocation =  allLocations.find( location => location.url === characterLocationUrl);

        if(!contactRelatedLocation) {
          console.log('No related Location');
          continue;
        }

        const createdCompanyData =  await createCompany(contactRelatedLocation);
        locationsDictionary[characterLocationUrl] = {companyId:createdCompanyData.id,locationId:contactRelatedLocation.id};

        console.log('The company Created',JSON.stringify(createdCompanyData,null,2));

        // Wait for the settings to be applied in hubspot
        await delayExecution(500);

      }else{
        console.log('The company was already created',locationsDictionary[characterLocationUrl].locationId);
      }
    } catch (e) {
      e.message === "HTTP request failed"
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e);
    }
  }

  // Creating the Characters and Company Associations
  for (const character of allCharacters) {    
    try {
      const characterLocationUrl = character.location.url;
      const properties = character;
      let associations = [
        {
          types: [
            { associationCategory: "HUBSPOT_DEFINED", associationTypeId:279 },
          ],
          to: { id: locationsDictionary[characterLocationUrl]?.companyId },
        },
      ]

      // If the character there's no a related Location delete the association object
      if(!locationsDictionary[characterLocationUrl]){
        associations = null;
      }
            
      const createdContactData = await createContactAndAssociation(
        properties,
        associations,
        locationsDictionary[characterLocationUrl]?.locationId
      );

      console.log('Contact Created',JSON.stringify(createdContactData,null,2));

      // Wait for the settings to be applied in hubspot
      await delayExecution(500);
 
    } catch (e) {
      e.message === "HTTP request failed"
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e);
    }
  }
};

export const runMigration = (dataCharacters,dataLocations) => createContactAndLocationAssociation(dataCharacters,dataLocations);