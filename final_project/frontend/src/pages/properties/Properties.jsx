import { BiSort } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from 'axios'
import { baseUrl } from '../../constants'

import './style.scss';
import Filter from './filter/Filter'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PropertyCard from '../../components/property_card/PropertyCard';
import Pagination from '../../components/pagination/Pagination'

const Properties = () => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null)
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async() => {
            const response = await axios.get(`${baseUrl}/listing?page=${currentPage}&limit=5`);
            setLastPage(response.data.listingsData.metaData.totalPages)
            setListings([
                ...response.data.listingsData.data
            ]);
        }

        fetchListings();
    },[currentPage])

    console.log('page num', lastPage)

    return (
        <>
            <Header />
            <section className="listing__page--section">
                <div className="container">
                    <div className="row">
                        <Filter />
                        <div className='col-lg-8'>
                            <div className="listing__page--wrapper">
                                <div className="listing__header">
                                    <div className="listing__header--left">
                                        <p className="results__count--text">Showing 12 of 21 Results</p>
                                    </div>
                                    <div className="listing__header--right">
                                        <span className="recently__select"><BiSort /></span>
                                        <div className="select">
                                            <select name="sort_options">
                                                <option selected value="1">Recently Added</option>
                                                <option value="2">Price Low</option>
                                                <option value="3">Price High</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="listing__main--content">
                                    <div className="listing__featured--list">
                                        {listings.map(listing => <PropertyCard data={listing} />)}
                                    </div>
                                    <Pagination currentPage={currentPage} lastPage={lastPage} maxLength={7} setCurrentPage={setCurrentPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Properties
