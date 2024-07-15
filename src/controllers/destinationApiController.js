import { delayExecution } from '../utils/utilities.js';
import { createContact, createCompany, createAssociation } from '../hubSpot/actions.js';

const createContactAndLocationAssociation = async (dataCharacters,dataLocations) => {
  const allCharacters = dataCharacters;
  const allLocations = dataLocations;

  const locationsDictionary = {};

  for (const character of allCharacters) {
    try {
      const characterLocationUrl = character.location.url;
      const createdContactData = await createContact(character);
      
      const contactId = createdContactData.id;

      if(!locationsDictionary[characterLocationUrl]){
        const contactRelatedLocation =  allLocations.find( location => location.url === characterLocationUrl);

        if(!contactRelatedLocation) {
          console.log('No related Location');
          return;
        }

        const createdCompanyData =  await createCompany(contactRelatedLocation);
        locationsDictionary[characterLocationUrl] = createdCompanyData.id;

      }else{
        console.log('The company was already created',locationsDictionary[characterLocationUrl]);
      }

      let associationValues = {
        objectType: "contact",
        objectId:`${contactId}`,
        toObjectType: "company",
        toObjectId: `${locationsDictionary[characterLocationUrl]}`,
        associationTypeId: 279,
      };

      // Wait for the settings to be applied in hubspot
      delayExecution(1000);

      const createdAssociationData = await createAssociation(associationValues);
      console.log(createdAssociationData);
    } catch (e) {
      e.message === "HTTP request failed"
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e);
    }
  }
};

export const runMigration = (dataCharacters,dataLocations) => createContactAndLocationAssociation(dataCharacters,dataLocations);