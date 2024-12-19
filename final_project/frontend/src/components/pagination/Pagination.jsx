import React from 'react';

import PageLink from './page_links/PageLink';
import "./style.scss";
import { getPaginationItems } from '../../utils/pagination.js'

const Pagination = ({currentPage, lastPage, maxLength, setCurrentPage}) => {
    const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

    return (
        <nav className='pagination' aria-label='Pagination'>
            <PageLink 
                href='#'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous
            </PageLink>
            {pageNums.map((pageNum, inx) => (
                <PageLink 
                    key={inx} 
                    href='#'
                    active={pageNum === currentPage}
                    disabled={isNaN(pageNum)}
                    onClick={() => setCurrentPage(pageNum)}
                >
                    {!isNaN(pageNum) ? pageNum : '...'}
                </PageLink>
            ))}
            <PageLink 
                href='#' 
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </PageLink>
        </nav>
    )
}

export default Pagination
