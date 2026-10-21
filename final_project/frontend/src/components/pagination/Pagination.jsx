import React from 'react';

import PageLink from './page_links/PageLink';
import './style.scss';
import { getPaginationItems } from '../../utils/pagination.js';

const Pagination = ({ currentPage, lastPage, maxLength, setCurrentPage, url }) => {
    if (!lastPage || lastPage < 2) return null;

    const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <nav className='pagination' aria-label='Pagination'>
            <PageLink to={url} disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
                Previous
            </PageLink>
            {pageNums.map((pageNum, index) => (
                <PageLink
                    key={index}
                    to={url}
                    active={pageNum === currentPage}
                    disabled={isNaN(pageNum)}
                    onClick={() => goToPage(pageNum)}
                >
                    {isNaN(pageNum) ? '...' : pageNum}
                </PageLink>
            ))}
            <PageLink to={url} disabled={currentPage === lastPage} onClick={() => goToPage(currentPage + 1)}>
                Next
            </PageLink>
        </nav>
    );
};

export default Pagination;
