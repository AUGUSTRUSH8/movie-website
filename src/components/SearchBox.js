// src/components/SearchBox.js
import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <input
        type="search"
        className="search-box"
        placeholder="搜索电影..."
        value={keyword}
        onChange={handleChange}
      />
      <button type="submit" className="search-btn">搜索</button>
    </form>
  );
};

export default SearchBox;
