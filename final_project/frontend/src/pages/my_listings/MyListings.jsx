import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

import './style.scss';
import Header from '../../components/header/Header';
import SideNav from '../../components/sideNav/SideNav';
import Footer from '../../components/footer/Footer';
import ProfileHeading from '../../components/profile_heading/ProfileHeading';
import Pagination from '../../components/pagination/Pagination';

const ListingRow = () => {
    return (
        <>
            <tr>
                <td>
                    <div className="properties__author">
                        <div className="properties__author--thumb">
                            <img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg" alt="property image" />
                        </div>
                        <div className="review__author--text">
                            <h3 className="review__author--title">Luxury Family Home</h3>
                            <p className='review__author--subtitle'>1421 San Pedro St, Los Angeles, CA 900015</p>
                            <span class="properties__author--price">$1900/mo</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="reviews__date">13 Jan, 2024 </span>
                </td>
                <td>
                    <span class="status">Pending</span>
                </td>
                <td>
                    <span class="properties__views">1210</span>
                </td>
                <td>
                    <div className="reviews__action--wrapper">
                        <button className="review__action--btn">
                            <BsThreeDotsVertical />
                        </button>
                        <ul className="dropdown__menu">
                            <li>
                                <a href="#">Edit</a>
                            </li>
                            <li>
                                <a href="#">Remove</a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

const MyListings = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(10);

    return (
        <>
            <Header />
            <section className='my__listing__page--section'>
                <SideNav />
                <main className='dashboard__container'>
                    <ProfileHeading />
                    <div className="properties__wrapper">
                        <div className="properties__table">
                            <table className="properties__table--wrapper">
                                <thead>
                                    <th>Listing Title</th>
                                    <th>Date published</th>
                                    <th>Status</th>
                                    <th>View</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                    <ListingRow />
                                    <ListingRow />
                                    <ListingRow />
                                </tbody>
                            </table>
                        </div>
                        <Pagination currentPage={currentPage} lastPage={lastPage} maxLength={7} setCurrentPage={setCurrentPage}/>
                    </div>
                </main>
            </section>
            <Footer />
        </>
    )
}

export default MyListings
