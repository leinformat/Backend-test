import { config } from '../../config/config.js';
import * as hubspot from '@hubspot/api-client';
import { getFirstOrLastName } from '../utils/utilities.js';

const hubspotClient = new hubspot.Client({
    accessToken:config.apiKeyMirror
});

export const getContact = async (contactId) => {
  const PublicObjectSearchRequest = {
    properties: [
      "hs_object_id",
      "character_id",
      "firstname",
      "lastname",
      "status_character",
      "character_species",
      "character_gender",
      "associatedcompanyid",
    ],
    filterGroups: [
      {
        filters: [
          {
            propertyName: "character_id",
            operator: "EQ",
            value: contactId,
          },
        ],
      },
    ],
  };

  try {
    const apiResponse = await hubspotClient.crm.contacts.searchApi.doSearch(
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