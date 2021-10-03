import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieByIdCast } from '../../services/api';
import Loader from 'react-loader-spinner';
import s from './Cast.module.css';

export default function Cast({ id }) {
  const [filmCast, setFilmCast] = useState([]);
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    async function getFilmsById() {
      if (!id) {
        return;
      }
      try {
        setStatus('pending');
        const filmByIdCast = await fetchMovieByIdCast(id);
        if (filmByIdCast) {
          setFilmCast(filmByIdCast);
          setStatus('result');
        }
        if (filmByIdCast.length === 0) {
          setStatus('not result');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getFilmsById();
  }, [id]);

  return (
    <div className={s.infoBox}>
      {status === 'pending' && (
        <span>
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </span>
      )}
      {status === 'not result' && <span>not results</span>}
      {status === 'result' && (
        <ul className={s.list}>
          {filmCast.map(cast => (
            <li className={s.items} key={cast.id}>
              <img
                className={s.img}
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
              />
              <span className={s.name}>{cast.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Cast.propTypes = {
  id: PropTypes.number,
};