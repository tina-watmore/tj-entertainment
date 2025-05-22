import axios from 'axios';
import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [maybeMovies, setMaybeMovies] = useState([]);
  const [badMovies, setBadMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/movies`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        setFavouriteMovies(res.data.favouriteMovies || []);
        setMaybeMovies(res.data.maybeMovies || []);
        setBadMovies(res.data.badMovies || []);
        setWatchedMovies(res.data.watchedMovies || []);
      } catch (error) {
        console.error('Failed to load movie lists:', error.response?.data || error.message);
      }
    };

    fetchMovies();
  }, []);  

  const movieLists = {
    favourite: { list: favouriteMovies, setList: setFavouriteMovies },
    maybe: { list: maybeMovies, setList: setMaybeMovies },
    bad: { list: badMovies, setList: setBadMovies },
    watched: { list: watchedMovies, setList: setWatchedMovies },
  };

  const toggleMovieInList = async (movieId, listName, mutuallyExclusive = true) => {
    const { list, setList } = movieLists[listName];
    const isInList = list.includes(movieId);

    let updatedFavourite = [...favouriteMovies];
    let updatedMaybe = [...maybeMovies];
    let updatedBad = [...badMovies];
    let updatedWatched = [...watchedMovies];

    if (isInList) {
      // Remove
      setList(prev => prev.filter(x => x !== movieId));
      if (listName === 'favourite') updatedFavourite = updatedFavourite.filter(id => id !== movieId);
      if (listName === 'maybe') updatedMaybe = updatedMaybe.filter(id => id !== movieId);
      if (listName === 'bad') updatedBad = updatedBad.filter(id => id !== movieId);
      if (listName === 'watched') updatedWatched = updatedWatched.filter(id => id !== movieId);
    } else {
      // Add
      setList(prev => [...prev, movieId]);
      if (listName === 'favourite') updatedFavourite.push(movieId);
      if (listName === 'maybe') updatedMaybe.push(movieId);
      if (listName === 'bad') updatedBad.push(movieId);
      if (listName === 'watched') updatedWatched.push(movieId);

      if (mutuallyExclusive) {
        for (const name in movieLists) {
          if (name !== listName && name !== 'watched') {
            movieLists[name].setList(prev => prev.filter(id => id !== movieId));
            if (name === 'favourite') updatedFavourite = updatedFavourite.filter(id => id !== movieId);
            if (name === 'maybe') updatedMaybe = updatedMaybe.filter(id => id !== movieId);
            if (name === 'bad') updatedBad = updatedBad.filter(id => id !== movieId);
          }
        }
      }
    }

    // Save to backend
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/user/movies`, {
        favouriteMovies: updatedFavourite,
        maybeMovies: updatedMaybe,
        badMovies: updatedBad,
        watchedMovies: updatedWatched
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('Failed to update movie list:', error.response?.data || error.message);
    }
  };  

  const isInMovieList = (movieId, listName) => {
    return movieLists[listName].list.includes(movieId)
  }

  const values = {
    toggleMovieInList,
    favouriteMovies,
    maybeMovies,
    badMovies,
    watchedMovies,
    isInMovieList
  }

  return (
    <MovieContext.Provider value={ values }>
      {children}
    </MovieContext.Provider>
  )
}