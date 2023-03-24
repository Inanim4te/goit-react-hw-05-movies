import css from './Cast.module.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMovieById() {
    const KEY = '359e6ba07435d9fee7e2951e55fa38ce';
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}`
      );
      setCast(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ul className={css.list}>
      {cast.map(el => (
        <li key={el.id}>
          <img
            src={
              el.profile_path &&
              `https://image.tmdb.org/t/p/w200/${el.profile_path}`
            }
            className={css.image}
            alt="character"
          />
          <p>{el.name}</p>
          <p>Character: {el.character}</p>
        </li>
      ))}
    </ul>
  );
}
