import css from './MovieDetails.module.css';
import axios from 'axios';
import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useLocation, useParams, Link, Outlet } from 'react-router-dom';

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [year, setYear] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    fetchMovieById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!Object.keys(movie).length) {
      return;
    }
    setUserScore(Math.round((movie.vote_average * 100) / 10));
    setYear(movie.release_date.slice(0, 4));
    setIsLoading(false);
  }, [movie]);

  async function fetchMovieById() {
    const KEY = '359e6ba07435d9fee7e2951e55fa38ce';
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`
      );
      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const { poster_path, title, overview, genres } = movie;

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <main>
          <div className={css.wrap}>
            <Link to={backLinkHref.current} className={css.link}>
              <span className={css.span}>←</span> Go back
            </Link>
            <div className={css.movieWrap}>
              <img
                src={
                  poster_path &&
                  `https://image.tmdb.org/t/p/w500/${poster_path}`
                }
                alt="poster"
                className={css.image}
              />
              <div className={css.info}>
                <div>
                  <h2>{`${title} (${year})`}</h2>
                  <p>User score: {userScore}%</p>
                </div>
                <div>
                  <h3>Overview</h3>
                  <p>{overview}</p>
                </div>
                <div>
                  <h3>Genres</h3>
                  <ul className={css.genres}>
                    {genres &&
                      genres.map(el => (
                        <li key={el.id}>
                          <p>{el.name}</p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      )}
    </>
  );
}
