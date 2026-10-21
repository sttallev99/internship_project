import React from 'react';

import './style.scss';

const Dropdown = ({ options, name, id, selected, handleOnChange }) => (
    <div className='custom__select'>
        <select name={name} id={id ?? name} value={selected ?? ''} onChange={handleOnChange}>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

export default Dropdown;
