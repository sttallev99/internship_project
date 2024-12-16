import React from 'react';
import { FaHome } from "react-icons/fa";

import './style.scss';

const Heading = ({classname}) => {
  return (
    <h3 className={`heading__subtitle ${classname}`}>
        <FaHome />
        &nbsp;Real estate agency
    </h3>
  )
}

export default Heading
