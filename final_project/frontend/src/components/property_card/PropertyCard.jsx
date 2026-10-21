import React from 'react';
import { FaHeart } from '../icons';
import { IoBedOutline } from '../icons';
import { PiBathtub } from '../icons';
import { TbRulerMeasure2 } from '../icons';
import { MdLocationOn } from '../icons';
import { Link, useLocation } from 'react-router-dom';

import './style.scss';
import { formatLocation, getListingDetailsPath, isSearchedFor } from '../../utils/listing';

const OWNER_PLACEHOLDER_IMG =
    'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png';

const PropertyCard = ({ data }) => {
    const { pathname } = useLocation();
    const searchedFor = isSearchedFor(data);
    const detailsPath = getListingDetailsPath(data);

    return (
        <article className='featured__card--list'>
            {!searchedFor && (
                <div className='featured__card--list__thumbnail'>
                    <div className='media'>
                        <Link className="featured__thumbnail--link" to={detailsPath}>
                            <img className="featured__thumbnail--img" src={data.images?.[0]} alt={data.title} />
                        </Link>
                    </div>
                    <div className="featured__badge">
                        <span className='badge__field'>For Rent</span>
                    </div>
                    <span className='featured__author--img'>
                        <img src={OWNER_PLACEHOLDER_IMG} alt="owner" />
                    </span>
                </div>
            )}

            <div className='featured__card--list__content'>
                <div className="featured__card--list__top">
                    <h3 className='featured__card--title'>
                        {searchedFor ? `Searched for ${data.title}` : data.title}
                    </h3>
                    <button type='button' className='featured__list--wishlist__btn' aria-label='Add to wishlist'>
                        <FaHeart />
                    </button>
                </div>
                <span className='featured__card--price'>${data.price}/month</span>
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
                        {searchedFor && <span>Preferred areas:&nbsp;&nbsp;</span>}
                        <span>{formatLocation(data)}</span>
                    </p>
                    {pathname === '/listings' && (
                        <Link to={detailsPath} className="listing__details--btn">Land Details</Link>
                    )}
                </div>
            </div>
        </article>
    );
};

export default PropertyCard;
