import axios from 'axios';

const API_KEY = 'ba7c652658d8db42256255ebe80e5290';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export async function homeRespToFavorites() {
  const response = await axios.get(
    `/trending/movie/week?api_key=${API_KEY}&page=1&language=en-US&include_adult=false`
  );
  return response.data.results;
}

export async function movieDetailsApi(movieId) {
  const response = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
  return response.data;
}

export async function movieCastApi(movieId) {
  const response = await axios.get(
    `/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
}

export async function movieReviewsApi(movieId) {
  const response = await axios.get(
    `/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
}
