import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './style.scss';

const AUTOPLAY_INTERVAL_MS = 3000;

/** `images` may be plain URLs or `{ image }` objects (local assets). */
const getImageSrc = (image) => (typeof image === 'string' ? image : image.image);

const Carousel = ({ images, sliderPosition, paginationPosition }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (images.length < 2) return undefined;

        const timer = setInterval(() => {
            setCurrent((index) => (index + 1) % images.length);
        }, AUTOPLAY_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div
            className={sliderPosition.fullWidth ? 'carousel__full_w' : 'carousel'}
            style={{ [sliderPosition.position]: `${sliderPosition.pixels}px` }}
        >
            <div className="carousel__wrapper">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={classNames('carousel__card', { 'carousel__card--active': index === current })}
                    >
                        <img src={getImageSrc(image)} alt="" className='card__img' />
                        <div className="card__overlay"></div>
                    </div>
                ))}
                <div className={`carousel__pagination__${paginationPosition.position}`}>
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={classNames('pagination__dot', { 'pagination__dot--active': index === current })}
                            onClick={() => setCurrent(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
