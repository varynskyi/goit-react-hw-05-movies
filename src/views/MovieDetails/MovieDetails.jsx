import { useState, useEffect } from 'react';
import {
  useParams,
  Route,
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { fetchMovieById } from '../../services/api';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import s from './MovieDetails.module.css';

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { movieId } = useParams();
  const [film, setFilm] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    async function getFilmsById() {
      try {
        setStatus('pending');
        const filmById = await fetchMovieById(movieId);

        setFilm(filmById);
        setStatus('result');
      } catch (error) {
        console.log(error);
      }
    }
    getFilmsById();
  }, [movieId]);

  const onGoBack = () => {
    if (!location.state) {
      return history.push('/');
    }
    history.push(location.state.from);
  };

  return (
    <div className={s.container}>
      <button onClick={onGoBack} type="button" className={s.buttonLink}>
        <p>Go Back</p>
      </button>
      <hr />

      {status === 'pending' && (
        <span>
          <Loader type="Puff" color="#00BFFF" height={80} width={80} />
        </span>
      )}

      {status === 'result' && (
        <div className={s.flex}>
          <img
            className={s.img}
            src={
              film.poster_path ? (
                `https://image.tmdb.org/t/p/w500${film.poster_path}`
              ) : (
                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={80}
                  width={80}
                />
              )
            }
            alt={film.name}
          />
          <div className={s.infoBox}>
            <h1>
              {film.name}
              {film.title}
            </h1>
            <p>
              Release date {film.release_date} {film.first_air_date}
            </p>
            <h2> Overview </h2>
            <p>{film.overview}</p>
            <h2>Ganre</h2>
            {film.genres && (
              <ul className={s.list}>
                {film.genres.map(ganre => (
                  <li key={ganre.id}>{ganre.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <hr />
      <Link
        to={{
          pathname: `/movies/${movieId}/cast`,
          state: { from: location },
        }}
      >
        <button className={s.buttonLink}>Cast</button>
      </Link>

      <Link
        to={{
          pathname: `/movies/${movieId}/reviews`,
          state: { from: location },
        }}
      >
        <button className={s.buttonLink}>Reviews</button>
      </Link>
      <hr />

      {film && (
        <Route path="/movies/:movieId/cast" exact>
          <Cast id={film.id} />
        </Route>
      )}

      {film && (
        <Route path="/movies/:movieId/reviews" exact>
          <Reviews id={film.id} />
        </Route>
      )}
    </div>
  );
}