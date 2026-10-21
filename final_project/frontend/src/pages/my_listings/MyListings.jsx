import React, { useCallback, useEffect, useState } from 'react';
import { BsChatDots, BsThreeDotsVertical } from '../../components/icons';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.scss';
import { startConversation } from '../../api/chat';
import { getErrorMessage } from '../../api/client';
import { deleteListing } from '../../api/listings';
import { decideRentRequest, getOwnListings } from '../../api/user';
import ActionButton from '../../components/action_button/ActionButton';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Pagination from '../../components/pagination/Pagination';
import ProfileHeading from '../../components/profile_heading/ProfileHeading';
import SideNav from '../../components/sideNav/SideNav';
import { PAGE_SIZE } from '../../constants';
import { formatDate, formatLocation, getListingEditPath, getListingKind, isSearchedFor } from '../../utils/listing';

/** Status of a rent-out listing, plus who asked to rent it and what the owner can do about it. */
const ListingStatus = ({ listing, onDecision, onChat }) => {
    if (isSearchedFor(listing)) return null;

    const { tenant, status } = listing;

    return (
        <div className="rent__request">
            <span className="status">{status}</span>
            {tenant && (
                <>
                    <span className="rent__request--tenant">
                        {status === 'pending' ? 'Requested by' : 'Rented by'} {tenant.firstName} {tenant.lastName}
                    </span>
                    <div className="rent__request--actions">
                        <ActionButton variant="outline" onClick={() => onChat(listing)}>
                            <BsChatDots /> Chat
                        </ActionButton>
                        {status === 'pending' && (
                            <>
                                <ActionButton variant="success" onClick={() => onDecision(listing, 'accept')}>Approve</ActionButton>
                                <ActionButton variant="outline" onClick={() => onDecision(listing, 'reject')}>Reject</ActionButton>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

const ListingRow = ({ listing, onDelete, onDecision, onChat }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleDelete = () => {
        setIsMenuOpen(false);
        onDelete(listing);
    };

    return (
        <tr>
            <td>
                <div className="properties__author">
                    {listing.images?.length > 0 && (
                        <div className="properties__author--thumb">
                            <img src={listing.images[0]} alt={listing.title} />
                        </div>
                    )}
                    <div className="review__author--text">
                        <h3 className="review__author--title">{listing.title}</h3>
                        <p className='review__author--subtitle'>{formatLocation(listing)}</p>
                        <span className="properties__author--price">${listing.price}/mo</span>
                    </div>
                </div>
            </td>
            <td>
                <span className="reviews__date">{formatDate(listing.createdAt)}</span>
            </td>
            <td>
                <ListingStatus listing={listing} onDecision={onDecision} onChat={onChat} />
            </td>
            <td>
                <span className="properties__views">1210</span>
            </td>
            <td>
                <div className="reviews__action--wrapper">
                    <button
                        type='button'
                        className="review__action--btn"
                        aria-label='Listing actions'
                        onClick={() => setIsMenuOpen((open) => !open)}
                    >
                        <BsThreeDotsVertical />
                    </button>
                    <ul className={classNames('dropdown__menu', { is_open: isMenuOpen })}>
                        <li>
                            <Link to={getListingEditPath(listing)}>Edit</Link>
                        </li>
                        <li>
                            <button type='button' onClick={handleDelete}>Remove</button>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    );
};

const MyListings = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [listings, setListings] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchListings = useCallback(async () => {
        try {
            const { data, metaData } = await getOwnListings({ page: currentPage, limit: PAGE_SIZE });
            setListings(data);
            setTotalPages(metaData.totalPages);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Could not load your listings'));
        }
    }, [currentPage]);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    const handleDelete = async (listing) => {
        try {
            await deleteListing(getListingKind(listing), listing._id);
            toast.success('Listing deleted');
            // Step back when the last item of a page was removed.
            if (listings.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchListings();
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleDecision = async (listing, decision) => {
        try {
            await decideRentRequest(listing._id, decision);
            toast.success(decision === 'accept' ? 'Renting approved' : 'Rent request rejected');
            fetchListings();
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleChat = async (listing) => {
        try {
            const conversationId = await startConversation(listing._id);
            navigate(`/profile/messages/${conversationId}`);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Could not open the chat'));
        }
    };

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
                                        <th>Listing Title</th>
                                        <th>Date published</th>
                                        <th>Status</th>
                                        <th>View</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listings.map((listing) => (
                                        <ListingRow
                                            key={listing._id}
                                            listing={listing}
                                            onDelete={handleDelete}
                                            onDecision={handleDecision}
                                            onChat={handleChat}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            {listings.length === 0 && <p>You have not created any listings yet.</p>}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            lastPage={totalPages}
                            maxLength={7}
                            setCurrentPage={setCurrentPage}
                            url='/profile/own-listings'
                        />
                    </div>
                </main>
            </section>
            <Footer />
        </>
    );
};

export default MyListings;
