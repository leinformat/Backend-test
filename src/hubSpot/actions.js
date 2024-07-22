import { config } from '../../config/config.js';
import * as hubspot from '@hubspot/api-client';
import { getFirstOrLastName } from '../utils/utilities.js';

const hubspotClientSource = new hubspot.Client({
    accessToken:config.apiKeySource
});

// Create Contact and Company Association
export const createContactAndAssociation = async (character,associations,locationId) => {
  const properties = {
    character_id: character.id,
    firstname: getFirstOrLastName(character.name, "first"),
    lastname: getFirstOrLastName(character.name, "last"),
    status_character: character.status,
    character_species: character.species,
    character_gender: character.gender,
    location_id: locationId
  };
  const contactProperties = { properties,associations };

  try {
    const apiResponse = await hubspotClientSource.crm.contacts.basicApi.create(contactProperties);
    return apiResponse;
  } catch (e) {
    console.log('Error in createContact');
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

// Create Company
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