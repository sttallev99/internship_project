import React from 'react';
import classNames from 'classnames';

import './style.scss';

/** Small inline button used for row and chat actions. `variant`: "primary" | "success" | "outline". */
const ActionButton = ({ variant = 'primary', className, type = 'button', ...props }) => (
    <button type={type} className={classNames('action__btn', `action__btn--${variant}`, className)} {...props} />
);

export default ActionButton;
