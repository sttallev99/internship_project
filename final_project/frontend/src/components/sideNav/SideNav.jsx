import React from 'react'
import { GoPlusCircle } from "react-icons/go";
import { LuMessagesSquare } from "react-icons/lu";
import { TbHeartCheck } from "react-icons/tb";
import { SlLogout } from "react-icons/sl";

import './style.scss'

const SideNav = () => {
    return (
        <div className='dashboard__sidebar--inner'>
            <ul className="sidebar__menu">
                <li className="sidebar__menu--items">
                    <a href="#" className="sidebar__menu--link">
                        <GoPlusCircle className='sidebar__menu--icon'/>
                        <span className="sidebar__menu--text">Create Listing</span>
                    </a>
                </li>
                <li className="sidebar__menu--items">
                    <a href="#" className="sidebar__menu--link">
                        <LuMessagesSquare className='sidebar__menu--icon'/>
                        <span className="sidebar__menu--text">Message</span>
                    </a>
                </li>
                <li className="sidebar__menu--items">
                    <a href="#" className="sidebar__menu--link">
                        <TbHeartCheck className='sidebar__menu--icon'/>
                        <span className="sidebar__menu--text">My Favourites</span>
                    </a>
                </li>
                <li className="sidebar__menu--items">
                    <a href="#" className="sidebar__menu--link">
                        <SlLogout className='sidebar__menu--icon'/>
                        <span className="sidebar__menu--text">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default SideNav
