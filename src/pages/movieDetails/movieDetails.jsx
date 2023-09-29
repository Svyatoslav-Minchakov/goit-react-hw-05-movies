import { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useParams,
  Link,
} from 'react-router-dom';
import { movieDetailsApi } from 'services/fetch';
import scss from './movieDetails.module.scss';

const MovieDetails = () => {
  const [movieData, setMovieData] = useState({});
  const { movieId } = useParams();
  const location = useLocation();

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

  // console.log(movieData);

  return (
    <div className={scss.container}>
      <div>
        <Link className={scss.back} to={location.state ?? '/'}>
          Back
        </Link>
        <img
          className={scss.image}
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
        />
      </div>

      <div className={scss.right_side}>
        <h2>{movieData.title}</h2>
        <p>Release date: {movieData.release_date}</p>
        <p>Description: {movieData.overview}</p>
        <p>film website: {movieData.homepage}</p>
        <div className={scss.btn_box}>
          <NavLink className={scss.btn_dop_info} to={'cast'}>
            Cast
          </NavLink>
          <NavLink className={scss.btn_dop_info} to={'Reviews'}>
            Reviews
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetails;
