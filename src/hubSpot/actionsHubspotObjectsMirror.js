import { config } from '../../config/config.js';
import * as hubspot from '@hubspot/api-client';

const hubspotClient = new hubspot.Client({
    accessToken:config.apiKeyMirror
});

// Get any hubspot object who use the same hubpot client method structures
export const getHubspotObject = async (dataObject) => {
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
    console.log('Err in getHubspotObject');
    
    return e.message === "HTTP request failed"
    ? e.response
    : e

    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

// Create any hubspot object who use the same hubpot client method structures
export const createHubspotObject = async (dataObject) => {

  const { properties, objectType } = dataObject;

  const objectProperties = { properties };

  try {
    const apiResponse = await hubspotClient.crm[objectType].basicApi.create(
      objectProperties
    );
    return apiResponse;
  } catch (e) {
    console.log('Err in createHubspotObject');
    
    return e.message === "HTTP request failed"
    ? e.response
    : e

    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

// Update any hubspot object who use the same hubpot client method structures
export const updateHubspotObject = async (dataObject) => {
  const { properties,objectId,objectType } = dataObject;

  const objectProperties = { properties };

  try {
    const apiResponse = await hubspotClient.crm[objectType].basicApi.update(
      objectId,
      objectProperties
    );
    return apiResponse;
  } catch (e) {
    console.log('Err in updateHubspotObject');

    return e.message === "HTTP request failed"
    ? e.response
    : e

    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

// Update any hubspot object who use the same hubpot client method structures
export const createHubspotObjectAssociation = async (associationData) => {
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
    console.log('Err in createHubspotObjectAssociation');

    return e.message === "HTTP request failed"
    ? e.response
    : e
    
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};