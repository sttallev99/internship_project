import React from 'react'
import { IoIosSearch } from "react-icons/io";

import './style.scss';
import Carousel from '../../components/carousel/Carousel';
import Header from '../../components/header/Header';
import { images } from '../../components/carousel/data';
import Heading from '../../components/heading/Heading';
import TrendingProperties from './trending_properties/TrendingProperties';
import Footer from '../../components/footer/Footer'

const Home = () => {
    return (
        <>
            <Header />
            <div className='hero__section'>
                <div className='hero__slider'>
                    <Carousel images={images} sliderPosition={{position: 'right', pixels: 0}} paginationPosition={{position: 'left'}} className='test'/>
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
                                <a className='solid__btn' href="#">Search Now</a>
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
                                <form action="" className="advance__search--innter">
                                    <div className="advance__two--search__items">
                                        <label htmlFor="" className="advance__search--label">Type Your Property</label>
                                        <input className='advance__search--input' type="text" placeholder='Enter Keyword...'/>
                                    </div>
                                    <div className="advance__two--search__items">
                                        <label htmlFor="" className="advance__search--label">Where’s Located?</label>
                                        <input className='advance__search--input' type="text" placeholder='Melborn, Australia'/>
                                    </div>
                                    <div className="advance__two--search__items">
                                        <label htmlFor="" className="advance__search--label">Type Price Range</label>
                                        <input className='advance__search--input' type="text" placeholder='$2910 - $3190'/>
                                    </div>
                                    {/* <div className="advance__two--search__items">
                                        <label htmlFor="" className="advance__search--label">Type Price Range</label>
                                        <input className='advance__search--input' type="text" placeholder='$2910 - $3190'/>
                                    </div> */}
                                    <button className='advance__search--btn'>
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
