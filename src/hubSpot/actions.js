const config = require('../../config/config');
const hubspot = require('@hubspot/api-client');
const { getFirstOrLastName } = require('../utils/utilities');

const hubspotClient = new hubspot.Client({
    accessToken:config.apiKey
});

const createContact = async (character) => {
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

const createCompany = async (location) => {
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

const createAssociation = async (associationData) => {
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

module.exports = { createContact, createCompany, createAssociation };