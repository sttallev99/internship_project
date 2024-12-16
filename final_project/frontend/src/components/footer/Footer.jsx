import React from 'react'
import './style.scss'
import payments from '../../assets/payment-img.png'
const Footer = () => {
  return (
    <div className='footer__section'>
      <div className='container'>
        <div className='footer__wrapper'>
          <div className='footer__wrapper--content'>
            <div className='footer__wrapper--col first-col'>
              <a href="#" className='footer__logo'>
                <h2>Real Estate</h2>
              </a>
              <div className='site__info'>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book
                </span>
                <span>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                  of classical Latin literature from 45 BC, making it over 2000 years old.
                </span>
              </div>
            </div>
            <div className='footer__wrapper--col'>
              <div className='footer__widget'>
                <h2 className='footer__widget--title'>Services</h2>
                <ul className='footer__widget--menu'>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Property on sale</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Team member</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Offices to Buy</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Terms of use</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Offices to Rent</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='footer__wrapper--col'>
              <div className='footer__widget'>
                <h2 className='footer__widget--title'>Contact</h2>
                <ul className='footer__widget--menu'>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Help/FAQ</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Propert owners</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Contact Support</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Pricing Plans</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Partners</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='footer__wrapper--col'>
              <div className='footer__widget'>
                <h2 className='footer__widget--title'>Quick Links</h2>
                <ul className='footer__widget--menu'>
                  <li className='footer__widget--menu_list'>
                    <a href="#" className='footer__widget--menu__text'>About Us</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Contact</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Services Details</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Add Listing</a>
                  </li>
                  <li className='footer__widget--menu__list'>
                    <a href="#" className='footer__widget--menu__text'>Property</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer__bottom'>
        <div className='container'>
          <div className='footer__bottom--inner'>
            <p className='copyright__content'>&copy; 2024 Powered By Georgi Stalev . All Rights Reserved</p>
            <img className='footer__payment' src={payments} alt="payment methods" />
            <ul className='footer__bottom--menu'>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
