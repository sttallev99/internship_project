import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.scss';
import { getErrorMessage } from '../../api/client';
import { createListing, getListing, updateListing, uploadImage } from '../../api/listings';
import Dropdown from '../../components/dropdown/Dropdown';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ProfileHeading from '../../components/profile_heading/ProfileHeading';
import SideNav from '../../components/sideNav/SideNav';
import { LISTING_KIND, PROPERTY_TYPES } from '../../constants';

const VALID_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];

const LISTING_TYPE_LABEL = {
    [LISTING_KIND.RENT_OUT]: 'Rent out',
    [LISTING_KIND.SEARCHED_FOR]: 'Searched for',
};

const EMPTY_FORM = {
    listing_type: LISTING_TYPE_LABEL[LISTING_KIND.RENT_OUT],
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
    property_type: PROPERTY_TYPES[0],
};

const kindFromLabel = (label) =>
    label === LISTING_TYPE_LABEL[LISTING_KIND.SEARCHED_FOR] ? LISTING_KIND.SEARCHED_FOR : LISTING_KIND.RENT_OUT;

const toText = (value) => (value === undefined || value === null ? '' : String(value));

/** Maps a listing coming from the API to the form state. */
const toFormState = (kind, listing) => ({
    ...EMPTY_FORM,
    listing_type: LISTING_TYPE_LABEL[kind],
    title: listing.title,
    content: listing.content,
    country: listing.country,
    city: listing.city,
    bedrooms: toText(listing.bedrooms),
    bathrooms: toText(listing.bathrooms),
    sqft: toText(listing.footage),
    property_type: listing.propertyType,
    ...(kind === LISTING_KIND.RENT_OUT
        ? { address: listing.address, price: toText(listing.price), new_price: toText(listing.newPrice) }
        : { prefArea: listing.prefAreas.join(', '), max_price: toText(listing.price) }),
});

const REQUIRED_FIELDS = {
    title: 'Title required',
    content: 'Description required',
    country: 'Country required',
    city: 'City required',
    bedrooms: 'Bedrooms required',
    bathrooms: 'Bathrooms required',
    sqft: 'Square feet required',
    property_type: 'Property type required',
};

const REQUIRED_FIELDS_BY_KIND = {
    [LISTING_KIND.RENT_OUT]: { address: 'Address required', price: 'Price required' },
    [LISTING_KIND.SEARCHED_FOR]: { prefArea: 'Preferred areas required', max_price: 'Maximum price required' },
};

const validate = (form, kind) => {
    const requiredFields = { ...REQUIRED_FIELDS, ...REQUIRED_FIELDS_BY_KIND[kind] };

    return Object.fromEntries(
        Object.entries(requiredFields).filter(([field]) => !toText(form[field]).trim()),
    );
};

/** Maps the form state to the request body expected by the API. */
const toPayload = (form, kind, images) => {
    const common = {
        title: form.title.trim(),
        content: form.content.trim(),
        country: form.country.trim(),
        city: form.city.trim(),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        propertyType: form.property_type,
    };

    if (kind === LISTING_KIND.SEARCHED_FOR) {
        return {
            ...common,
            prefAreas: form.prefArea.split(',').map((area) => area.trim()).filter(Boolean),
            price: Number(form.max_price),
            footage: Number(form.sqft),
        };
    }

    return {
        ...common,
        address: form.address.trim(),
        price: Number(form.price),
        footage: form.sqft,
        ...(form.new_price !== '' && { newPrice: Number(form.new_price) }),
        ...(images.length > 0 && { images }),
    };
};

const FormField = ({ label, name, error, multiline = false, className = 'col-1', ...inputProps }) => {
    const InputTag = multiline ? 'textarea' : 'input';

    return (
        <div className={className}>
            <div className="form__listing--input__box">
                <label htmlFor={name} className='form__listing--input__label'>{label}</label>
                <InputTag
                    id={name}
                    name={name}
                    className={multiline ? 'form__listing--textarea__box' : 'form__listing--input__field'}
                    {...inputProps}
                />
            </div>
            {error && <span>{error}</span>}
        </div>
    );
};

const ListingForm = () => {
    const navigate = useNavigate();
    const { listing_id: listingId } = useParams();
    const [searchParams] = useSearchParams();
    const isEditMode = Boolean(listingId);
    const editedKind = searchParams.get('type') ?? LISTING_KIND.RENT_OUT;

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const kind = kindFromLabel(form.listing_type);
    const isRentOut = kind === LISTING_KIND.RENT_OUT;

    useEffect(() => {
        setErrors({});
        setUploadedImages([]);

        if (!isEditMode) {
            setForm(EMPTY_FORM);
            return undefined;
        }

        let isCancelled = false;
        getListing(editedKind, listingId)
            .then((listing) => !isCancelled && setForm(toFormState(editedKind, listing)))
            .catch((error) => !isCancelled && toast.error(getErrorMessage(error, 'Could not load this listing')));

        return () => {
            isCancelled = true;
        };
    }, [isEditMode, editedKind, listingId]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        e.target.value = '';
        if (!file) return;

        if (!VALID_IMAGE_TYPES.includes(file.type)) {
            setErrors((prev) => ({ ...prev, imgUpload: 'File must be in JPG/PNG format' }));
            return;
        }

        setErrors(({ imgUpload, ...rest }) => rest);
        setIsUploading(true);
        try {
            const imageUrl = await uploadImage(file);
            setUploadedImages((prev) => [...prev, imageUrl]);
        } catch (error) {
            setErrors((prev) => ({ ...prev, imgUpload: getErrorMessage(error, 'Image upload failed') }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate(form, kind);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const payload = toPayload(form, kind, uploadedImages);

        setIsSubmitting(true);
        try {
            if (isEditMode) {
                await updateListing(kind, listingId, payload);
                toast.success('Listing updated');
                navigate(`/listing-details/${listingId}?type=${kind}`);
            } else {
                await createListing(kind, payload);
                toast.success('Listing created');
                navigate('/profile/own-listings');
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    const fieldProps = (name) => ({ name, value: form[name], onChange: handleOnChange, error: errors[name] });

    return (
        <>
            <Header />
            <section className='listing__form--section'>
                <SideNav />
                <main className='lising__form--wrapper'>
                    <ProfileHeading />
                    <div className='listing__form'>
                        <div className="listing__form__inner">
                            <h3 className="listing__form__inner--title">
                                {isEditMode ? 'Update Listing' : 'Create Listing'}
                            </h3>
                            <form className="listing__form--form" onSubmit={handleSubmit} noValidate>
                                <div className="row">
                                    {!isEditMode && (
                                        <div className='col-1'>
                                            <div className="form__listing--input__box">
                                                <label htmlFor="listing_type" className='form__listing--input__label'>Listing type</label>
                                                <Dropdown
                                                    options={Object.values(LISTING_TYPE_LABEL)}
                                                    name='listing_type'
                                                    selected={form.listing_type}
                                                    handleOnChange={handleOnChange}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <FormField label='Title' type='text' placeholder='Your Title' {...fieldProps('title')} />
                                    <FormField label='Description' multiline placeholder='Your Description' {...fieldProps('content')} />
                                    <FormField label='Country' type='text' placeholder='Your Country' className='col-lg-2' {...fieldProps('country')} />
                                    <FormField label='City' type='text' placeholder='Your city' className='col-lg-2' {...fieldProps('city')} />

                                    {isRentOut ? (
                                        <>
                                            <FormField label='Address' type='text' placeholder='Your address' {...fieldProps('address')} />
                                            <FormField label='Price' type='number' min='0' placeholder='Your price' className='col-lg-2' {...fieldProps('price')} />
                                            <FormField label='New Price' type='number' min='0' placeholder='Your new price' className='col-lg-2' {...fieldProps('new_price')} />
                                        </>
                                    ) : (
                                        <>
                                            <FormField
                                                label='Preferred Areas'
                                                multiline
                                                placeholder='Your preferred areas, separated by commas'
                                                {...fieldProps('prefArea')}
                                            />
                                            <FormField label='Max Price' type='number' min='0' placeholder='Your max price' {...fieldProps('max_price')} />
                                        </>
                                    )}

                                    <FormField label='Bedrooms' type='number' min='0' placeholder='Your bedrooms' className='col-lg-3' {...fieldProps('bedrooms')} />
                                    <FormField label='Bathrooms' type='number' min='0' placeholder='Your bathrooms' className='col-lg-3' {...fieldProps('bathrooms')} />
                                    <FormField label='Square feet' type='number' min='0' placeholder='Your square feet' className='col-lg-3' {...fieldProps('sqft')} />

                                    <div className="col-1">
                                        <div className="form__listing--input__box">
                                            <label htmlFor="property_type" className='form__listing--input__label'>Property type</label>
                                            <Dropdown
                                                options={PROPERTY_TYPES}
                                                name='property_type'
                                                selected={form.property_type}
                                                handleOnChange={handleOnChange}
                                            />
                                        </div>
                                        {errors.property_type && <span>{errors.property_type}</span>}
                                    </div>

                                    {isRentOut && !isEditMode && (
                                        <div className="col-1">
                                            <div className="form__listing--photo__box">
                                                <p className='form__listing--photo__box--title'>Add Photos</p>
                                                <input id='imageInput' type='file' accept={VALID_IMAGE_TYPES.join(',')} hidden onChange={handleUpload} />
                                                <label htmlFor="imageInput" className='form__listing--photo__box--label'>
                                                    {isUploading ? 'Uploading...' : 'Upload'}
                                                </label>
                                            </div>
                                            <p>{uploadedImages.length} uploaded images</p>
                                            {errors.imgUpload && <span>{errors.imgUpload}</span>}
                                        </div>
                                    )}
                                </div>
                                <button type='submit' className='submit__btn' disabled={isSubmitting || isUploading}>
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
            <Footer />
        </>
    );
};

export default ListingForm;
