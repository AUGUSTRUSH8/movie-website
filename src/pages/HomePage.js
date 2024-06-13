// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { getMoviesByCategory, searchMovies } from '../services/MovieService';
import MenuList from '../components/MenuList';
import SearchBox from '../components/SearchBox'; // 确保正确导入SearchBox组件
import './HomePage.css';

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
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('流行电影');
  const [isLoading, setIsLoading] = useState(false); // 新状态：加载状态

  useEffect(() => {
    if (!searchResults.length) {
      const loadMovies = async () => {
        setIsLoading(true); // 开始加载时设置为 true
        try {
          const moviesByCategory = await getMoviesByCategory(selectedCategory);
          setMovies(moviesByCategory);
        } catch (error) {
          console.error('电影数据加载失败:', error);
        }
        setIsLoading(false); // 加载完成后设置为 false
      };

      loadMovies();
    }
  }, [selectedCategory, searchResults.length]); // 当 selectedCategory 改变或搜索结果清空时执行

  const handleCategorySelect = (categoryName, subCategoryName) => {
    console.log(`选中的分类：${categoryName} - ${subCategoryName}`);
    setSelectedCategory(subCategoryName);
    setSearchResults([]); // 选择分类后清空搜索结果
  };

  const handleSearch = async (keyword) => {
    setIsLoading(true); // 开始加载时设置为 true
    if (keyword) {
      const results = await searchMovies(keyword);
      // 在此处不立即清除 searchResults
      setTimeout(() => {
        setSearchResults(results); // 加入延时，确保加载指示可见
        // setIsLoading(false);
      }, 500); // 延时时间可根据实际加载时间调整
    } else {
      setSearchResults([]);
      // setIsLoading(false);
    }
  };

  // 根据是否有搜索结果自动选择展示搜索结果或普通分类电影列表
  const displayedMovies = searchResults.length > 0 ? searchResults : movies;

  return (
    <div className="homepage-container">
      <div className="side-menu">
        {/* 集成SearchBox至菜单列表顶部 */}
        <SearchBox onSearch={handleSearch} />
        {/* 以下为原MenuList组件，现在只用来展示分类 */}
        <MenuList categories={categories} onCategorySelect={handleCategorySelect} />
      </div>
      <div className="content">
        <h1>{searchResults.length > 0 ? '搜索结果' : selectedCategory}</h1>
        {isLoading ? (
          <div className={`loading-container ${isLoading ? 'show' : ''}`}>正在加载...</div>
        ) : (
          <div className={`movies-list ${!isLoading ? 'show' : ''}`}>
            {displayedMovies.length > 0 ? (
              displayedMovies.map(movie => (
                <div key={movie.id} className="movie-item">
                  <h3>{movie.title}</h3>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
                </div>
              ))
            ) : (
              <p>暂无电影展示</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
