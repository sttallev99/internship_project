import React from 'react';
import { IoIosSearch } from '../../components/icons';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';
import TrendingProperties from './trending_properties/TrendingProperties';
import Carousel from '../../components/carousel/Carousel';
import { images } from '../../components/carousel/data';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Heading from '../../components/heading/Heading';

const Home = () => {
    const navigate = useNavigate();

    const handleQuickSearch = (e) => {
        e.preventDefault();
        navigate('/listings');
    };

    return (
        <>
            <Header />
            <div className='hero__section'>
                <div className='hero__slider'>
                    <Carousel images={images} sliderPosition={{position: 'right', pixels: 0}} paginationPosition={{position: 'left'}} />
                </div>
                <div className='hero__container'>
                    <div className="container">
                        <div className="hero__content">
                            <Heading classname={'h3'}/>
                            <h2 className="hero__content--heading__title">
                                Find The Best Real<br/>Estate On Your.
                            </h2>
                            <p className="hero__content--heading__desc">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
                            <div className="hero__content--footer">
                                <Link className='solid__btn' to="/listings">Search Now</Link>
                            </div>
                        </div>
                        <div className="advance__search--filter">
                            <ul className="advance__tab--btn__two">
                                <li className='advance__tab--btn__list active'>
                                    <button className='advance__tab--btn__field'>RENT</button>
                                </li>
                                <li className='advance__tab--btn__list'>
                                    <button className='advance__tab--btn__field'>SEARCH FOR</button>
                                </li>
                            </ul>
                            <div className="tab__content">
                                <form className="advance__search--innter" onSubmit={handleQuickSearch}>
                                    <div className="advance__two--search__items">
                                        <label className="advance__search--label">Type Your Property</label>
                                        <input className='advance__search--input' type="text" placeholder='Enter Keyword...'/>
                                    </div>
                                    <div className="advance__two--search__items">
                                        <label className="advance__search--label">Where’s Located?</label>
                                        <input className='advance__search--input' type="text" placeholder='Melborn, Australia'/>
                                    </div>
                                    <div className="advance__two--search__items">
                                        <label className="advance__search--label">Type Price Range</label>
                                        <input className='advance__search--input' type="text" placeholder='$2910 - $3190'/>
                                    </div>
                                    <button type='submit' className='advance__search--btn' aria-label='Search'>
                                        <IoIosSearch />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TrendingProperties />
            <Footer />
        </>
    )
}

export default Home
