import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls the window back to the top whenever the route changes. */
const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return children;
};

export default ScrollToTop;
