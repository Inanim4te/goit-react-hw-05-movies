import css from './Movies.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(() => searchParams.get('query') ?? '', [searchParams]);
  const location = useLocation();

  useEffect(() => {
    if (query === '') {
      return;
    }
    fetchMoviesByName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputValueHandler = e => {
    setSearchParams(e.target.value !== '' ? { query: e.target.value } : {});
  };

  const searchMoviesHandler = e => {
    e.preventDefault();
    fetchMoviesByName();
  };

  async function fetchMoviesByName() {
    const KEY = '359e6ba07435d9fee7e2951e55fa38ce';
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <div className={css.formWrap}>
        <form onSubmit={searchMoviesHandler} className={css.form}>
          <input
            type="text"
            className={css.input}
            value={query}
            onChange={inputValueHandler}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
      <div>
        <ul>
          {movies.map(el => {
            return (
              <li key={el.id}>
                <Link to={`${el.id}`} state={{ from: location }}>
                  {el.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
