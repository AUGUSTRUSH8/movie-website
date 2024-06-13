// src/services/MovieService.js

import axios from 'axios';

const API_KEY = '496bb61b4b78137766ba29faa7fb44aa';
const BASE_URL = 'https://api.themoviedb.org/3';

// API中可能对应的分类名称和ID。这是一个示例，实际情况可能不同。
const CATEGORY_IDS = {
  '流行电影': 'popular',
  '高分电影': 'top_rated',
  '经典电影': 'upcoming',
};

const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("获取流行电影信息失败", error);
    return [];
  }
};

export const getMoviesByCategory = async (categoryName) => {
  // 使用与分类名称相匹配的ID
  const categoryPath = CATEGORY_IDS[categoryName];

  if (!categoryPath) {
    console.error('未知的分类名称:', categoryName);
    return [];
  }

  try {
    // 构建URL
    const response = await fetch(`${BASE_URL}/movie/${categoryPath}?api_key=${API_KEY}`);
    // 检测响应是否成功
    if (!response.ok) {
      throw new Error(`API 调用失败，状态码：${response.status}`);
    }
    const data = await response.json();
    return data.results; // 假设电影数据位于结果的 'results' 字段下
  } catch (error) {
    console.error('获取电影数据失败:', error);
    return []; // 在错误情况下返回空数组
  }
};

const searchMovies = async (keyword) => {
  const endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(keyword)}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data.results; // 返回搜索结果数组
  } catch (error) {
    console.error('Error occurred while fetching search results:', error);
    return []; // 发生错误时返回空数组
  }
};

export { getPopularMovies };

