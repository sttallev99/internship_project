import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";

import './style.scss';

const Properties = () => {
    const [min, setMin] = useState(100);
    const [max,setMax] = useState(5000);

    const progressEl = useRef(null);
    const minRangeEl = useRef(null);
    const maxRangeEl = useRef(null);

    const priceGap = 200;

    const onInputHandler = (e) => {
        if(e.target.id === 'min') {
            setMin(parseInt(e.target.value))
        } else if(e.target.id === 'max') {
            setMax(parseInt(e.target.value))
        }

        if(max - min < priceGap) {
            if(e.target.id === 'min') {
                minRangeEl.current.value = max - priceGap
            } else {
                maxRangeEl.current.value = min + priceGap
            }
        }
    }

    useEffect(() => {
        progressEl.current.style.left = (min / minRangeEl.current.max) * 100 + "%"
        progressEl.current.style.right = 100 - (max / maxRangeEl.current.max) * 100 + "%"
    }, [min, max])

    return (
        <div className="col-lg-4">
            <div className="listing__widget">
                <div className="widget__search">
                    <div className="widget__search--input">
                        <input type="text" className="widget__seatch--input__field" placeholder='Search Product'/>
                        <button className='widget__search--btn'><FaSearch /></button>
                    </div>
                </div>
                <div className="listing__widget--inner">
                    <div className="widget__list">
                        <h2 className="widget__title">Property Type</h2>
                        <ul className='widget__categories'>
                            <li className="wdiget__categories__list">
                                <label htmlFor="check1" className="widget__catergories--label">Apartment (8)</label>
                                <input type="checkbox" id='check1' className='widget__categories--input'/>
                            </li>
                            <li className="wdiget__categories__list">
                                <label htmlFor="check2" className="widget__catergories--label">Container Home (5)</label>
                                <input type="checkbox" id='check2' className='widget__categories--input'/>
                            </li>
                            <li className="wdiget__categories__list">
                                <label htmlFor="check3" className="widget__catergories--label">Tiny Home (5)</label>
                                <input type="checkbox" id='check3' className='widget__categories--input'/>
                            </li>
                            <li className="wdiget__categories__list">
                                <label htmlFor="check4" className="widget__catergories--label">Villa Type (1)</label>
                                <input type="checkbox" id='check4' className='widget__categories--input'/>
                            </li>
                            <li className="wdiget__categories__list">
                                <label htmlFor="check5" className="widget__catergories--label">Duplex Modern Houses (7)</label>
                                <input type="checkbox" id='check5' className='widget__categories--input'/>
                            </li>
                        </ul>
                    </div>
                    <div className="widget__list">
                        <h2 className="widget__title">Price filtering</h2>
        
                        <div className="widget__price--filtering">
                            <div className="price__input">
                                <div className='input__min'>{min}</div>
                                <div className='separator'>-</div>
                                <div className='input__max'>{max}</div>
                            </div>
                            <div className='slider'>
                                <div className="progress" ref={progressEl}>
        
                                </div>
                            </div>
                            <div className="range__input">
                                <input type="range" id='min' className="range__min" min='100' max='5000' defaultValue={min} onInput={onInputHandler} ref={minRangeEl} step={100}/>
                                <input type="range" id='max' className="range__max" min='100' max='5000' defaultValue={max} onInput={onInputHandler} ref={maxRangeEl} step={100}/>
                            </div>
                        </div>
                    </div>
        
                    <div className="widget__list">
                        <h2 className="widget__title">Find By Location</h2>
                        <ul className="widget__location">
                            <li className="widget__location--list">
                                <label htmlFor="check6" className="widget__location--label">Australia</label>
                                <input type="checkbox" className="widget__categories--input" id='check6'/>
                            </li>
                            <li className="widget__location--list">
                                <label htmlFor="check7" className="widget__location--label">Swezarland</label>
                                <input type="checkbox" className="widget__categories--input" id='check7'/>
                            </li>
                            <li className="widget__location--list">
                                <label htmlFor="check8" className="widget__location--label">Bulgaria</label>
                                <input type="checkbox" className="widget__categories--input" id='check8'/>
                            </li>
                            <li className="widget__location--list">
                                <label htmlFor="check9" className="widget__location--label">California</label>
                                <input type="checkbox" className="widget__categories--input" id='check9'/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Properties
