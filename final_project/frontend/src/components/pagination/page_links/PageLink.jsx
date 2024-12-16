import React from 'react'

import cn from 'classnames';
import "./style.scss";

const PageLink = ({className, children, disabled, active, ...props}) => {
    const customClassName = cn('page-link', className, { active, disabled })
    if(disabled) {
        return <span className={customClassName}>{children}</span>
    }
    
    return (
        <a {...props} className={customClassName} area-current={active ? 'page' : undefined}>
            {children}
        </a>
    )
}

export default PageLink
