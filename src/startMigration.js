import { getCharactersData, getLocationsData } from './controllers/sourceApiController.js';
import { runMigration } from './controllers/destinationApiController.js';

const initMigration = async () =>{
  // GET ALL AVAILABLES CHARACTERS
  const charactersData = await getCharactersData();

  // GET ALL LOCATIONS
  const locationsData = await getLocationsData();

  // RUN MIGRATION
  runMigration(charactersData,locationsData);
}

initMigration();