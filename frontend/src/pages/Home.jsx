import styles from './home.module.scss';
import MovieCard from '../component/MovieCard';
import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { getPopularMovies, getUpcomingMovies, getSearchedMovies, getTopRatedMovies } from '../services/api';

export const Home = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadPopularMovies();
    }, []);

    const loadPopularMovies = async () => {
        try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        } catch (err) {
            setError('Failed to load popular movies.')
            console.log('Error:', err);
        } finally {
            setLoading(false);
            setError('');
        }
    };

    const handleUpcomingMovies = async (e) => {
        e.preventDefault();

        try {
            const upcomingMovies = await getUpcomingMovies();
            setMovies(upcomingMovies);
        } catch (err) {
            setError('Failed to load upcoming movies.')
            console.log('Error:', err);
        } finally {
            setLoading(false);
            setError('');
        }
    };

    const handleTopRatedMovies = async (e) => {
        e.preventDefault();

        try {
            const topRatedMovies = await getTopRatedMovies();
            setMovies(topRatedMovies);
        } catch (err) {
            setError('Failed to load top rated movies.')
            console.log('Error:', err);
        } finally {
            setLoading(false);
            setError('');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (!searchQuery.trim()) {
            setSearchQuery('');
            alert('Search for a movie yo!');
            return;
        }

        try {
            setLoading(true);
            const searchedMovies = await getSearchedMovies(searchQuery);
            setMovies(searchedMovies);
            const movieListDiv = document.getElementById('movieList');
            movieListDiv.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            console.log('Searh error: ', err);
            setError('Failed to search movies.');
        } finally {
            setLoading(false);
            setError('');
        }
    }

    const handleReset = (e) => {
        e.preventDefault();

        loadPopularMovies();
        setSearchQuery('');
    }

    return (
        <div className={styles.homeContent}>
            <div className={styles.pageBanner}>
                <div className='container'>
                    <h1>What do you feel like watching?</h1>
                    <form type='submit' className={styles.searchForm}>
                        <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search for movies...' />
                        <button type='submit' className='styledBtn' onClick={handleSearch}>Search</button>
                        <button type='button' className='styledBtn' onClick={handleReset}>Reset</button>
                    </form>
                    <div className={styles.quickLinks}>
                        <button type='button' className='linkBtn' onClick={loadPopularMovies}>Popular</button>
                        <button type='button' className='linkBtn' onClick={handleUpcomingMovies}>Upcoming</button>
                        <button type='button' className='linkBtn' onClick={handleTopRatedMovies}>Top Rated</button>
                    </div>
                </div>
            </div>
            {loading && <div className='loading'>Loading...</div>}
            {
                error ? (
                    <div className='errorMessage'>
                        <h3>{error}</h3>
                    </div>
                ) : (
                    <div id='movieList' className='movieList'>
                        {
                            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
                        }
                    </div>
                )
            }
        </div>
    )
}

