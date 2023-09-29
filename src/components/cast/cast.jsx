import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieCastApi } from 'services/fetch';
import scss from './cast.module.scss';

const Cast = () => {
  const [data, setData] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      try {
        const response = await movieCastApi(movieId);
        setData(response);
      } catch (error) {
        console.error('Під час завантаження даних сталася помилка:', error);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <ul className={scss.list}>
      {data.cast &&
        data.cast.map(item => (
          <li className={scss.item} key={item.id}>
            <p className={scss.name}>{item.original_name}</p>
            <img
              className={scss.image}
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt={item.original_name}
            />
          </li>
        ))}
    </ul>
  );
};

export default Cast;
