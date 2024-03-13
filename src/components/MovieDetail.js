// components/MovieDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";

const MovieDetail = () => {
  const { id } = useParams();
  const { movies, reviews } = useMovieContext();

  // Find the selected movie
  const selectedMovie = movies.find((movie) => movie._id === id);
  console.log(selectedMovie);

  // Filter reviews for the current movie
  const movieReviews = reviews.filter((review) => review.movieId === id);
  console.log(movieReviews);

  return (
    <div>
      <div className="container mx-auto p-4">
        {selectedMovie && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedMovie.name}</h2>
          
              <p className="font-bold text-xl text-blue-500">
                {movieReviews.length > 0 ? movieReviews[0].rating : "N/A"} out
                of 10
              </p>
            </div>
            <div className="bg-slate-300 rounded p-4 flex">
              <div className="flex-1">
                {movieReviews.map((review) => (
                  <div key={review.id} className="mb-4">
                    <p>Review: {review.reviewComments}</p>
                    <p>By: {review.reviewerName}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-end justify-between">
                <div className="mb-4">
                  <p className="font-bold text-xl text-blue-500">
                    {movieReviews.length > 0 ? movieReviews[0].rating : "N/A"}{" "}
                    out of 10
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
