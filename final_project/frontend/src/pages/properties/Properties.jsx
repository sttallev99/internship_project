import { useEffect, useState } from 'react';
import { BiSort } from '../../components/icons';
import { toast } from 'react-toastify';

import './style.scss';
import Filter, { INITIAL_FILTERS } from './filter/Filter';
import { getErrorMessage } from '../../api/client';
import { searchListings } from '../../api/listings';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Pagination from '../../components/pagination/Pagination';
import PropertyCard from '../../components/property_card/PropertyCard';
import { PAGE_SIZE, SORT_OPTIONS } from '../../constants';

const EMPTY_PAGE = { data: [], metaData: { totalDocuments: 0, totalPages: 0, presentedDocs: 0 } };

const toSearchParams = (filters, sortBy, page) => ({
    page,
    limit: PAGE_SIZE,
    sortBy,
    searchTerm: filters.searchTerm,
    listingType: filters.listingType,
    propertyType: filters.propertyType.join(','),
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
});

const Properties = () => {
    // `filters` is what the user is editing; `appliedFilters` is what the results reflect.
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value);
    const [currentPage, setCurrentPage] = useState(1);
    const [listingsPage, setListingsPage] = useState(EMPTY_PAGE);

    useEffect(() => {
        let isCancelled = false;

        searchListings(toSearchParams(appliedFilters, sortBy, currentPage))
            .then((page) => !isCancelled && setListingsPage(page))
            .catch((error) => !isCancelled && toast.error(getErrorMessage(error)));

        return () => {
            isCancelled = true;
        };
    }, [appliedFilters, sortBy, currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        setAppliedFilters(filters);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    const { data: listings, metaData } = listingsPage;

    return (
        <>
            <Header />
            <section className="listing__page--section">
                <div className="container">
                    <div className="row">
                        <Filter filters={filters} setFilters={setFilters} onSubmit={handleSearch} />
                        <div className='col-lg-8'>
                            <div className="listing__page--wrapper">
                                <div className="listing__header">
                                    <div className="listing__header--left">
                                        <p className="results__count--text">
                                            Showing {metaData.presentedDocs} of {metaData.totalDocuments} Results
                                        </p>
                                    </div>
                                    <div className="listing__header--right">
                                        <span className="recently__select"><BiSort /></span>
                                        <div className="select">
                                            <select name="sort_options" value={sortBy} onChange={handleSortChange}>
                                                {SORT_OPTIONS.map(({ value, label }) => (
                                                    <option key={value} value={value}>{label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="listing__main--content">
                                    <div className="listing__featured--list">
                                        {listings.length === 0 && <p>No listings match your search.</p>}
                                        {listings.map((listing) => <PropertyCard data={listing} key={listing._id} />)}
                                    </div>
                                    <Pagination
                                        currentPage={currentPage}
                                        lastPage={metaData.totalPages}
                                        maxLength={7}
                                        setCurrentPage={setCurrentPage}
                                        url='/listings'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Properties;
