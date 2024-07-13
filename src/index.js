const { getCharactersData,getLocationsData } = require('./controllers/sourceApiController');
const { runMigration } = require('./controllers/destinationApiController');

const initMigration = async () =>{
  // GET ALL AVAILABLES CHARACTERS
  const charactersData = await getCharactersData();

  // GET ALL LOCATIONS
  const locationsData = await getLocationsData();

  // RUN MIGRATION
  runMigration(charactersData,locationsData);
}

initMigration();