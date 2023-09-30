import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { movieReviewsApi } from 'services/fetch';

const Reviews = () => {
  const [data, setData] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const response = await movieReviewsApi(movieId);
        setData(response);
      } catch (error) {
        console.error('Під час завантаження даних сталася помилка:', error);
      }
    };
    getMovieReviews();
  }, [movieId]);

  return (
    <Suspense>
      <ul>
        {data.map(item => {
          return (
            <li key={item.id}>
              <h2>{item.author}</h2>
              <p>{item.content}</p>
            </li>
          );
        })}
      </ul>
    </Suspense>
  );
};
export default Reviews;
