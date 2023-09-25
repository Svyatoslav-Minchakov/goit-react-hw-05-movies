import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieCastApi } from 'services/fetch';

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
    <ul>
      {data.cast &&
        data.cast.map(item => (
          <li key={item.id}>
            <p>{item.original_name}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt={item.original_name}
            />
          </li>
        ))}
    </ul>
  );
};

export default Cast;
