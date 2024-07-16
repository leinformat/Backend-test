import { config } from '../../config/config.js';
import * as hubspot from '@hubspot/api-client';
import { getFirstOrLastName } from '../utils/utilities.js';

const hubspotClientSource = new hubspot.Client({
    accessToken:config.apiKey
});

export const createContact = async (character,associations) => {
  const properties = {
    character_id: character.id,
    firstname: getFirstOrLastName(character.name, "first"),
    lastname: getFirstOrLastName(character.name, "last"),
    status_character: character.status,
    character_species: character.species,
    character_gender: character.gender,
  };
  const contactProperties = { properties,associations };

  
  try {
    console.log(contactProperties);


    console.error('Desde action',JSON.stringify(contactProperties, null, 2))


    const apiResponse = await hubspotClientSource.crm.contacts.basicApi.create(contactProperties);
    return apiResponse;
  } catch (e) {
    console.log('Err in createContact');
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

export const createCompany = async (location) => {
  const properties = {
    location_id: location.id,
    name: location.name,
    location_type: location.type,
    dimension: location.dimension,
    creation_date: location.created,
  };

  const companyProperties = { properties };

  try {
    const apiResponse = await hubspotClientSource.crm.companies.basicApi.create(
      companyProperties
    );
    return apiResponse;
  } catch (e) {
    console.log('Err in createCompany');
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

export const createAssociation = async (associationData) => {
  const {objectType,objectId,toObjectType,toObjectId,associationTypeId} = associationData;
 
  const AssociationSpec = [
    {
      "associationCategory": "HUBSPOT_DEFINED",
      "associationTypeId": associationTypeId
    }
  ];
  try {
    const apiResponse = await hubspotClientSource.crm.associations.v4.basicApi.create(
      objectType,
      objectId,
      toObjectType,
      toObjectId,
      AssociationSpec
    );
    return apiResponse;
  } catch (e) {
    console.log('Err in createAssociation');

    return e.message === "HTTP request failed"
    ? e.response
    : e
  }
};


// Get any hubspot object who use the same hubpot client method structures
export const getHubspotObjectSource = async (dataObject) => {
  const {filters,properties,objectType} = dataObject;

  console.log(dataObject);

  const PublicObjectSearchRequest = {
    properties,
    filterGroups: [
      {
        filters
      },
    ],
  };

  try {
    const apiResponse = await hubspotClientSource.crm[objectType].searchApi.doSearch(
      PublicObjectSearchRequest
    );
    return apiResponse;
  } catch (e) {
    console.log('Err in getHubspotObjectSource');

    return e.message === "HTTP request failed"
    ? e.response
    : e
  }
};