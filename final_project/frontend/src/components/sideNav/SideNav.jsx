import React from 'react';
import { GoPlusCircle } from 'react-icons/go';
import { SlLogout } from 'react-icons/sl';
import { TbHeartCheck } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.scss';
import { signOut } from '../../api/auth';
import { removeUser } from '../../features/userSlice';

const SideNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await signOut();
        } catch {
            // The session is cleared locally either way; the cookie simply expires on its own.
        }
        dispatch(removeUser());
        toast.info('You have been logged out');
        navigate('/');
    };

    return (
        <div className='dashboard__sidebar--inner'>
            <ul className="sidebar__menu">
                <li className="sidebar__menu--items">
                    <Link to='/profile/create-listing' className="sidebar__menu--link">
                        <GoPlusCircle className='sidebar__menu--icon'/>
                        <span className="sidebar__menu--text">Create Listing</span>
                    </Link>
                </li>
                <li className="sidebar__menu--items">
                    <Link to='/profile/own-listings' className="sidebar__menu--link">
                        <TbHeartCheck className='sidebar__menu--icon'/>
                        <span className="sidebar__menu--text">My Listings</span>
                    </Link>
                </li>
                <li className="sidebar__menu--items">
                    <Link to='/' className="sidebar__menu--link" onClick={handleLogout}>
                        <SlLogout className='sidebar__menu--icon'/>
                        <span className="sidebar__menu--text">Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideNav
