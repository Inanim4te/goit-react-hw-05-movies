import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetchTrends();
  }, []);

  async function fetchTrends() {
    const KEY = '359e6ba07435d9fee7e2951e55fa38ce';
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`
      );
      setTrends(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <h1>Trending today</h1>
      <ul>
        {trends.length &&
          trends.map(el => {
            return (
              <li key={el.id}>
                <Link to={`movies/${el.id}`}>{el.title}</Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
}
