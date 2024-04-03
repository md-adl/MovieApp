// MovieContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesResponse, reviewsResponse] = await Promise.all([
          axios.get('https://moviebackend-ybs6.onrender.com/movies'), 
          axios.get('https://moviebackend-ybs6.onrender.com/reviews'),           
        ]);
        setMovies(moviesResponse.data);
        setReviews(reviewsResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [movies]);

  const updateMovie = (updatedMovie) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
      return updatedMovies;
    });
  };

  const addMovie = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  const removeMovie = (movieId) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
  };

  const addReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const getReviewsByMovieId = (movieId) => {
    return reviews.filter((review) => review.movieId === movieId);
  };

  return (
    <MovieContext.Provider
      value={{ movies, reviews, updateMovie, addMovie, removeMovie, addReview, getReviewsByMovieId }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};
