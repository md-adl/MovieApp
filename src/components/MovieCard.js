import React from "react";
import { useMovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

const MovieCard = () => {
  const { reviews, movies } = useMovieContext();
  const [searchTerm, setSearchTerm] = React.useState("");

  const calculateAverageRating = (movieId) => {
    const movieReviews = reviews.filter((review) => review.movieId === movieId);

    if (movieReviews.length > 0) {
      const totalRating = movieReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / movieReviews.length;
      return averageRating.toFixed(1);
    }

    return "N/A";
  };

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <h1 className="text-4xl p-4">The Best Movie Review Sites</h1>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3 mb-4 md:mb-0 md:ml-5">
          <input
            type="text"
            placeholder="Search by movie name"
            className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M15 10a5.98 5.98 0 1 0-11.972 0A5.98 5.98 0 0 0 15 10z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap w-full">
          {filteredMovies.map((movie) => (
            <Link to={`/movie/${movie._id}`} key={movie._id} className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="bg-slate-300 rounded p-4 h-64">
                <h3 className="text-xl font-bold">{movie.name}</h3>
                <p>Release Date: {movie.releaseDate}</p>
                <p>Average Rating: {calculateAverageRating(movie._id)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieCard;
