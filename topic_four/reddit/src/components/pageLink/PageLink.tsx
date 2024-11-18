import React, { HTMLProps } from 'react'
import cn from 'classnames';
import "./style.css";

type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

const PageLink = ({className, children, disabled, active, ...props}: Props) => {
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
