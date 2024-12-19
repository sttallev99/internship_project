import React, { useEffect, useRef } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


import './style.scss'

const Dropdown = ({options, name, id, handleOnChange}) => {
    const dropdownEl = useRef(null);

    useEffect(() => {
        dropdownEl.current.children[0].setAttribute('selected', true)
    }, []);

    return (
        <div className='custom__select'>
            <select name={name} ref={dropdownEl} onChange={handleOnChange}>
                {options.map(option => <option>{option}</option>)}
            </select>
        </div>
    )
}

export default Dropdown
