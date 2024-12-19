import React from 'react'

import cn from 'classnames';
import "./style.scss";
import { Link } from 'react-router-dom';

const PageLink = ({className, children, disabled, active, ...props}) => {
    const customClassName = cn('page-link', className, { active, disabled })
    if(disabled) {
        return <span className={customClassName}>{children}</span>
    }
    
    return (
        <Link {...props} className={customClassName} area-current={active ? 'page' : undefined}>
            {children}
        </Link>
    )
}

export default PageLink
