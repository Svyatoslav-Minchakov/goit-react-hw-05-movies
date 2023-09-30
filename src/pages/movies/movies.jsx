import { useState, useEffect, Suspense } from 'react';
import { requestMovieApi } from 'services/fetch';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import scss from './movies.module.scss';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const queryRequest = searchParams.get('query') ?? '';

  const handleSubmit = async e => {
    e.preventDefault();
    const query = e.target.query.value.trim().toLowerCase();
    if (!query) return;
    setSearchParams({ query });
  };

  useEffect(() => {
    if (!queryRequest) return;
    const fetchMovies = async () => {
      try {
        const response = await requestMovieApi(queryRequest);
        setMovies(response);
      } catch (error) {
        console.error('Під час завантаження даних сталася помилка:', error);
      }
    };

    fetchMovies();
  }, [queryRequest]);

  return (
    <Suspense>
      <div className={scss.container}>
        <form onSubmit={handleSubmit}>
          <label className={scss.label}>
            <input className={scss.input} type="text" name="query" />
            <button className={scss.btn}>SEND</button>
          </label>
        </form>

        <ul className={scss.list}>
          {movies &&
            movies.map(mov => {
              return (
                <li className={scss.item} key={mov.id}>
                  <Link
                    className={scss.link}
                    to={`/movies/${mov.id}`}
                    state={{ from: location }}
                  >
                    <p className={scss.title}>{mov.title}</p>
                    <img
                      className={scss.image}
                      src={
                        mov.poster_path
                          ? `https://image.tmdb.org/t/p/w500${mov.poster_path}`
                          : 'https://fakeimg.pl/200x283?text=NOT+FOUND&font=bebas'
                      }
                      alt={mov.original_title}
                    />
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </Suspense>
  );
};

export default Movies;
