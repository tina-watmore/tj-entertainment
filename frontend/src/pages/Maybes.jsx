import InnerPageBanner from "../component/InnerPageBanner";
import MovieCard from "../component/MovieCard";
import { useMovieContext } from '../context/MovieContext';
import { getMoviesById } from "../services/api";
import { useState, useEffect } from "react";

export const Maybes = () => {   
    const { maybeMovies, watchedMovies } = useMovieContext();
    const [fetchedMaybeMovies, setFetchedMaybeMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMaybes();
    }, [maybeMovies, watchedMovies]);

    const fetchMaybes = async () => {
        try {
            const unwatchedMaybes = maybeMovies.filter(
                (id) => !watchedMovies.includes(id) 
            );
            const results = await Promise.all(
                unwatchedMaybes.map(id => getMoviesById(id))
            );
            setFetchedMaybeMovies(results);
        } catch (err) {
            setError('Failed to load favourite movies.')
            console.log('Error:', err);
        } finally {
            setLoading(false);
            setError('');
        }
    };

    const props = {
        title: 'Maybes'
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
                        fetchedMaybeMovies.length ? (
                            <div id='movieList' className='movieList'>
                                {
                                    fetchedMaybeMovies?.map((movie) => <MovieCard movie={movie} key={movie.id} />)
                                }
                            </div>
                        ) : (
                            <p className='backupMessage'>There are no movies in the maybe list.</p>
                        )
                    )
                )
            }
        </div>
    )
}
