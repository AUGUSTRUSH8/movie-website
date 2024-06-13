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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="搜索电影..."
        value={keyword}
        onChange={handleChange}
      />
      <button type="submit">搜索</button>
    </form>
  );
};

export default SearchBox;
