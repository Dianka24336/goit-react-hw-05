import { useEffect, useState } from "react";
import { fetchTrendingMovie } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  useEffect(() => {
    document.title = "TMDB";
  }, []);

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false)
        const data = await fetchTrendingMovie();
        setMovies(data.results);
        
      } catch (error) {
        console.error(error);
        setIsError(true)
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <h3>Oops...Something went wrong!!!</h3>}
      <MovieList movies={movies} showTitle={true}/>
    </div>
  );
};

export default HomePage;
