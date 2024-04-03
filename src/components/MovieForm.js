// components/MovieForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useMovieContext } from '../context/MovieContext';

const MovieForm = ({ onClose }) => {
  const { addMovie } = useMovieContext();

  const [movieData, setMovieData] = useState({
    name: '',
    releaseDate: '',
  });

  const [isMovieCreated, setIsMovieCreated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createMovie = async () => {
    try {
      const response = await axios.post('https://moviebackend-ybs6.onrender.com/movies', movieData);
    

      if (response.status === 200) {
        addMovie(response.data);
        setIsMovieCreated(true);
        setTimeout(() => onClose(), 2000);
      } else {
        console.error('Failed to create movie');
      }
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Movie</h2>

        {!isMovieCreated ? (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Movie Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={movieData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="releaseDate" className="block text-gray-700 font-bold mb-2">
                Release Date:
              </label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={movieData.releaseDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={createMovie}
            >
              Create Movie
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <p className="text-green-600 font-bold mb-4">Movie created successfully! Closing modal...</p>
        )}
      </div>
    </div>
  );
};

export default MovieForm;
