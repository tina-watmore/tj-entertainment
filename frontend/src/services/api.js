const API_KEY = '60cb2eb701403b0dac0b9cb5871b8cb6';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getUpcomingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getTopRatedMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getSearchedMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    return data.results;
};

export const getMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

export const getMoviesById = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

