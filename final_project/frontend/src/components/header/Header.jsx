import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.scss';
import logo from '../../assets/nav-logo.png';
import { BsPersonAdd, HiOutlineMenu, HiOutlineX, HiPlusCircle } from '../icons';

const Header = () => {
    const { user } = useSelector((state) => state.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);
    const observerRef = useRef(null);

    // Adds a shadow to the sticky header once the page is scrolled past its top.
    useEffect(() => {
        const navObserver = new IntersectionObserver(([entry]) => {
            headerRef.current?.classList.toggle('shadow', !entry.isIntersecting);
        });

        navObserver.observe(observerRef.current);
        return () => navObserver.disconnect();
    }, []);

    return (
        <>
            <div data-scroll-watcher ref={observerRef}></div>
            <header className='header__section' ref={headerRef}>
                <div className={classNames('header__sticky', { 'is-open': isMenuOpen })}>
                    <div className='main__logo'>
                        <Link to='/' className='main__logo--link'>
                            <img src={logo} alt="logo-img" className='main__logo--img' />
                        </Link>
                    </div>
                    {/* Only visible on small screens, where the menu collapses. */}
                    <button
                        type='button'
                        className='header__toggle'
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((open) => !open)}
                    >
                        {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                    </button>
                    <div className='main__menu'>
                        <nav className='main__menu--navigation'>
                            <ul className='main__men--wrapper'>
                                <li className='main__menu--items'>
                                    <Link to='/' className='main__menu--link'>
                                        Home
                                    </Link>
                                </li>
                                <li className='main__menu--items'>
                                    <Link to='/listings' className='main__menu--link'>
                                        Listing
                                    </Link>
                                </li>
                                {user && (
                                    <li className='main__menu--items'>
                                        <Link to='/profile' className='main__menu--link'>
                                            My Profile
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                    <div className='main__header--right'>
                        {user ? (
                            <Link to="/profile/create-listing" className='add__listing--btn'>
                                <span>Add Listing</span>
                                <HiPlusCircle style={{ fontSize: '20px' }} />
                            </Link>
                        ) : (
                            <Link className="login__register--link" to='/login'>
                                <BsPersonAdd style={{ fontSize: '25px' }} />
                                <span>Login / Register</span>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
