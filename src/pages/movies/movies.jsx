import { useState } from 'react';
import { requestMovieApi } from 'services/fetch';

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
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" onChange={handleChange} />
        </label>
        <button>SEND</button>
      </form>

      <ul>
        {movies &&
          movies.map(mov => {
            return (
              <li key={mov.id}>
                <p>{mov.title}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                  alt={mov.original_title}
                />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Movies;
