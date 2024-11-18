import PageLink from 'components/pageLink/PageLink';
import React from 'react';
import "./style.css";
import { getPaginationItems } from 'utils/pagination';

export type Props ={
    currentPage: number,
    lastPage: number,
    maxLength: number,
    setCurrentPage: (page: number) => void;
}

const Pagination = ({currentPage, lastPage, maxLength, setCurrentPage}: Props) => {
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
