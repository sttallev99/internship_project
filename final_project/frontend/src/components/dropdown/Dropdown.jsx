import React from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


import './style.scss'

const Dropdown = ({options, name, id}) => {
    return (
        <div className='custom__select'>
            <select name={name} >
                {options.map(option => <option>{option}</option>)}
            </select>
        </div>
    )
}

export default Dropdown
