// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ openMovieForm, openReviewForm }) => {
  const headerStyle = {
    backgroundColor: 'rgb(227, 232, 221)',
    color: 'black',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonStyle = {
    addMovie: {
      backgroundColor: 'rgb(255, 255, 255)', // white color
      color: 'rgb(0, 0, 255)', // blue color
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      cursor: 'pointer',
    },
    addReview: {
      backgroundColor: 'rgb(134, 123, 247)', // green color
      hoverBackgroundColor: 'rgb(0, 100, 0)', // darker green color on hover
      color: 'white',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      cursor: 'pointer',
    },
  };


  return (
    <div style={headerStyle}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
        MovieCritic
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button style={buttonStyle.addMovie} onClick={openMovieForm}>
          Add Movie
        </button>
        <button style={buttonStyle.addReview} onClick={openReviewForm}>
          Add Review
        </button>
      </div>
    </div>
  );
};

export default Header;
