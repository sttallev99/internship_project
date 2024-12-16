import React from 'react'
import { SlCalender } from "react-icons/sl";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { PiStarThin } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";


import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer'; 
import bedImg from '../../assets/bed-realistic.png';
import bathImg from '../../assets/bath-realistic.png';
import squareFtImg from '../../assets/set-square.png'

import './style.scss'
import Carousel from '../../components/carousel/Carousel';
import { images } from '../../components/carousel/data';

const ListingDetails = () => {
    return (
        <section>
            <Header />
            <section className='listing__slider--section'>
                <Carousel 
                    images={images} 
                    sliderPosition={{position: 'right', pixels: 0, fullWidth: true}} 
                    paginationPosition={{position: 'bottom'}} 
                />
            </section>
            <section className='listing__details--section'>
                <div className="container">
                    <div className="listing__left__content">
                        <div className='listing__details--wrapper'>
                            <div className="listing__details--content">
                                <div className="listing__details--content_top">
                                    <div className="listing__details--meta">
                                        <ul className='listing__details--meta__wrapper'>
                                            <li>
                                                <span className='listing__details--bage'>For Rent</span>
                                            </li>
                                            <li>
                                                <span className='listing__details--meta__icon'><SlCalender /></span>
                                                <span className="listing__details--meta__text">2 years ago</span>
                                            </li>
                                            <li>
                                                <span className='listing__details--meta__icon'><FaEye /></span>
                                                <span className="listing__details--meta__text">1240</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="#" className="listing__details--wishlist__btn"><FaHeart /></a>
                                </div>
                                <div className="listing__details--content__step">
                                    <h2 className="listing__details--title">House In Foxhall Ave, Kingston</h2>
                                    <div className="listing__details--price__id">
                                        <div className="listing__details--price">
                                            <span className='listing__details--price__new new_price'>$13000</span>
                                            <span className='listing__details--price__current old_price'>$16000</span>
                                        </div>
                                        <span className="listing__details--property__id">Property ID: HZ24</span>
                                    </div>
                                    <p className="listing__details--location">
                                        <span>
                                            <MdLocationOn />
                                        </span>
                                        <p className='listing__details--location__text'>1421 San Pedro St, Los Angeles, CA</p>
                                    </p>
                                </div>
                            </div>
                            <div className="listing__details--main__content">
                                <div className="listing__details--content__step">
                                    <h3 className="listing__details--content__title">Description:</h3>
                                    <p className="listing__details--content__desc">
                                        Description It is a long established fact that a reader will be distrac by any websites look for ways
                                        prevent AdBlock from blocking annoying ads. As a result, we've focused on improving our funct
                                        so that we can overcome these anti-ad blocking attempts. Of course, you can help us continue to
                                        improve our ad blocking ability by reporting any time you run into a website that won't allow you
                                        to block the readable content of a page when looking at its layout. It is a long established fact
                                    </p>
                                    <div className="apartment__info">
                                        <div className="apartment__info--list">
                                            <span className="apartmen__info--icon">
                                                <img src={bedImg} alt="apartment-info" />
                                            </span>
                                            <p>
                                                <span className='apartment__info--count'>3</span>
                                                <span className="apartment__info--title">Bedrooms</span>
                                            </p>
                                        </div>
                                        <div className="apartment__info--list">
                                            <span className="apartmen__info--icon">
                                                <img src={bathImg} alt="apartment-info" />
                                            </span>
                                            <p>
                                                <span className='apartment__info--count'>3</span>
                                                <span className="apartment__info--title">Bathrooms</span>
                                            </p>
                                        </div>
                                        <div className="apartment__info--list">
                                            <span className="apartmen__info--icon">
                                                <img src={squareFtImg} alt="apartment-info" />
                                            </span>
                                            <p>150 Sqft</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="listing__right__content">
                        <div className="listing__widget">
                            <div className="listing__admin--profile">
                                <div className="admin__profile--thumbnail">
                                    <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png" alt="profile_pic" />
                                </div>
                            </div>
                            <div className="admin__profile--content">
                                <h3 className="admin__profile--name">Georgi Stalev</h3>
                                <ul className="admin__profile--rating">
                                    <li>
                                        <span>
                                            <PiStarThin />
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <PiStarThin />
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <PiStarThin />
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <PiStarThin />
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <PiStarThin />
                                        </span>
                                    </li>
                                </ul>
                                <p className="admin__profile--desc">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit.Veritatis distinctio
                                </p>
                                <a href="#" className="admin__profile--email">sttallev99@gmail.com</a>
                                <ul className="profile__social">
                                    <li className="profile__social--list">
                                        <a href="#" className="profile__social--icon">
                                            <FaFacebook />
                                        </a>
                                    </li>
                                    <li className="profile__social--list">
                                        <a href="#" className="profile__social--icon">
                                            <FaInstagram />
                                        </a>
                                    </li>
                                    <li className="profile__social--list">
                                        <a href="#" className="profile__social--icon">
                                            <FaTwitter />
                                        </a>
                                    </li>
                                    <li className="profile__social--list">
                                        <a href="#" className="profile__social--icon">
                                            <FaPinterestP />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </section>
    )
}

export default ListingDetails
