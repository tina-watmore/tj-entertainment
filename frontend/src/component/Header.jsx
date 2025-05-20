import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';


export const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {       
        setNavOpen(false);
    }, [location]);

    useEffect(() => {
        document.body.classList.toggle('mobileNavOpen');
    }, [navOpen]);

    const navItems = [
        {
            id: 1,
            title: 'Home',
            url: '/'
        },
        {
            id: 2,
            title: 'Favourites',
            url: '/favourites'
        },
        {
            id: 3,
            title: 'Maybe',
            url: '/maybes'
        },
        {
            id: 4,
            title: 'Upcoming',
            url: '/upcoming'
        },
        {
            id: 5,
            title: 'Watched',
            url: '/watched'
        }                      
    ];

    return (
        <header>
            <div className='container'>
                <nav className={styles.navbar}>
                    <Link className={styles.navbarBrand} to='/'>
                        <img className={styles.logo} src='/tj_entertainment_logo-transparent.png' alt='TJ Entertainment' />
                    </Link>
                    <button onClick={() => setNavOpen(!navOpen)} className={styles.navbarToggler} type='button' aria-label='Toggle navigation'>
                        <i className={navOpen ? 'fa fa-times' : 'fa fa-bars'} />
                    </button>
                    <div id='navbarNav' className={`${styles.navbarNav} ${navOpen ? styles.open : ''}`}>
                        <ul className={styles.navbarLinks} role='list'>
                            {
                                navItems.map((navItem) => (
                                    <li key={navItem.id} className={styles.navItem}>
                                        <NavLink to={navItem.url}>{navItem.title}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </nav>       
            </div>
        </header>   
    )
}
