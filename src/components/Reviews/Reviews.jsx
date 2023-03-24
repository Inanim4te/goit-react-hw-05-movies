import css from './Reviews.module.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMovieById() {
    const KEY = '359e6ba07435d9fee7e2951e55fa38ce';
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${KEY}`
      );
      setReviews(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ul className={css.list}>
      {reviews.length ? (
        reviews.map(el => (
          <li key={el.id}>
            <b>Author: {el.author}</b>
            <p>{el.content}</p>
          </li>
        ))
      ) : (
        <div>We don't have any reviews for this movie.</div>
      )}
    </ul>
  );
}
