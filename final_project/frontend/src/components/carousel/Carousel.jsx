import React, { useEffect, useState } from 'react'

import './style.scss';

const Carousel = ({images, sliderPosition, paginationPosition}) => {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(null);


    useEffect(() => {
        setTimeout(() => {
            slideRight()
        }, 3000)
    });

    const slideRight = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    }
    const 
    sliderPositionProp = sliderPosition.position
    const sliderPositionVal = sliderPosition.pixels
    return (
        <div 
            className={sliderPosition.hasOwnProperty('fullWidth') ? 'carousel__full_w' : 'carousel'} 
            style={{[sliderPositionProp]: sliderPositionVal + 'px'}}
        >
            <div className="carousel__wrapper">
                {images.map((image, index) => {
                    return(
                        <div key={index} className={index == current ? 'carousel__card carousel__card--active' : 'carousel__card'}>
                            <img src={image.image} alt="" className='card__img'/>
                            <div className="card__overlay">
                            </div>
                        </div>
                    )
                })}
                <div className={"carousel__pagination__" + paginationPosition.position}>
                    {images.map((_, index) => (
                        <div 
                            key={index}
                            className={index == current ? 'pagination__dot pagination__dot--active' : 'pagination__dot'}
                            onClick={() => setCurrent(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel
