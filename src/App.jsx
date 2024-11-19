import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalMovie, setModalMovie] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const handleSearch = async (query) => {
    if (query) {
      setIsSearch(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setIsSearch(false);
      fetchPopularMovies();
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <header className="bg-black p-6 flex justify-between items-center">
        <div className="flex mt-2 items-center space-x-2">
          <h1 className="text-3xl font-bold text-gray-800">Movie Finder</h1>
        </div>
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder=" Search For A Movie...                                          🔍"
            className="w-full max-w-[400px] mx-auto p-4 rounded-full focus:ring-2 focus:ring-white bg-[rgba(255,255,255,0.1)] border-2 border-[rgba(100,100,100,0.5)] backdrop-blur-md transition-all hover:border-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-semibold text-center mb-7">
          {isSearch ? `Results For : ${searchQuery} Movies` : 'Popular Movies'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
          {movies.length === 0 ? (
            <p className="text-center text-gray-400">No Movies Found.</p>
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} setModalMovie={setModalMovie} />
            ))
          )}
        </div>
      </main>

      {modalMovie && (
        <MovieModal movie={modalMovie} setModalMovie={setModalMovie} />
      )}

      <footer className="bg-black-100 text-gray-300 py-4 text-center">
        <p className="text-sm">
          Developed by <em><a href="https://prakaash.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@Prakaash</a></em> Using <strong>React.js</strong> & <strong>Tailwind CSS</strong>
        </p>
        <p className="text-sm">Dated: November 18, 2024</p>
        <p className="text-sm"><strong>Fluid AI</strong> | Frontend Developer Assignment </p>
      </footer>
      
    </div>
  );
};

export default App;
