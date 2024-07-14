import { config } from '../../config/config.js';
import * as hubspot from '@hubspot/api-client';

const hubspotClient = new hubspot.Client({
    accessToken:config.apiKeyMirror
});

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
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

export const createContact = async (character) => {
  const properties = character;

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