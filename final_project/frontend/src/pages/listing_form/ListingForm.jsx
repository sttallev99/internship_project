import React from 'react';

import './style.scss';
import Header from '../../components/header/Header';
import SideNav from '../../components/sideNav/SideNav';
import ProfileHeading from '../../components/profile_heading/ProfileHeading';
import Footer from '../../components/footer/Footer';
import Dropdown from '../../components/dropdown/Dropdown';

const ListingForm = () => {
    return (
        <>
            <Header />
            <section className='listing__form--section'>
                <SideNav />
                    <main className='lising__form--wrapper'>
                        <ProfileHeading />
                        <div className='listing__form'>
                            <div className="listing__form__inner">
                                <h3 className="listing__form__inner--title">Create Listing</h3>
                                <form action="" className="listing__form--form">
                                    <div className="row">
                                        <div className='col-1'>
                                            <div className="form__listing--input__box">
                                                <label htmlFor="listing_type" className='form__listing--input__label'>Listing type</label>
                                                <Dropdown options={['Rent out', 'Searched for']} name={'listing_type'} id={'listing_type'} />
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="title" className='form__listing--input__label'>Title</label>
                                                <input type="text" name="title" id="title" placeholder='Your Title' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="content" className='form__listing--input__label'>Description</label>
                                                <textarea name="content" id="content" placeholder='Your Description' className='form__listing--textarea__box' />
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="country" className='form__listing--input__label'>Country</label>
                                                <input type="text" name="country" id="country" placeholder='Your Country' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="city" className='form__listing--input__label'>City</label>
                                                <input type="text" name="city" id="title" placeholder='Your city' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="address" className='form__listing--input__label'>Address</label>
                                                <input type="text" name="address" id="address" placeholder='Your address' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="price" className='form__listing--input__label'>Price</label>
                                                <input type="text" name="price" id="price" placeholder='Your price' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="new_price" className='form__listing--input__label'>New Price</label>
                                                <input type="text" name="new_price" id="new_price" placeholder='Your new price' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="max_price" className='form__listing--input__label'>Max Price</label>
                                                <input type="text" name="max_price" id="max_price" placeholder='Your max price' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="bedrooms" className='form__listing--input__label'>Bedrooms</label>
                                                <input type="text" name="bedrooms" id="bedrooms" placeholder='Your bedrooms' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="bathrooms" className='form__listing--input__label'>Bathrooms</label>
                                                <input type="text" name="bathrooms" id="bathrooms" placeholder='Your bathrooms' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="sqft" className='form__listing--input__label'>Square feet</label>
                                                <input type="text" name="sqft" id="sqft" placeholder='Your square feet' className='form__listing--input__field' />
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="property_type" className='form__listing--input__label'>Square feet</label>
                                                <Dropdown options={['test 1', 'test ', 'test 3', 'test 4']} name={'property_type'} id={'property_type'} />
                                            </div>
                                        </div>
                                    </div>
                                    <button type='submit' className='submit__btn'>Save</button>
                                </form>
                            </div>
                        </div>
                    </main>
            </section>
            <Footer />
        </>
    )
}

export default ListingForm
