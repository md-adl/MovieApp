// components/ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useMovieContext } from '../context/MovieContext';

const ReviewForm = ({ onClose, movieId }) => {
  const {movies, addReview } = useMovieContext();

  const [reviewData, setReviewData] = useState({
    reviewerName: '',
    rating: '',
    reviewComments: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createReview = async () => {
    try {
      const response = await axios.post(`https://glacial-refuge-27739-b9094db638ef.herokuapp.com/reviews`, {
        movieId,
        ...reviewData,
      });
      if (response.status === 200) {
        // Update the review list in the context
        addReview(response.data);
        // Close the modal after creating the review
        onClose();
      } else {
        // Handle error
        console.error('Failed to create review');
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Review</h2>
        <div className="mb-4">
          <label htmlFor="movieId" className="block text-gray-700 font-bold mb-2">
            Movie:
          </label>
          <select
            id="movieId"
            name="movieId"
            value={reviewData.movieId}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="reviewerName" className="block text-gray-700 font-bold mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="reviewerName"
            name="reviewerName"
            value={reviewData.reviewerName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
            Rating (out of 10):
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={reviewData.rating}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reviewComments" className="block text-gray-700 font-bold mb-2">
            Review Comments:
          </label>
          <textarea
            id="reviewComments"
            name="reviewComments"
            value={reviewData.reviewComments}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={createReview}
        >
          Submit Review
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
