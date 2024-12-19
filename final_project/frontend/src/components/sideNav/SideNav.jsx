import React from 'react'
import { GoPlusCircle } from "react-icons/go";
import { LuMessagesSquare } from "react-icons/lu";
import { TbHeartCheck } from "react-icons/tb";
import { SlLogout } from "react-icons/sl";

import './style.scss'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../features/userSlice';
import axios from 'axios';
import { baseUrl } from '../../constants';

const SideNav = () => {
    const dispatch = useDispatch();

    const handleLogout = async() => {
        dispatch(removeUser());
        await axios.get(`${baseUrl}/sign-out`);
    }
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
                    <a href="#" className="sidebar__menu--link">
                        <LuMessagesSquare className='sidebar__menu--icon'/>
                        <span className="sidebar__menu--text">Message</span>
                    </a>
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
