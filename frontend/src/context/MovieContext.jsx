import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [maybeMovies, setMaybeMovies] = useState([]);
  const [badMovies, setBadMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const movieLists = {
    favourite: { list: favouriteMovies, setList: setFavouriteMovies },
    maybe: { list: maybeMovies, setList: setMaybeMovies },
    bad: { list: badMovies, setList: setBadMovies },
    watched: { list: watchedMovies, setList: setWatchedMovies },
  };

  const toggleMovieInList = (movieId, listName, mutuallyExclusive = true) => {
    const { list, setList } = movieLists[listName];

    const isInList = list.includes(movieId);

    if (isInList) {
      // Remove
      setList(prev => prev.filter(x => x !== movieId));
    } else {
      // Add
      setList(prev => [...prev, movieId]);

      // If it's a mutually exclusive list (like favourite, maybe, bad)
      if (mutuallyExclusive) {
        for (const name in movieLists) {
          const { setList } = movieLists[name];

          const isDifferentList = name !== listName;
          const isNotWatched = name !== 'watched';

          if (isDifferentList && isNotWatched) {
            setList(prev => prev.filter(id => id !== movieId));
          }
        }
      }
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