import { config } from '../../config/config.js';
import * as hubspot from '@hubspot/api-client';
import { delayExecution } from '../utils/utilities.js';

const hubspotClientMirror = new hubspot.Client({
    accessToken:config.apiKeyMirror
});

// Get any hubspot object who use the same hubpot client method structures
export const getHubspotObject = async (dataObject) => {
  const retries = 3;
  let delay = 1000;

  const { filters, properties, objectType } = dataObject;

  const PublicObjectSearchRequest = {
    properties,
    filterGroups: [
      {
        filters
      },
    ],
  };

  for (let i = 0; i < retries; i++) {
    try {
      const apiResponse = await hubspotClientMirror.crm[objectType].searchApi.doSearch(PublicObjectSearchRequest);
      return apiResponse; // Exit the function if the request is successful
    } catch (e) {
      if (i < retries - 1 && e.body?.errorType === 'RATE_LIMIT') {
        console.error(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
        
        // Wait before retrying
        await delayExecution(delay);
        
        delay *= 2; // Increase the delay exponentially
      } else {
        return e.message === "HTTP request failed" ? e.response : e;
      }
    }
  }
};

// Create any hubspot object who use the same hubpot client method structures
export const createHubspotObject = async (dataObject) => {
  const retries = 3;
  let delay = 1000;

  const { properties, objectType } = dataObject;
  const objectProperties = { properties };

  for (let i = 0; i < retries; i++) {
    try {
      const apiResponse = await hubspotClientMirror.crm[objectType].basicApi.create(objectProperties);
      return apiResponse; // Exit the function if the request is successful
    } catch (e) {
      if (i < retries - 1 && e.body?.errorType === 'RATE_LIMIT') {
        console.error(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);

        // Wait before retrying
        await delayExecution(delay);

        delay *= 2; // Increase the delay exponentially
      } else {
        return e.message === "HTTP request failed" ? e.response : e;
      }
    }
  }
};

// Update any hubspot object who use the same hubpot client method structures
export const updateHubspotObject = async (dataObject) => {
  const retries = 3;
  let delay = 1000;

  const { properties, objectId, objectType } = dataObject;
  const objectProperties = { properties };

  for (let i = 0; i < retries; i++) {
    try {
      console.error('Updating HubSpot Object:', JSON.stringify(dataObject, null, 2));

      const apiResponse = await hubspotClientMirror.crm[objectType].basicApi.update(
        objectId,
        objectProperties
      );
      return apiResponse; // Exit the function if the request is successful
    } catch (e) {
      if (i < retries - 1 && e.body?.errorType === 'RATE_LIMIT') {
        console.error(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);

        // Wait before retrying
        await delayExecution(delay);

        delay *= 2; // Increase the delay exponentially
      } else {
        console.error('Error in updateHubspotObject:', e.message);
        return e.message === "HTTP request failed" ? e.response : e;
      }
    }
  }
};

// Function to create an association between HubSpot objects
export const createHubspotObjectAssociation = async (associationData) => {
  const retries = 3;
  let delay = 1000;

  const { objectType, objectId, toObjectType, toObjectId, associationTypeId } = associationData;

  const AssociationSpec = [
    {
      "associationCategory": "HUBSPOT_DEFINED",
      "associationTypeId": associationTypeId
    }
  ];

  for (let i = 0; i < retries; i++) {
    try {
      const apiResponse = await hubspotClientMirror.crm.associations.v4.basicApi.create(
        objectType,
        objectId,
        toObjectType,
        toObjectId,
        AssociationSpec
      );

      return apiResponse; // Exit the function if the request is successful
    } catch (e) {
      if (i < retries - 1 && e.body?.errorType === 'RATE_LIMIT') {
        console.error(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);

        // Wait before retrying
        await delayExecution(delay);

        delay *= 2; // Increase the delay exponentially
      } else {
        console.error('Error in createHubspotObjectAssociation:', e.message);
        return e.message === "HTTP request failed" ? e.response : e;
      }
    }
  }
};

export const createContactAndAssociation = async (character, associationsValues) => {
  const retries = 3;
  let delay = 1000;

  const properties = { ...character };
  const associations = associationsValues;

  const SimplePublicObjectInputForCreate = {
    associations,
    properties,
  };

  for (let i = 0; i < retries; i++) {
    try {
      const apiResponse = await hubspotClientMirror.crm.contacts.basicApi.create(SimplePublicObjectInputForCreate);
      return apiResponse; // Exit the function if the request is successful
    } catch (e) {
      if (i < retries - 1 && e.body?.errorType === 'RATE_LIMIT') {
        console.error(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);

        // Wait before retrying
        await delayExecution(delay);

        delay *= 2; // Increase the delay exponentially
      } else {
        console.error('Error in createContactAndAssociation:', e.message);
        return e.message === "HTTP request failed" ? e.response : e;
      }
    }
  }
};