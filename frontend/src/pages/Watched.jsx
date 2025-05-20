import InnerPageBanner from "../component/InnerPageBanner";
import MovieCard from "../component/MovieCard";
import { useMovieContext } from '../context/MovieContext';
import { getMoviesById } from "../services/api";
import { useState, useEffect } from "react";

export const Watched = () => {   
    const { watchedMovies } = useMovieContext();
    const [fetchedWatchedMovies, setFetchedWatchedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWatched();
    }, [watchedMovies]);

    const fetchWatched = async () => {
        try {
            const results = await Promise.all(
                watchedMovies.map(id => getMoviesById(id))
            );
            setFetchedWatchedMovies(results);
        } catch (err) {
            setError('Failed to load watched movies.')
            console.log('Error:', err);
        } finally {
            setLoading(false);
            setError('');
        }
    };

    const props = {
        title: 'Previously watched'
    }

    return (
        <div className='innerPageContent'>
            <InnerPageBanner props={props} />
            {
                loading ? (
                    <div className='loading'>Loading...</div>
                ) : (
                    error ? (
                        <div className='errorMessage'>
                            <h3>{error}</h3>
                        </div>
                    ) : (
                        fetchedWatchedMovies.length ? (
                            <div id='movieList' className='movieList'>
                                {
                                    fetchedWatchedMovies?.map((movie) => <MovieCard movie={movie} key={movie.id} />)
                                }
                            </div>
                        ) : (
                            <p className='backupMessage'>There are no movies in the watched list.</p>
                        )
                    )
                )
            }
        </div>
    )
}
