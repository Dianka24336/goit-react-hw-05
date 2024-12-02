import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviewsById } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import s from './MovieReviews.module.css'

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchMovieReviewsById(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <h3>Oops...Something went wrong!!!</h3>}
      {!isLoading && !isError &&reviews.length === 0  && (
        <p>We don&#39;t have any reviews for this movie</p>
      )}
      <ul >
        {reviews.map(({ id, author, content }) => (
          <li className={s.review} key={id}>
            <h4 className={s.title}>Author:{author}</h4>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
