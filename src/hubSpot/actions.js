import { config } from '../../config/config.js';
import * as hubspot from '@hubspot/api-client';
import { getFirstOrLastName } from '../utils/utilities.js';

const hubspotClient = new hubspot.Client({
    accessToken:config.apiKey
});

export const createContact = async (character) => {
  const properties = {
    character_id: character.id,
    firstname: getFirstOrLastName(character.name, "first"),
    lastname: getFirstOrLastName(character.name, "last"),
    status_character: character.status,
    character_species: character.species,
    character_gender: character.gender,
  };

  const contactProperties = { properties };

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(
      contactProperties
    );
    return apiResponse;
  } catch (e) {
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
    const apiResponse = await hubspotClient.crm.companies.basicApi.create(
      companyProperties
    );
    return apiResponse;
  } catch (e) {
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
    const apiResponse = await hubspotClient.crm.associations.v4.basicApi.create(
      objectType,
      objectId,
      toObjectType,
      toObjectId,
      AssociationSpec
    );
    return apiResponse;
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

// Get any hubspot object who use the same hubpot client method structures
export const getHubspotObjectSource = async (dataObject) => {
  const {filters,properties,objectType} = dataObject;

  const PublicObjectSearchRequest = {
    properties,
    filterGroups: [
      {
        filters
      },
    ],
  };

  try {
    const apiResponse = await hubspotClient.crm[objectType].searchApi.doSearch(
      PublicObjectSearchRequest
    );
    return apiResponse;
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};