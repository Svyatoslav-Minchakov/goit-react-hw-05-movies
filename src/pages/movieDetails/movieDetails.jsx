import { useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/fetch';

const MovieDetails = () => {
  const { movieId } = useParams();
  console.log(movieId);
  console.log(getMovieDetails(movieId));
  return (
    <>
      <h2>title</h2>
      <img src="" alt="" />
    </>
  );
};

export default MovieDetails;
