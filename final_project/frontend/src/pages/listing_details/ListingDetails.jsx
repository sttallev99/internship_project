import React, { useEffect, useState } from 'react';
import { SlCalender } from 'react-icons/sl';
import { FaEye, FaFacebook, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { MdLocationOn } from 'react-icons/md';
import { PiStarThin } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.scss';
import bathImg from '../../assets/bath-realistic.png';
import bedImg from '../../assets/bed-realistic.png';
import squareFtImg from '../../assets/set-square.png';
import { getErrorMessage } from '../../api/client';
import { getListing, requestRent } from '../../api/listings';
import Carousel from '../../components/carousel/Carousel';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { LISTING_KIND } from '../../constants';
import { formatDate, formatLocation } from '../../utils/listing';

const RATING_STARS = 5;
const SOCIAL_ICONS = [FaFacebook, FaInstagram, FaTwitter, FaPinterestP];

const ListingDetails = () => {
    const { listing_id: listingId } = useParams();
    const [searchParams] = useSearchParams();
    const kind = searchParams.get('type') ?? LISTING_KIND.RENT_OUT;
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        getListing(kind, listingId)
            .then((data) => !isCancelled && setListing(data))
            .catch((error) => !isCancelled && toast.error(getErrorMessage(error, 'Could not load this listing')));

        return () => {
            isCancelled = true;
        };
    }, [kind, listingId]);

    if (!listing) {
        return (
            <>
                <Header />
                <section className='listing__details--section'>
                    <div className="container">Loading listing...</div>
                </section>
                <Footer />
            </>
        );
    }

    const owner = listing.userRef;
    const isRentOut = kind === LISTING_KIND.RENT_OUT;
    const isOwnListing = Boolean(user && owner && user._id === owner._id);
    const canRequestRent = isRentOut && !isOwnListing && listing.status === 'active';

    const handleRent = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await requestRent(listingId);
            toast.success('Your rent request was sent to the owner');
            navigate('/listings');
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <section>
            <Header />
            {isRentOut && listing.images?.length > 0 && (
                <section className='listing__slider--section'>
                    <Carousel
                        images={listing.images}
                        sliderPosition={{ position: 'right', pixels: 0, fullWidth: true }}
                        paginationPosition={{ position: 'bottom' }}
                    />
                </section>
            )}
            <section className='listing__details--section'>
                <div className="container">
                    <div className="listing__left__content">
                        <div className='listing__details--wrapper'>
                            <div className="listing__details--content">
                                <div className="listing__details--content_top">
                                    <div className="listing__details--meta">
                                        <ul className='listing__details--meta__wrapper'>
                                            <li>
                                                <span className='listing__details--bage'>
                                                    {isRentOut ? 'For Rent' : 'Searched for'}
                                                </span>
                                            </li>
                                            <li>
                                                <span className='listing__details--meta__icon'><SlCalender /></span>
                                                <span className="listing__details--meta__text">{formatDate(listing.createdAt)}</span>
                                            </li>
                                            <li>
                                                <span className='listing__details--meta__icon'><FaEye /></span>
                                                <span className="listing__details--meta__text">1240</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <button type='button' className="listing__details--wishlist__btn" aria-label='Add to wishlist'>
                                        <FaHeart />
                                    </button>
                                </div>
                                <div className="listing__details--content__step">
                                    <h2 className="listing__details--title">{listing.title}</h2>
                                    <div className="listing__details--price__id">
                                        <div className="listing__details--price">
                                            <span className='listing__details--price__new new_price'>${listing.price}/month</span>
                                            {listing.newPrice && (
                                                <span className='listing__details--price__current old_price'>${listing.newPrice}/month</span>
                                            )}
                                        </div>
                                        <span className="listing__details--property__id">Property ID: {listing._id}</span>
                                    </div>
                                    <div className="listing__details--location">
                                        <span>
                                            <MdLocationOn />
                                        </span>
                                        <p className='listing__details--location__text'>{formatLocation(listing)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="listing__details--main__content">
                                <div className="listing__details--content__step">
                                    <h3 className="listing__details--content__title">Description:</h3>
                                    <p className="listing__details--content__desc">{listing.content}</p>
                                    <div className="apartment__info">
                                        <div className="apartment__info--list">
                                            <span className="apartmen__info--icon">
                                                <img src={bedImg} alt="" />
                                            </span>
                                            <p>
                                                <span className='apartment__info--count'>{listing.bedrooms}</span>
                                                <span className="apartment__info--title">Bedrooms</span>
                                            </p>
                                        </div>
                                        <div className="apartment__info--list">
                                            <span className="apartmen__info--icon">
                                                <img src={bathImg} alt="" />
                                            </span>
                                            <p>
                                                <span className='apartment__info--count'>{listing.bathrooms}</span>
                                                <span className="apartment__info--title">Bathrooms</span>
                                            </p>
                                        </div>
                                        <div className="apartment__info--list">
                                            <span className="apartmen__info--icon">
                                                <img src={squareFtImg} alt="" />
                                            </span>
                                            <p>{listing.footage} Sqft</p>
                                        </div>
                                    </div>
                                    {canRequestRent && (
                                        <button type='button' className='rent__now--btn' onClick={handleRent}>Rent Now</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {owner && (
                        <div className="listing__right__content">
                            <div className="listing__widget">
                                <div className="listing__admin--profile">
                                    <div className="admin__profile--thumbnail">
                                        <img src={owner.profilePicture} alt={`${owner.firstName} ${owner.lastName}`} />
                                    </div>
                                </div>
                                <div className="admin__profile--content">
                                    <h3 className="admin__profile--name">{owner.firstName} {owner.lastName}</h3>
                                    <ul className="admin__profile--rating">
                                        {Array.from({ length: RATING_STARS }, (_, index) => (
                                            <li key={index}>
                                                <span><PiStarThin /></span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="admin__profile--desc">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit.Veritatis distinctio
                                    </p>
                                    <a href={`mailto:${owner.email}`} className="admin__profile--email">{owner.email}</a>
                                    <ul className="profile__social">
                                        {SOCIAL_ICONS.map((Icon, index) => (
                                            <li className="profile__social--list" key={index}>
                                                <span className="profile__social--icon"><Icon /></span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </section>
    );
};

export default ListingDetails;
