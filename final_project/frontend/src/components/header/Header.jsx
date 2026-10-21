import React, { useEffect, useRef } from 'react';
import { HiPlusCircle } from "react-icons/hi";
import { BsPersonAdd } from "react-icons/bs";

import logo from '../../assets/nav-logo.png'
import './style.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const { user } = useSelector((state) => state.user);
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
        <div className='header__sticky'>
            <div className='main__logo'>
                <Link to='/' className='main__logo--link'>
                    <img src={logo} alt="logo-img" className='main__logo--img'/>
                </Link>
            </div>
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
                        {
                            user  && 
                            <li className='main__menu--items'>
                                <Link to='/profile' className='main__menu--link'>
                                    My Profile
                                </Link>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
            <div className='main__header--right'>
                {user 
                ?   
                    <Link to="/profile/create-listing" className='add__listing--btn'>
                        <span>Add Listing</span>
                        <HiPlusCircle style={{ fontSize: '20px'}}/>
                    </Link>
                : 
                    <Link className="login__register--link" to='/login'>
                        <BsPersonAdd style={{ fontSize: '25px'}}/>
                        <span>Login / Register</span>
                    </Link>
            }
            </div>
        </div>
    </header>
    </>
  )
}

export default Header
