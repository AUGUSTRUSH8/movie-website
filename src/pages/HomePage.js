// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { getMoviesByCategory, searchMovies } from '../services/MovieService';
import MenuList from '../components/MenuList';

import './HomePage.css'; // 确保文件路径正确

// 示例分类数据，可以根据实际情况进行调整
const categories = [
  {
    name: "电影",
    subcategories: ["流行电影", "高分电影", "经典电影"],
  },
  {
    name: "电视剧",
    subcategories: ["流行剧", "高分剧", "经典剧"],
  },
  {
    name: "记录片",
    subcategories: ["自然", "人文"],
  },
  // 其他分类...
];

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('流行电影'); // 默认选中的分类

  useEffect(() => {
    const loadMovies = async () => {
      // 根据选中的分类获取电影列表
      try {
        const moviesByCategory = await getMoviesByCategory(selectedCategory);
        setMovies(moviesByCategory);
      } catch (error) {
        console.error('电影数据加载失败：', error); // 在实际应用中，您应当处理这些错误
      }
    };

    loadMovies();
  }, [selectedCategory]); // 当 selectedCategory 改变时执行这个函数

  const handleCategorySelect = (categoryName, subCategoryName) => {
    console.log(`选中的分类：${categoryName} - ${subCategoryName}`);
    // 更新选中的子分类，这将触发 useEffect 重新加载对应分类的电影
    setSelectedCategory(subCategoryName);
  };

  const [searchResults, setSearchResults] = useState([]); // 新状态：用于存储搜索结果

   // 新增加的搜索逻辑
   const handleSearch = async (keyword) => {
    if (keyword) {
      const results = await searchMovies(keyword);
      setSearchResults(results);
    } else {
      setSearchResults([]); // 如果没有关键字，清除搜索结果
    }
  };

  // 当渲染内容时，根据是否有搜索结果来决定显示内容
  const displayedMovies = searchResults.length > 0 ? searchResults : movies;

  return (
    <div className="homepage-container">
      {/* 分类菜单 */}
      <div className="side-menu">
        <MenuList categories={categories} onCategorySelect={handleCategorySelect} />
      </div>

      {/* 电影列表内容 */}
      <div className="content">
      <h1>{searchResults.length > 0 ? '搜索结果' : selectedCategory}</h1>

        <div className="movies-list">
          {displayedMovies.length === 0 ? (
            <p>暂无电影展示</p>
          ) : (
            displayedMovies.map(movie => (
              <div key={movie.id} className="movie-item">
                <h3>{movie.title}</h3>
                {/* 注意：确保图片的路径是正确的 */}
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

