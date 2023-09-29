import { useState, useEffect } from 'react';
import { requestMovieApi } from 'services/fetch';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import scss from './movies.module.scss';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const queryRequest = searchParams.get('query') ?? '';
  // console.log(location);

  const handleChange = e => {
    setSearchParams({ query: e.target.value });
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const queryRequest = searchParams.get('query') ?? '';
      const response = await requestMovieApi(queryRequest);
      setMovies(response);
    } catch (error) {
      console.error('Під час завантаження даних сталася помилка:', error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await requestMovieApi(queryRequest);
        setMovies(response);
      } catch (error) {
        console.error('Під час завантаження даних сталася помилка:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={scss.container}>
      <form onSubmit={handleSubmit}>
        <label className={scss.label}>
          <input
            className={scss.input}
            type="text"
            onChange={handleChange}
            value={queryRequest}
          />
          <button className={scss.btn}>SEND</button>
        </label>
      </form>

      <ul className={scss.list}>
        {movies &&
          movies.map(mov => {
            return (
              <li className={scss.item} key={mov.id}>
                <Link to={`/movies/${mov.id}`} state={location}>
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

// import { useState, useEffect } from 'react';
// import { requestMovieApi } from 'services/fetch';
// import { Link, useLocation, useSearchParams } from 'react-router-dom';
// import { debounce } from 'lodash';
// import scss from './movies.module.scss';

// const Movies = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const location = useLocation();
//   const queryRequest = searchParams.get('query') ?? '';
//   // console.log(location);

//   const handleChange = e => {
//     setSearchParams({ query: e.target.value });
//   };

//   const handleSubmit = async e => {
//     try {
//       e.preventDefault();
//       const queryRequest = searchParams.get('query') ?? '';
//       const response = await requestMovieApi(queryRequest);
//       setMovies(response);
//     } catch (error) {
//       console.error('Під час завантаження даних сталася помилка:', error);
//     }
//   };

//   const fetchMovies = debounce(async query => {
//     try {
//       const response = await requestMovieApi(query);
//       setMovies(response);
//     } catch (error) {
//       console.error('Під час завантаження даних сталася помилка:', error);
//     }
//   }, 300);

//   useEffect(() => {
//     fetchMovies(queryRequest);
//   }, []);

//   return (
//     <div className={scss.container}>
//       <form onSubmit={handleSubmit}>
//         <label className={scss.label}>
//           <input
//             className={scss.input}
//             type="text"
//             onChange={handleChange}
//             value={queryRequest}
//           />
//           <button className={scss.btn}>SEND</button>
//         </label>
//       </form>

//       <ul className={scss.list}>
//         {movies &&
//           movies.map(mov => {
//             return (
//               <li className={scss.item} key={mov.id}>
//                 <Link to={`/movies/${mov.id}`} state={location}>
//                   <p>{mov.title}</p>
//                   <img
//                     className={scss.image}
//                     src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
//                     alt={mov.original_title}
//                   />
//                 </Link>
//               </li>
//             );
//           })}
//       </ul>
//     </div>
//   );
// };

// export default Movies;
