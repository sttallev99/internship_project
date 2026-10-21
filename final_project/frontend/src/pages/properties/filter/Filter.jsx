import React from 'react';
import { FaSearch } from 'react-icons/fa';

import './style.scss';
import { LISTING_TYPE_FILTER, PRICE_RANGE, PROPERTY_TYPES } from '../../../constants';

export const INITIAL_FILTERS = {
    searchTerm: '',
    listingType: '',
    propertyType: [],
    minPrice: '',
    maxPrice: '',
};

const LISTING_TYPE_OPTIONS = [
    { value: LISTING_TYPE_FILTER.RENT_OUT, label: 'Rent Out' },
    { value: LISTING_TYPE_FILTER.SEARCH_FOR, label: 'Search For' },
];

// An empty price filter means "no bound", which the slider shows as its outermost position.
const toSliderValue = (price, fallback) => (price === '' ? fallback : Number(price));
const toPercent = (value) => ((value - PRICE_RANGE.min) / (PRICE_RANGE.max - PRICE_RANGE.min)) * 100;

const Filter = ({ filters, setFilters, onSubmit }) => {
    const minPrice = toSliderValue(filters.minPrice, PRICE_RANGE.min);
    const maxPrice = toSliderValue(filters.maxPrice, PRICE_RANGE.max);

    const updateFilters = (patch) => setFilters((prev) => ({ ...prev, ...patch }));

    const toggleListingType = (value) => (e) => {
        updateFilters({ listingType: e.target.checked ? value : '' });
    };

    const togglePropertyType = (type) => () => {
        setFilters((prev) => ({
            ...prev,
            propertyType: prev.propertyType.includes(type)
                ? prev.propertyType.filter((item) => item !== type)
                : [...prev.propertyType, type],
        }));
    };

    const handleMinPriceChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - PRICE_RANGE.gap);
        updateFilters({ minPrice: value <= PRICE_RANGE.min ? '' : String(value) });
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + PRICE_RANGE.gap);
        updateFilters({ maxPrice: value >= PRICE_RANGE.max ? '' : String(value) });
    };

    return (
        <div className="col-lg-4">
            <form className="listing__widget" onSubmit={onSubmit}>
                <div className="widget__search">
                    <div className="widget__search--input">
                        <input
                            type="text"
                            className="widget__seatch--input__field"
                            placeholder='Search Product'
                            value={filters.searchTerm}
                            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                        />
                        <button type='submit' className='widget__search--btn' aria-label='Search'>
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <div className="listing__widget--inner">
                    <div className="widget__list">
                        <h2 className="widget__title">Listing Type</h2>
                        <ul className='widget__categories'>
                            {LISTING_TYPE_OPTIONS.map(({ value, label }) => (
                                <li className="wdiget__categories__list" key={value}>
                                    <label htmlFor={value} className="widget__catergories--label">{label}</label>
                                    <input
                                        type="checkbox"
                                        id={value}
                                        className='widget__categories--input'
                                        checked={filters.listingType === value}
                                        onChange={toggleListingType(value)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="widget__list">
                        <h2 className="widget__title">Property Type</h2>
                        <ul className='widget__categories'>
                            {PROPERTY_TYPES.map((type) => (
                                <li className="wdiget__categories__list" key={type}>
                                    <label htmlFor={type} className="widget__catergories--label">{type}</label>
                                    <input
                                        type="checkbox"
                                        id={type}
                                        className='widget__categories--input'
                                        checked={filters.propertyType.includes(type)}
                                        onChange={togglePropertyType(type)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="widget__list">
                        <h2 className="widget__title">Price filtering</h2>
                        <div className="widget__price--filtering">
                            <div className="price__input">
                                <div className='input__min'>{minPrice}</div>
                                <div className='separator'>-</div>
                                <div className='input__max'>{maxPrice}</div>
                            </div>
                            <div className='slider'>
                                <div
                                    className="progress"
                                    style={{ left: `${toPercent(minPrice)}%`, right: `${100 - toPercent(maxPrice)}%` }}
                                ></div>
                            </div>
                            <div className="range__input">
                                <input
                                    type="range"
                                    className="range__min"
                                    aria-label='Minimum price'
                                    min={PRICE_RANGE.min}
                                    max={PRICE_RANGE.max}
                                    step={PRICE_RANGE.step}
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                />
                                <input
                                    type="range"
                                    className="range__max"
                                    aria-label='Maximum price'
                                    min={PRICE_RANGE.min}
                                    max={PRICE_RANGE.max}
                                    step={PRICE_RANGE.step}
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                />
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='firter__search--btn'>Search</button>
                </div>
            </form>
        </div>
    );
};

export default Filter;
