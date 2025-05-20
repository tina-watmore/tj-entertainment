import InnerPageBanner from "../component/InnerPageBanner";
import MovieCard from "../component/MovieCard";
import { useMovieContext } from '../context/MovieContext';
import { getMoviesById } from "../services/api";
import { useState, useEffect } from "react";

export const Upcoming = () => {   
    const { favouriteMovies } = useMovieContext();
    const [fetchedMovies, setFetchedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUpcomingFavourites();
    }, [favouriteMovies]);

    const fetchUpcomingFavourites = async () => {
        try {
            const results = await Promise.all(
                favouriteMovies.map(id => getMoviesById(id))
            );            
            setFetchedMovies(results);
        } catch (err) {
            setError('Failed to load upcoming favourite movies.')
            console.log('Error:', err);
        } finally {
            setLoading(false);
            setError('');
        }
    };

    const props = {
        title: 'Upcoming Favourites'
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
                                        movie.release_date > new Date().toISOString().split('T')[0] ? <MovieCard movie={movie} key={movie.id} /> : ''
                                    ))
                                }
                            </div>
                        ) : (
                            <p className='backupMessage'>There are no upcoming favourite movies.</p>
                        )
                    )
                )
            }
        </div>
    )
}
