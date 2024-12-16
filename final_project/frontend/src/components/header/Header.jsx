import React, { useEffect, useRef } from 'react';
import { HiPlusCircle } from "react-icons/hi";
import { BsPersonAdd } from "react-icons/bs";

import logo from '../../assets/nav-logo.png'
import './style.scss'
import { Link } from 'react-router-dom';

const Header = () => {
    const headerRef = useRef(null);
    const observerRef = useRef(null);
    
    useEffect(() => {
        const navObserver = new IntersectionObserver((entries) => {
            if(headerRef.current) {
                headerRef.current.classList.toggle('shadow', !entries[0].isIntersecting)
            }
        });
    
        navObserver.observe(observerRef.current)
    }, [headerRef, observerRef])


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
                            <a href='/listings' className='main__menu--link'>
                                Listing
                            </a>
                        </li>
                        <li className='main__menu--items'>
                            <Link to='/profile' className='main__menu--link'>
                                My Profile
                            </Link>
                        </li>
                        <li className='main__menu--items'>
                            <a href="#" className='main__menu--link'>
                                News
                            </a>
                        </li>
                        <li className='main__menu--items'>
                            <a href="#" className='main__menu--link'>
                                About Us
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='main__header--right'>
                <Link className="login__register--link" to='/login'>
                    <BsPersonAdd style={{ fontSize: '25px'}}/>
                    <span>Login / Register</span>
                </Link>
                <Link to="/profile/create-listing" className='add__listing--btn'>
                    <span>Add Listing</span>
                    <HiPlusCircle style={{ fontSize: '20px'}}/>
                </Link>
            </div>
        </div>
    </header>
    </>
  )
}

export default Header
