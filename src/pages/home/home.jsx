import { homeRespToFavorites } from 'services/fetch';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import scss from './home.module.scss';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendyMovie = async () => {
      try {
        const response = await homeRespToFavorites();
        setMovies(response);
      } catch (error) {
        console.error('Сталася помилка під час завантаження даних:', error);
      }
    };

    getTrendyMovie();
  }, []);

  return (
    <ul className={scss.list}>
      {movies.map(movie => {
        return (
          <li className={scss.item} key={movie.id}>
            <NavLink className={scss.link} to={`/movies/${movie.id}`}>
              {movie.original_title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default Home;

//Ключ доступа к API: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdjNjUyNjU4ZDhkYjQyMjU2MjU1ZWJlODBlNTI5MCIsInN1YiI6IjY1MTA2ZTllM2E0YTEyMDBmZjRmMDc0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q2Xv1BHZcg7DH5aoyX8dxr4V865NR1NGCSxTbiP9rrU'
