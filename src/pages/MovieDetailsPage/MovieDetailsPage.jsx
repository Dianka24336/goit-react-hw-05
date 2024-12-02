import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";



const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const goBackLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchMovieById(movieId);
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (isError) {
    return <h3>Oops...Something went wrong!!!</h3>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!movie) {
    return null;
  }

  const { poster_path, title, overview, genres, release_date, vote_average } =
    movie;

  return (
    <div>
      <Link to={goBackLink.current} className={s.goBackButton}><span>&#8592;</span>Go back</Link>

      <div className={s.card}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />

        <div className={s.info}>
          <h1>
            {title} ({new Date(release_date).getFullYear()})
          </h1>
          <p>User score: {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>
            {genres &&
              genres.map(({ id, name }) => <span key={id}>{name}</span>)}
          </p>
        </div>
      </div>
      <div className={s.details}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
