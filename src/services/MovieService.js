// src/services/MovieService.js

import axios from 'axios';

const API_KEY = '496bb61b4b78137766ba29faa7fb44aa';
const BASE_URL = 'https://api.themoviedb.org/3';

const getPopularMovies = async () => {
  try {
	      const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("获取流行电影信息失败", error);
    return [];
  }
};

export { getPopularMovies };

