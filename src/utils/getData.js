const axios = require('axios');
const config = require('../../config/config');

// GET ALL DATA FROM SOURCE API
const getAllData =  async (page,type) =>{
  try {
    const response = await axios.get(`${config.sourceApiUrl}/${type}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = { getAllData };