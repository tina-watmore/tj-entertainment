import InnerPageBanner from "../component/InnerPageBanner";
import MovieCard from "../component/MovieCard";
import { useMovieContext } from '../context/MovieContext';
import { getMoviesById } from "../services/api";
import { useState, useEffect } from "react";

export const Favourites = () => {   
    const { favouriteMovies, watchedMovies } = useMovieContext();
    const [fetchedMovies, setFetchedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFavourites();
    }, [favouriteMovies, watchedMovies]);

    const fetchFavourites = async () => {
        try {
            const unwatchedFavourites = favouriteMovies.filter(
            (id) => !watchedMovies.includes(id)
            );  
            const results = await Promise.all(
                unwatchedFavourites.map(id => getMoviesById(id))
            );                   
            setFetchedMovies(results);
        } catch (err) {
            setError('Failed to load favourite movies.')
            console.log('Error:', err);
        } finally {
            setLoading(false);
            setError('');
        }
    };

    const props = {
        title: 'Favourites'
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
                        fetchedMovies.length ? (
                            <div id='movieList' className='movieList'>
                                {                                    
                                    fetchedMovies?.map((movie) => (
                                        movie.release_date < new Date().toISOString().split('T')[0] ? <MovieCard movie={movie} key={movie.id} /> : ''
                                    ))
                                }
                            </div>
                        ) : (
                            <p className='backupMessage'>There are no favourite movies.</p>
                        )
                    )
                )
            }
        </div>
    )
}
