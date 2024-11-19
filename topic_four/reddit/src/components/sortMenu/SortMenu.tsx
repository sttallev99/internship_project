import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import classNames from 'classnames';
import './style.css'

interface Props {
    filterOption: string,
    setFilterOption: React.Dispatch<React.SetStateAction<string>>

}
const SortMenu = ({filterOption, setFilterOption}:Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownListClasses = classNames('dropdown-list-container', {'show': isOpen});
    return (
        <>
        <div className='sort-menu-container'>
            <div className='sort-option-container'>
                <div className='dropdown-header' onClick={() => setIsOpen(!isOpen)}>
                <span>{filterOption === '' ? 'All' : filterOption}</span>
                <MdOutlineKeyboardArrowDown />
                </div>
                <div className={dropDownListClasses}>
                    <ul className='dropdown-list'>
                        <li className='list-item' onClick={() => {
                            setFilterOption('all');
                            setIsOpen(!isOpen)
                        }}>All</li>
                        <li className='list-item' onClick={() => {
                            setFilterOption('today');
                            setIsOpen(!isOpen)
                        }}>Today</li>
                        <li className='list-item' onClick={() => {
                            setFilterOption('this week')
                            setIsOpen(!isOpen)
                        }}>This week</li>
                        <li className='list-item' onClick={() => {
                            setFilterOption('this month');
                            setIsOpen(!isOpen)
                        }}>This Month</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default SortMenu
