import { useHistory, useLocation } from 'react-router-dom';
import QueryFilms from '../QueryFilms/QueryFilms';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();


  const formSubmitQuery = query => {
    historyPush(query);

  };

  const historyPush = query => {
    history.push({
      ...location,
      search: `${query}`,
    });
  };

  return (
    <div className={s.container}>
      <form
        className={s.form}
        onSubmit={e => {
          e.preventDefault();
          const query = e.target.elements.filmQuery.value;
          formSubmitQuery(query);
          e.target.reset();
        }}
      >
        <input
          name="filmQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
        />

        <button className={s.button}>
          <span>Search</span>
        </button>
      </form>

      <QueryFilms

      />
    </div>
  );
}