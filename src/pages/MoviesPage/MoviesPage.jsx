import { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import { fetchSearchMovie } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getSearchingMovie = async () => {
     
      if (!query) {
        setSearchMovie([]);
        return;
      }
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchSearchMovie(query);
        setSearchMovie(data.results);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchingMovie();
  }, [query]);

 
  const handleSubmit = (newValue) => {
    searchParams.set("query", newValue);
    setSearchParams(searchParams);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <h3>Oops...Something went wrong!!!</h3>}
      <Searchbar onSearch={handleSubmit} />
      {searchMovie.length > 0 && <MovieList movies={searchMovie} showTitle={false} />}
    </div>
  );
};

export default MoviesPage;
