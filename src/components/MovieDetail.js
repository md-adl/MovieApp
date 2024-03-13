// components/MovieDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const MovieDetail = () => {
  const { id } = useParams();
  const { movies, reviews } = useMovieContext();

  // Find the selected movie
  const selectedMovie = movies.find((movie) => movie.id === id);

  // Filter reviews for the current movie
  const movieReviews = reviews.filter((review) => review.movieId === id);

  return (
    <div>
      <div className="container mx-auto p-4">
       
            <h1>Hii</h1>
        
      </div>
    </div>
  );
};

export default MovieDetail;
