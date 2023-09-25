import { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { movieDetailsApi } from 'services/fetch';

const MovieDetails = () => {
  const [movieData, setMovieData] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await movieDetailsApi(movieId);
        setMovieData(response);
      } catch (error) {
        console.error('Під час завантаження даних сталася помилка:', error);
      }
    };
    getMovieDetails();
  }, [movieId]);

  return (
    <>
      <h2>{movieData.title}</h2>
      <p>Release date: {movieData.release_date}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
        alt={movieData.title}
      />
      <p>Description: {movieData.overview}</p>
      <p>film website: {movieData.homepage}</p>
      <NavLink to={'cast'}>Cast</NavLink>
      <NavLink to={'Reviews'}>Reviews</NavLink>

      <Outlet />
    </>
  );
};

export default MovieDetails;
