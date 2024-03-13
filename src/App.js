// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import MovieForm from './components/MovieForm';
import ReviewForm from './components/ReviewForm';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import { Routes ,Route } from 'react-router-dom';
import { MovieProvider, useMovieContext } from './context/MovieContext';


const App = () => {
  const [isMovieFormOpen, setMovieFormOpen] = useState(false);
  const [isReviewFormOpen, setReviewFormOpen] = useState(false);
  const { movies } = useMovieContext();

  const openMovieForm = () => setMovieFormOpen(true);
  const closeMovieForm = () => setMovieFormOpen(false);

  const openReviewForm = () => setReviewFormOpen(true);
  const closeReviewForm = () => setReviewFormOpen(false);

  return (
    <MovieProvider>
      <div>
        <Header openMovieForm={openMovieForm} openReviewForm={openReviewForm} />
        {isMovieFormOpen && <MovieForm onClose={closeMovieForm} />}
        {isReviewFormOpen && <ReviewForm onClose={closeReviewForm} />}
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail/>} />
          
          <Route path='/' element={<MovieCard/>} />
        </Routes>
      </div>
    </MovieProvider>
  );
};

export default App;
