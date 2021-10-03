import axios from 'axios';

const getFilms = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    method: 'GET',
    params: {
        api_key: '1b1da8703e37250de45d6e1ee8fd6e86',
    },
});
    
export const fetchMovieTrending = async () => {
  const {
    data: { results },
  } = await getFilms(`trending/movie/day?`);
  return results;
};

export const fetchMovieQuery = async query => {
  const {
    data: { results },
  } = await getFilms(
    `search/movie?&language=en-US&query=${query}&page=1&include_adult=false`,
  );
  return results;
};

export const fetchMovieById = async movieId => {
  const { data } = await getFilms(`movie/${movieId}?&language=en-US`);
  return data;
};

export const fetchMovieByIdCast = async movieId => {
  const {
    data: { cast },
  } = await getFilms(`movie/${movieId}/credits?&language=en-US`);
  return cast;
};

export const fetchMovieByIdReviews = async movieId => {
  const {
    data: { results },
  } = await getFilms(`movie/${movieId}/reviews?&language=en-US`);
  return results;
};



