import styles from './MovieCard.module.scss';
import { getMovieDetails } from '../services/api';
import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';

const MovieCard = ({ movie }) => {    
    const [movieDetails, setMovieDetails] = useState({});
    const [showInfo, setShowInfo] = useState(false);  
    const { 
        isInMovieList,
        toggleMovieInList,
     } = useMovieContext();

    const handleInfoClick = async () => {
        setShowInfo(!showInfo);
        const movieDetailsResponse = await getMovieDetails(movie.id);
        setMovieDetails(movieDetailsResponse);
    }

    const handleIconClick = (listType, movieId, mutuallyExclusive) => {
        toggleMovieInList(movieId, listType, mutuallyExclusive);
    }

    return (
        <div className={`${styles.movieCardContainer} ${showInfo ? styles.showInfoPopup : ''}`}>
            <div className={styles.movieCard}>
                <div className={styles.poster}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className={styles.movieInfo}>
                    <h3>{movie.title}</h3>
                    <p className={styles.releaseDate}>{movie.release_date.split('-')[0]}</p>
                </div>
            </div>
            <div className={styles.movieOverlay}>
                <ul>
                    <li>
                        <button
                            type='button'
                            onClick={handleInfoClick}
                            className={`${styles.infoBtn} ${showInfo ? styles.active : ''}`}
                        >
                            <i className="fa fa-info" aria-hidden="true"></i>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </li>
                    <li>
                        <button
                            type='button'
                            onClick={() => handleIconClick('favourite', movie.id)}
                            className={`${styles.favourite} ${isInMovieList(movie.id, 'favourite') ? styles.active : ''}`}
                        >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </button>
                    </li>
                    <li>
                        <button
                            type='button'
                            onClick={() => handleIconClick('maybe', movie.id)}
                            className={`${styles.maybe} ${isInMovieList(movie.id, 'maybe') ? styles.active : ''}`}
                        >
                            <i className="fa fa-question" aria-hidden="true"></i>
                        </button>
                    </li>
                    <li>
                        <button
                            type='button'
                            onClick={() => handleIconClick('bad', movie.id)}
                            className={`${styles.bad} ${isInMovieList(movie.id, 'bad') ? styles.active : ''}`}
                        >
                            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                        </button>
                    </li>
                    <li>
                        <button
                            type='button'
                            onClick={() => handleIconClick('watched', movie.id, false)}
                            className={`${styles.watched} ${isInMovieList(movie.id, 'watched') ? styles.active : ''}`}
                        >
                            <i className="fa fa-play" aria-hidden="true"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <div className={styles.movieInfoPopup}>
                <h3>{movie.title}</h3>
                <p className={styles.releaseDate}>Release date: {movie.release_date.split('-')[1]}/{movie.release_date.split('-')[0]}</p>
                <div className={styles.overview}>{movie.overview}</div>
                <p className={styles.genre}>{movieDetails.genres?.map((genre) => <span key={genre.id}>{genre.name}</span>)}</p>
                <div className={styles.ratingContainer}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <span className={styles.rating}>{Math.round(movie.vote_average)}<span> /10</span></span>
                    <span className={styles.count}>{movie.vote_count}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;

