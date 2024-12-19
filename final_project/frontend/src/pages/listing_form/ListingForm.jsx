import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './style.scss';
import Header from '../../components/header/Header';
import SideNav from '../../components/sideNav/SideNav';
import ProfileHeading from '../../components/profile_heading/ProfileHeading';
import Footer from '../../components/footer/Footer';
import Dropdown from '../../components/dropdown/Dropdown';
import { baseUrl } from '../../constants';

const propertyTypes = ['Apartment', "Container Home", "Tiny Home", "Villa Type", "Duplex Modern Houses"];
const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

const ListingForm = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        listing_type: 'Rent out',
        title: '',
        content: '',
        country: '',
        city: '',
        address: '',
        prefArea: '',
        price: '',
        new_price: '',
        max_price: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        property_type: 'Apartment'
    });
    const [errors, setErrors] = useState({});
    const [uploadError, setUploadError] = useState('');
    const [uploadImages, setUploadImages] = useState([]);

    const addressInpEl = useRef(null);
    const prefAddressesInpEl = useRef(null);
    const priceImpEl = useRef(null);
    const maxPriceInpEl = useRef(null);

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        });
    };

    const handleUpload = async e => {
        setErrors(() => {
            const {imgUpload, ...rest} = errors;
            return rest
        });

        const file = e.target.files[0];
        
        if(!validFileTypes.find(type => type === file.type)) {
            setErrors(prev => ({
                ...prev,
                imgUpload: 'File must be in JPG/PNG format'
            }));
            return;
        }
        
        const form = new FormData();

        form.append('image', file);
        
        try {
            const response = await axios.post(`${baseUrl}/images`, form);
            setUploadImages(() => ([
                ...uploadImages,
                response.data.imageURL
            ]))
        } catch (error) {
            setUploadError(error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!formData.title.trim()) {
            validationErrors.title = 'Title required';
        }
        if(!formData.content.trim()) {
            validationErrors.content = 'Description required';
        }
        if(!formData.country.trim()) {
            validationErrors.country = 'Country required'
        }
        if(!formData.city.trim()) {
            validationErrors.city = 'City required';
        }
        if(addressInpEl.current && !formData.address.trim()) {
            validationErrors.address = 'Address required'
        }
        if(prefAddressesInpEl.current && !formData.prefArea.trim()) {
            validationErrors.prefArea = 'Preferred areas required'
        }
        if(priceImpEl.current && !formData.price.trim()) {
            validationErrors.price = 'Price required'
        }
        if( maxPriceInpEl.current && !formData.max_price.trim()) {
            validationErrors.max_price = 'Maximum price required'
        }
        if(!formData.bedrooms.trim()) {
            validationErrors.bedrooms = "Bedrooms required"
        }
        if(!formData.bathrooms.trim()) {
            validationErrors.bathrooms = "Bathrooms required"
        }
        if(!formData.sqft.trim()) {
            validationErrors.sqft = "Square feets required"
        }
        if(!formData.property_type) {
            validationErrors.property_type = "Property type required"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            if(formData.listing_type == 'Rent out') {
                const rentOutData = {
                    title: formData.title,
                    content: formData.content,
                    country: formData.country,
                    city: formData.city,
                    address: formData.address,
                    price: Number(formData.price),
                    bedrooms: Number(formData.bedrooms),
                    bathrooms: Number(formData.bathrooms),
                    footage: formData.sqft,
                    propertyType: formData.property_type,
                    userRef: user._id 
                }

                if(formData.new_price !== '') {
                    rentOutData.newPrice = formData.new_price
                }
                if(uploadImages.length !== 0) {
                    rentOutData.images = uploadImages
                }

                try {
                    const data = await axios.post(`${baseUrl}/listing/rent-out`, rentOutData);
                    if(data.data.success) {
                        navigate('/profile/own-listings')
                    }
                } catch(err) { 
                    console.log(err)
                }
            } else if(formData.listing_type == 'Searched for') {
                const prefAreas = formData.prefArea.split(',').map(area => area.trim()).filter(area => area !== "");
                const searchedForData = {
                    title: formData.title,
                    content: formData.content,
                    country: formData.country,
                    city: formData.city,
                    prefAreas: prefAreas,
                    maxPrice: formData.max_price,
                    bedrooms: formData.bedrooms,
                    bathrooms: formData.bathrooms,
                    footage: formData.sqft,
                    propertyType: formData.property_type,
                    userRef: user._id
                }

                try {
                    const data = await axios.post(`${baseUrl}/listing/search-for`, searchedForData, {
                        withCredentials: true
                    });

                    if(data.data.success) {
                        navigate('/profile/own-listings')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

    }

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
                                                <Dropdown 
                                                    options={['Rent out', 'Searched for']} 
                                                    name={'listing_type'} 
                                                    id={'listing_type'}
                                                    handleOnChange={handleOnChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="title" className='form__listing--input__label'>Title</label>
                                                <input 
                                                    type="text" 
                                                    name="title" 
                                                    id="title" 
                                                    placeholder='Your Title' 
                                                    className='form__listing--input__field'
                                                    onChange={handleOnChange} 
                                                />
                                            </div>
                                            {errors.title && <span>{errors.title}</span>}
                                        </div>
                                        <div className="col-1">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="content" className='form__listing--input__label'>Description</label>
                                                <textarea 
                                                    name="content" 
                                                    id="content" 
                                                    placeholder='Your Description' 
                                                    className='form__listing--textarea__box'
                                                    onChange={handleOnChange} 
                                                />
                                            </div>
                                            {errors.content && <span>{errors.content}</span>}
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="country" className='form__listing--input__label'>Country</label>
                                                <input 
                                                    type="text" 
                                                    name="country" 
                                                    id="country" 
                                                    placeholder='Your Country' 
                                                    className='form__listing--input__field' 
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            {errors.country && <span>{errors.country}</span>}
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="city" className='form__listing--input__label'>City</label>
                                                <input 
                                                    type="text" 
                                                    name="city" 
                                                    id="title" 
                                                    placeholder='Your city' 
                                                    className='form__listing--input__field' 
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            {errors.city && <span>{errors.city}</span>}
                                        </div>
                                        <div className="col-1">
                                            <div className="form__listing--input__box">
                                                {
                                                    formData.listing_type == 'Rent out' 
                                                    ?
                                                        <>
                                                            <label htmlFor="address" className='form__listing--input__label'>Address</label>
                                                            <input 
                                                            type="text" 
                                                            name="address" 
                                                            id="address" 
                                                            placeholder='Your address' 
                                                            className='form__listing--input__field'
                                                            onChange={handleOnChange}
                                                            ref={addressInpEl}
                                                            />
                                                            {errors.address && <span>{errors.address}</span>}
                                                        </>
                                                    : 
                                                        <>
                                                            <label htmlFor="prefArea" className='form__listing--input__label'>Pref Area</label>
                                                            <textarea 
                                                                name="prefArea" 
                                                                id="prefArea" 
                                                                placeholder='Your preffered areas' 
                                                                className='form__listing--textarea__box'
                                                                onChange={handleOnChange}
                                                                ref={prefAddressesInpEl}
                                                            />
                                                            {errors.prefArea && <span>{errors.prefArea}</span>}
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        {
                                            formData.listing_type == 'Rent out'
                                            ?
                                                <>
                                                    <div className="col-lg-2">
                                                        <div className="form__listing--input__box">
                                                            <label htmlFor="price" className='form__listing--input__label'>Price</label>
                                                            <input 
                                                                type="number" 
                                                                name="price" 
                                                                id="price" 
                                                                placeholder='Your price' 
                                                                className='form__listing--input__field'
                                                                onChange={handleOnChange}
                                                                ref={priceImpEl}
                                                            />
                                                        </div>
                                                        {errors.price && <span>{errors.price}</span>}
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="form__listing--input__box">
                                                            <label htmlFor="new_price" className='form__listing--input__label'>New Price</label>
                                                            <input 
                                                                type="number" 
                                                                name="new_price" 
                                                                id="new_price" 
                                                                placeholder='Your new price' 
                                                                className='form__listing--input__field'
                                                                onChange={handleOnChange} 
                                                            />
                                                        </div>
                                                        {errors.new_price && <span>{errors.new_price}</span>}
                                                    </div>
                                                </>
                                            :
                                                <>
                                                    <div className="col-1">
                                                        <div className="form__listing--input__box">
                                                            <label htmlFor="max_price" className='form__listing--input__label'>Max Price</label>
                                                            <input 
                                                                type="number" 
                                                                name="max_price" 
                                                                id="max_price" 
                                                                placeholder='Your max price' 
                                                                className='form__listing--input__field'
                                                                onChange={handleOnChange} 
                                                                ref={maxPriceInpEl}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                        <div className="col-lg-3">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="bedrooms" className='form__listing--input__label'>Bedrooms</label>
                                                <input 
                                                    type="number" 
                                                    name="bedrooms" 
                                                    id="bedrooms" 
                                                    placeholder='Your bedrooms' 
                                                    className='form__listing--input__field'
                                                    onChange={handleOnChange} 
                                                />
                                            </div>
                                            {errors.bedrooms && <span>{errors.bedrooms}</span>}
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="bathrooms" className='form__listing--input__label'>Bathrooms</label>
                                                <input 
                                                    type="number" 
                                                    name="bathrooms" 
                                                    id="bathrooms" 
                                                    placeholder='Your bathrooms' 
                                                    className='form__listing--input__field'
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            {errors.bathrooms && <span>{errors.bathrooms}</span>}
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="sqft" className='form__listing--input__label'>Square feet</label>
                                                <input 
                                                    type="number" 
                                                    name="sqft" 
                                                    id="sqft" 
                                                    placeholder='Your square feet' 
                                                    className='form__listing--input__field'
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            {errors.sqft && <span>{errors.sqft}</span>}
                                        </div>
                                        <div className="col-1">
                                            <div className="form__listing--input__box">
                                                <label htmlFor="property_type" className='form__listing--input__label'>Property type</label>
                                                <Dropdown 
                                                    options={propertyTypes} 
                                                    name={'property_type'} 
                                                    id={'property_type'}
                                                    handleOnChange={handleOnChange}
                                                />
                                            </div>
                                            {errors.property_type && <span>{errors.property_type}</span>}
                                        </div>
                                        {
                                            formData.listing_type == 'Rent out' &&
                                                <div className="col-1">
                                                    <div className="form__listing--photo__box">
                                                        <p className='form__listing--photo__box--title'>Add Photos</p>
                                                        <input id='imageInput' type='file' hidden onChange={handleUpload}/>
                                                        <label htmlFor="imageInput" className='form__listing--photo__box--label'>Upload</label>
                                                    </div>
                                                    <p>{uploadImages.length} uploaded images</p>
                                                    {errors.imgUpload && <span>{errors.imgUpload}</span>}
                                                    {uploadError && <span>{uploadError}</span>}
                                                </div>
                                        }
                                    </div>
                                    <button type='submit' className='submit__btn' onClick={handleSubmit}>Save</button>
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
