import axios from 'axios';
import { config } from '../../config/config.js';

// GET ALL DATA FROM SOURCE API
export const getAllData =  async (page,type) =>{
  try {
    const response = await axios.get(`${config.sourceApiUrl}/${type}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}