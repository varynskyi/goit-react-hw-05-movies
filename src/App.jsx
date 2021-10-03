import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import Appbar from './components/AppBar/AppBar';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage'),
);
const MoviesPage = lazy(() =>
  import(
    './views/MoviesPage/MoviesPage'),
);
const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetails/MovieDetails'),
);

function App() {
  return (
    <div>
      <Appbar />
      <Suspense
        fallback={
          <Loader
            type="Puff"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000} 
          />
        }
      >
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route path="/movies" component={MoviesPage} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;