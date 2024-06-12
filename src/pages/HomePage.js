// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/MovieService';
import MenuList from '../components/MenuList';

function HomePage() {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const loadMovies = async () => {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    };
    
    loadMovies();
  }, []);

  return (
    <div>
      <h1>流行电影</h1>
      <div>
        {movies.map(movie => (
  <div key={movie.id}>
    <h3>{movie.title}</h3>
		<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
  </div>
))}
      </div>
    </div>
  );
}

export default HomePage;

