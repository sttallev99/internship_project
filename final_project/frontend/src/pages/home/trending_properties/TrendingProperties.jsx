import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from '../../../components/icons';
import { Link } from 'react-router-dom';

import './style.scss';
import { getTrendingListings } from '../../../api/listings';
import Heading from '../../../components/heading/Heading';
import PropertyCard from '../../../components/property_card/PropertyCard';
import { TRENDING_LISTINGS_COUNT } from '../../../constants';

const TrendingProperties = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        getTrendingListings(TRENDING_LISTINGS_COUNT)
            .then(setListings)
            .catch(() => setListings([]));
    }, []);

    return (
        <section className='featred__list'>
            <div className='container'>
                <div className="section__heading">
                    <Heading classname='h3' />
                    <h2 className='section__heading--title'>Trending Properties</h2>
                </div>
                <div className="featured__inner">
                    <div className='featured__inner--content'>
                        {listings.map((listing) => <PropertyCard data={listing} key={listing._id} />)}
                    </div>
                    <div className="featured__properties--footer">
                        <Link className='solid_btn' to='/listings'>
                            <span>More Properties</span>
                            <FaPlusCircle />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingProperties;
