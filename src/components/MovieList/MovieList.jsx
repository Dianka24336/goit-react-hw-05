import { Link, useLocation } from "react-router-dom";
import s from './MovieList.module.css'

const MovieList = ({ movies,showTitle }) => {
  const location = useLocation();
  return (
    <div>
      {/* <h1>Trending today</h1> */}
      {showTitle && <h1>Trending today</h1>}
      <ul className={s.list}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
