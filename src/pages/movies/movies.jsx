import { useState } from 'react';
import { requestMovieApi } from 'services/fetch';
import { Link } from 'react-router-dom';
import scss from './movies.module.scss';

const Movies = () => {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState([]);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const response = await requestMovieApi(value);
      setMovies(response);
    } catch (error) {
      console.error('Під час завантаження даних сталася помилка:', error);
    }
  };

  return (
    <div className={scss.container}>
      <form onSubmit={handleSubmit}>
        <label className={scss.label}>
          <input className={scss.input} type="text" onChange={handleChange} />
          <button className={scss.btn}>SEND</button>
        </label>
      </form>

      <ul className={scss.list}>
        {movies &&
          movies.map(mov => {
            console.log(mov);
            return (
              <li className={scss.item} key={mov.id}>
                <Link to={`/movies/${mov.id}`}>
                  <p>{mov.title}</p>
                  <img
                    className={scss.image}
                    src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                    alt={mov.original_title}
                  />
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Movies;
