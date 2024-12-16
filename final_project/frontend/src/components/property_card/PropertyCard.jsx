import React from 'react'
import { FaHeart } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { TbRulerMeasure2 } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";

import './style.scss';


const PropertyCard = () => {
    return (
        <article className='featured__card--list'>
            <div className='featured__card--list__thumbnail'>
                <div className='media'>
                    <a className="featured__thumbnail--link" href='#'>
                        <img className="featured__thumbnail--img" src="https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D" alt="property-land-img" />
                    </a>
                </div>
                <div className="featured__badge">
                    <span className='badge__field'>For Rent</span>
                </div>
                <span className='featured__author--img'>
                    <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png" alt="owner-img" />
                </span>
            </div>
            <div className='featured__card--list__content'>
                <div className="featured__card--list__top">
                    <h3 className='featured__card--title'>Luxury Family Home</h3>
                    <a className='featured__list--wishlist__btn' href="#">
                        <FaHeart />
                    </a>
                </div>
                <span className='featured__card--price'>$13000</span>
                <ul className='featured__info--list__style'>
                    <li className="featured__info--items">
                        <p className="featured__info--icon">
                            <span>3</span>
                            <span><IoBedOutline /></span>                   
                        </p>
                        <p className='featured__info--text'>Bedrooms</p>
                    </li>
                    <li className="featured__info--items">
                        <p className="featured__info--icon">
                            <span>3</span>
                            <span><PiBathtub /></span>
                                                
                        </p>
                        <p className='featured__info--text'>Bathrooms</p>
                    </li>
                    <li className="featured__info--items">
                        <p className="featured__info--icon">
                            <span>150</span>
                            <span><TbRulerMeasure2 /></span>
                        </p>
                        <p className='featured__info--text'>Square Ft</p>
                    </li>
                </ul>
                {/* <p className="featured__content--desc">
                    <MdLocationOn />
                    <span>1421 San Pedro St, Los Angeles, CA</span>
                </p> */}
                <div className="featured__content--list__footer">
                    <p className="featured__content--desc">
                        <MdLocationOn />
                        <span>1421 San Pedro St, Los Angeles, CA</span>
                    </p>
                    <a href="#" className="listing__details--btn">Land Details</a>
                </div>
            </div>
        </article>
    )
}

export default PropertyCard
