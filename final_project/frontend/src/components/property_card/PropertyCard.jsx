import React from 'react'
import { FaHeart } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { TbRulerMeasure2 } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";

import './style.scss';
import { Link, useLocation } from 'react-router-dom';


const PropertyCard = ({data}) => {
    console.log(data)
    const location = useLocation();

    return (
        <article className='featured__card--list'>
            {!data.maxPrice && (
                <div className='featured__card--list__thumbnail'>
                    <div className='media'>
                        <Link className="featured__thumbnail--link" to={`/listing-details/${data._id}`}>
                            <img className="featured__thumbnail--img" src={data.images[0]} alt="property-land-img" />
                        </Link>
                    </div>
                    <div className="featured__badge">
                        <span className='badge__field'>For Rent</span>
                    </div>
                    <span className='featured__author--img'>
                        <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png" alt="owner-img" />
                    </span>
                </div>
            )}

            <div className='featured__card--list__content'>
                <div className="featured__card--list__top">
                    <h3 className='featured__card--title'>{data.title}</h3>
                    <a className='featured__list--wishlist__btn' href="#">
                        <FaHeart />
                    </a>
                </div>
                <span className='featured__card--price'>${data.price ? data.price : data.maxPrice}/month</span>
                <ul className='featured__info--list__style'>
                    <li className="featured__info--items">
                        <p className="featured__info--icon">
                            <span>{data.bedrooms}</span>
                            <span><IoBedOutline /></span>                   
                        </p>
                        <p className='featured__info--text'>Bedrooms</p>
                    </li>
                    <li className="featured__info--items">
                        <p className="featured__info--icon">
                            <span>{data.bathrooms}</span>
                            <span><PiBathtub /></span>
                                                
                        </p>
                        <p className='featured__info--text'>Bathrooms</p>
                    </li>
                    <li className="featured__info--items">
                        <p className="featured__info--icon">
                            <span>{data.footage}</span>
                            <span><TbRulerMeasure2 /></span>
                        </p>
                        <p className='featured__info--text'>Square Ft</p>
                    </li>
                </ul>
                <div className="featured__content--list__footer">
                    <p className="featured__content--desc">
                        <MdLocationOn />
                        {data.maxPrice && <span>Prefered areas:&nbsp;&nbsp;</span>}
                        <span>{data.maxPrice ? data.prefAreas[0] : data.address}, {data.city}, {data.country}</span>
                        {data.maxPrice && <span>...</span>}
                    </p>
                    {
                        location.pathname == '/listings' &&
                            <Link to={`/listing-details/${data._id}`} className="listing__details--btn">Land Details</Link>
                    }
                </div>
            </div>
        </article>
    )
}

export default PropertyCard
