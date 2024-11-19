import React from 'react';
const MovieCard = ({ movie, setModalMovie }) => {
  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  return (
    <div
      className="cursor-pointer bg-transparent text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all"
      onClick={() => setModalMovie(movie)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-80 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
        <p className="text-gray-600">{movie.overview ? movie.overview.slice(0, 100) + '...' : 'No Overview Available'}</p>
      </div>
      <div className="p-4 bg-gray-900 bg-opacity-40 flex justify-between items-center">
        <div className="text-pink-500 font-bold flex items-center">
          <span className="mr-1">⭐</span>
          <p>{movie.rating || movie.vote_average}</p>
        </div>
        <div className="text-gray-400 text-sm flex items-center">
          <p>🗓️ {formatDate(movie.release_date)}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
