const { getAllData }= require('../utils/getData');
const { isPrime } = require('../utils/utilities');

const getCharactersData = async () => {
  const allData = [];
  let page = 1;
  let lastPage = false;

  // FETCH CHARACTERS WHILE THERE ARE NEXT PAGES
  while (!lastPage) {
    try {
      const characters = await getAllData(page,'character');
      const { info, results } = characters;
      const primeData = results.filter((item) => isPrime(item.id) == true);

      allData.push(...primeData);
      page++;

      console.log('Getting Characters');
      if (info.next === null) lastPage = true;

    } catch (error) {
      console.error("Error: ", error);
    }
  }
  return allData;
};

const getLocationsData = async () => {
  const allData = [];
  let page = 1;
  let lastPage = false;

  // FETCH LOCATIONS WHILE THERE ARE NEXT PAGES
  while (!lastPage) {
    try {
      const characters = await getAllData(page,'location');
      const { info, results } = characters;

      allData.push(...results);
      page++;

      console.log('Getting Locations');
      if (info.next === null) lastPage = true;

    } catch (error) {
      console.error("Error: ", error);
    }
  }
  return allData;
};

module.exports = { getCharactersData,getLocationsData };