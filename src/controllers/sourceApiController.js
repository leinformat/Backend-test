import { getAllData } from '../utils/getData.js';
import { isPrime } from '../utils/utilities.js';

export const getCharactersData = async () => {
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

      console.log('Fetching Characters');
      if (info.next === null) lastPage = true;

    } catch (error) {
      console.error("Error: ", error);
    }
  }
  return allData;
};

export const getLocationsData = async () => {
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

      console.log('Fetching Locations');
      if (info.next === null) lastPage = true;

    } catch (error) {
      console.error("Error: ", error);
    }
  }
  return allData;
};