import { config } from '../../config/config.js';
import * as hubspot from '@hubspot/api-client';

const hubspotClientMirror = new hubspot.Client({
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
    const apiResponse = await hubspotClientMirror.crm[objectType].searchApi.doSearch(
      PublicObjectSearchRequest
    );
    return apiResponse;
  } catch (e) {
    console.log('Err in getHubspotObject');
    
    return e.message === "HTTP request failed"
    ? e.response
    : e;
  }
};

// Create any hubspot object who use the same hubpot client method structures
export const createHubspotObject = async (dataObject) => {

  const { properties, objectType } = dataObject;

  const objectProperties = { properties };

  try {
    const apiResponse = await hubspotClientMirror.crm[objectType].basicApi.create(
      objectProperties
    );
    return apiResponse;
  } catch (e) {
    console.log('Err in createHubspotObject');
    
    return e.message === "HTTP request failed"
    ? e.response
    : e;
  }
};

// Update any hubspot object who use the same hubpot client method structures
export const updateHubspotObject = async (dataObject) => {
  const { properties,objectId,objectType } = dataObject;

  const objectProperties = { properties };

  try {
    const apiResponse = await hubspotClientMirror.crm[objectType].basicApi.update(
      objectId,
      objectProperties
    );
    return apiResponse;
  } catch (e) {
    console.log('Err in updateHubspotObject');

    return e.message === "HTTP request failed"
    ? e.response
    : e;
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
    const apiResponse = await hubspotClientMirror.crm.associations.v4.basicApi.create(
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
    : e;
  }
};



export const createContactAndAssociation = async (character,associations) => {
  //const properties = character;
    const properties = { ...character  };
    const associationsValues = associations;
    
  const SimplePublicObjectInputForCreate = {
    associationsValues,
    properties,
  };

  // const contactProperties = { associations,properties };
  try {
    console.error('Desde action',JSON.stringify('mierda', null, 2));

    const apiResponse = await hubspotClientMirror.crm.contacts.basicApi.create(SimplePublicObjectInputForCreate);
    return apiResponse;
  } catch (e) {
    console.log('Error in createContact');
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};