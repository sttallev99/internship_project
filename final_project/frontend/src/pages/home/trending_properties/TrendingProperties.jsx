import React from 'react'
import { FaPlusCircle } from "react-icons/fa";


import Heading from '../../../components/heading/Heading'
import './style.scss';
import PropertyCard from '../../../components/property_card/PropertyCard';

const TrendingProperties = () => {
    return (
        <section className='featred__list'>
            <div className='container'>
                <div className="section__heading">
                    <Heading classname='h3' />
                    <h2 className='section__heading--title'>Trending Properties</h2>
                </div>
                <div className="featured__inner">
                    <div className='featured__inner--content'>
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                    </div>
                    <div className="featured__properties--footer">
                        <a className='solid_btn' href="#">
                            <span>More Properties</span>
                            <FaPlusCircle />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrendingProperties
