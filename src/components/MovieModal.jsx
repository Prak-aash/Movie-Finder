import React, { useEffect, useState } from 'react';

const MovieModal = ({ movie, setModalMovie }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setModalMovie(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const genres = movie.genres && movie.genres.length > 0
    ? movie.genres.map(genre => genre.name).join(', ')
    : 'Information not available';

  const rating = movie.vote_average ? movie.vote_average : 'Information not available';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'Information not available';
  const language = movie.original_language ? movie.original_language.toUpperCase() : 'Information not available';

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    setIsOpen(true);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      setIsOpen(false);
    };
  }, []);

  return (
    <div className={`modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-lg transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg relative w-11/12 sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-1/2 2xl:w-2/3 max-w-5xl h-auto max-h-screen overflow-y-auto transition-all duration-500 transform ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <button onClick={closeModal} className="absolute top-2 right-2 text-white text-2xl sm:hidden">&times;</button>

        <div className="flex flex-col md:flex-row max-h-screen overflow-y-auto">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 object-cover h-72 sm:h-96 md:h-auto"
          />
          <div className="p-4 w-full md:w-2/3 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-400 mb-4">{formatDate(movie.release_date)}</p>

            <h3 className="text-lg font-semibold mt-6 mb-1">Overview:</h3>
            <p className="text-sm text-gray-400">{movie.overview}</p>

            <div className="mt-5 mb-4">
              <strong className="text-lg">Genres: </strong>
              <span>{genres}</span>
            </div>
            <div className="mb-4">
              <strong className="text-lg">Rating: </strong>
              <span>{rating}</span>
            </div>
            <div className="mb-4">
              <strong className="text-lg">Runtime: </strong>
              <span>{runtime}</span>
            </div>
            <div className="mb-4">
              <strong className="text-lg">Language: </strong>
              <span>{language}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;