import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWRmZjBjMzM5OTFmMzFiNTNjOWY5NzY4NGM0ZTdiZCIsIm5iZiI6MTczMjcyOTAwNi40NDc2MjgzLCJzdWIiOiI2NzQ3NTY0NTllY2M0NzQ4NjljOWMzMWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OfIFc9jwrskwz5GvyH56oF7lbbBViIq4Ut5sE-r8PCA";

export const fetchTrendingMovie = async () => {
  const { data } = await axios.get("/trending/movie/day?language=en-US");
  return data;
};
export const fetchMovieById = async (id) => {
  const { data } = await axios.get(`/movie/${id}`);
  return data;
};

export const fetchMovieCreditsById = async (id) => {
  const { data } = await axios.get(`/movie/${id}/credits`);
  return data.cast;
};
export const fetchMovieReviewsById = async (id) => {
  const { data } = await axios.get(`/movie/${id}/reviews`);
  return data.results;
};

export const fetchSearchMovie = async (query) => {
  const { data } = await axios.get("/search/movie", {
    params: {
      query,
    },
  });
  return data;
};
