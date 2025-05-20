import styles from './GoToTopBtn.module.scss';
import { useState, useEffect } from 'react';

export const GoToTopBtn = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollY, innerHeight } = window;
            setVisible(scrollY > innerHeight / 2);
        };

        window.addEventListener('scroll', handleScroll);

        return () => { window.removeEventListener('scroll', handleScroll) }
    }, []);

    const handleClick = (e) => {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });        
    }

    return (
        <button 
            onClick={handleClick}
            className={`${styles.goToTopBtn} ${visible ? styles.active : ''}`} 
            type='button' 
            aria-label='Go to top'
        >
            <i className="fa fa-chevron-up" aria-hidden="true"></i>
        </button>
    )
}