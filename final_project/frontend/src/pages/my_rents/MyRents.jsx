import React, { useEffect, useState } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Shares the dashboard table layout with "My Listings".
import '../my_listings/style.scss';
import '../../components/action_button/style.scss';
import { getErrorMessage } from '../../api/client';
import { getMyRents } from '../../api/user';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Pagination from '../../components/pagination/Pagination';
import ProfileHeading from '../../components/profile_heading/ProfileHeading';
import SideNav from '../../components/sideNav/SideNav';
import { PAGE_SIZE } from '../../constants';
import { formatDate, formatLocation, getListingDetailsPath } from '../../utils/listing';

const RENT_STATUS_LABEL = {
    pending: 'Awaiting owner',
    taken: 'Rented',
};

const RentRow = ({ listing }) => (
    <tr>
        <td>
            <div className="properties__author">
                {listing.images?.length > 0 && (
                    <div className="properties__author--thumb">
                        <img src={listing.images[0]} alt={listing.title} />
                    </div>
                )}
                <div className="review__author--text">
                    <h3 className="review__author--title">
                        <Link to={getListingDetailsPath(listing)}>{listing.title}</Link>
                    </h3>
                    <p className='review__author--subtitle'>{formatLocation(listing)}</p>
                    <span className="properties__author--price">${listing.price}/mo</span>
                </div>
            </div>
        </td>
        <td>
            <span className="reviews__date">{formatDate(listing.updatedAt)}</span>
        </td>
        <td>
            <span className="status">{RENT_STATUS_LABEL[listing.status] ?? listing.status}</span>
        </td>
        <td>
            {listing.conversationId ? (
                <Link to={`/profile/messages/${listing.conversationId}`} className="action__btn action__btn--outline">
                    <BsChatDots /> Chat with owner
                </Link>
            ) : (
                <span className="reviews__date">The owner will message you here</span>
            )}
        </td>
    </tr>
);

const MyRents = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rents, setRents] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        let isCancelled = false;

        getMyRents({ page: currentPage, limit: PAGE_SIZE })
            .then(({ data, metaData }) => {
                if (isCancelled) return;
                setRents(data);
                setTotalPages(metaData.totalPages);
            })
            .catch((error) => !isCancelled && toast.error(getErrorMessage(error, 'Could not load your rents')));

        return () => {
            isCancelled = true;
        };
    }, [currentPage]);

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
                                    <tr>
                                        <th>Property</th>
                                        <th>Last updated</th>
                                        <th>Status</th>
                                        <th>Chat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rents.map((listing) => <RentRow key={listing._id} listing={listing} />)}
                                </tbody>
                            </table>
                            {rents.length === 0 && (
                                <p>
                                    You have not rented any properties yet. <Link to='/listings'>Browse listings</Link>
                                </p>
                            )}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            lastPage={totalPages}
                            maxLength={7}
                            setCurrentPage={setCurrentPage}
                            url='/profile/my-rents'
                        />
                    </div>
                </main>
            </section>
            <Footer />
        </>
    );
};

export default MyRents;
