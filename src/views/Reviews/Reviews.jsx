import { useState, useEffect } from 'react';

import { fetchMovieByIdReviews } from '../../services/api';
import Loader from 'react-loader-spinner';
import s from './Reviews.module.css';

export default function Reviews({ id }) {
  const [filmReviews, setFilmReviews] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    async function getFilmsById() {
      if (!id) {
        return;
      }
      try {
        setStatus('pending');
        const filmByIdReviews = await fetchMovieByIdReviews(id);
        if (filmByIdReviews) {
          setFilmReviews(filmByIdReviews);
          setStatus('result');
        }
        if (filmByIdReviews.length === 0) {
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
        <ul>
          {filmReviews.map(results => (
            <li className={s.items} key={results.id}>
              <p className={s.author}>{results.author}</p>
              <p className={s.content}>{results.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}