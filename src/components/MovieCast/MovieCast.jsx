import { useEffect, useState } from "react";
import { fetchMovieCreditsById } from "../../services/api";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import s from './MovieCast.module.css'


const MovieCast = () => {
  const { movieId } = useParams();

  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false)
        const data  = await fetchMovieCreditsById(movieId);
        setCredits(data);
      } catch (error) {
        console.error(error);
        setIsError(true)
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div>
        {isLoading && <Loader/>}
        {isError && <h3>Oops...Something went wrong!!!</h3>}
      <ul>
        {credits.map(({ id, profile_path, name, character }) => 
          <li key={id}>
            <img className={s.cast_img}
              src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
              alt={name}
            />
            <h4>{name}</h4>
            <p>Character: {character}</p>
          </li>
        )}
      </ul>
      
    </div>
  );
};

export default MovieCast;
