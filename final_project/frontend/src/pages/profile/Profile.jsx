import React from 'react'
import { MdOutlineCameraAlt } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";

import './style.scss';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SideNav from '../../components/sideNav/SideNav';
import ProfileHeading from '../../components/profile_heading/ProfileHeading';

const Profile = () => {
    return (
        <>
            <Header />
            <section className='profile__page--section'>
                <SideNav />
                <main className="main__content--wrapper">
                    <ProfileHeading />
                    <div className="dashboard__profile--wrapper">
                        <div className="profile__backgroung--thumbnail">
                            <img src="https://risingtheme.com/html/demo-newvilla/newvilla/admin/assets/img/dashboard/profile-sticky-thumbpng.png" alt="background_profile_img" />
                            <a href="" className="profile__edit--btn">
                                <MdOutlineCameraAlt />
                                <span>Edit</span>
                            </a>
                        </div>
                        <div className="profile__main--content">
                            <div className="profile__author">
                                <div className="profile__author--thumbnail">
                                    <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png" alt="profile__picture" />
                                </div>
                                <div className="profile__author--content">
                                    <h3 className="profile__author--title">Georgi Stalev</h3>
                                </div>
                            </div>
                            <div className="profile__info">
                                <ul className="profile__info--wrapper">
                                    <li className="profile__info--list">
                                        <h3 className="profile__info--title">EMAIL</h3>
                                        <a href="" className="profile__info--text">Example@gmail.com</a>
                                    </li>
                                    <li className="profile__info--list">
                                        <h3 className="profile__info--title">PHONE</h3>
                                        <a href="" className="profile__info--text">: 0885825150</a>
                                    </li>
                                </ul>
                                <ul className="profile__info--wrapper">
                                    <li className="profile__info--list">
                                        <h3 className="profile__info--title">BIRTHDAY</h3>
                                        <a href="" className="profile__info--text">8 February</a>
                                    </li>
                                    <li className="profile__info--list">
                                        <h3 className="profile__info--title">LOCATION</h3>
                                        <a href="" className="profile__info--text">Sofia, Bulgaria</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="profile__about--content">
                            <h3 className="profile__about--content__title">About Me</h3>
                            <p className="profile__about--content__desc">
                                The UI UX Designer helps create products with a good user experience. They are responsible for understanding what users want from their device and then designing it so they can find all of its features easily without any hassle. They also make sure everything works properly when combined in one package
                            </p>
                            <div className="social__share">
                                <h3 className="social__share--title">Follow me on</h3>
                                <ul className="social__share--wrapper">
                                    <li className="social__share--list">
                                        <a href="" className="social__share--icon">
                                            <FaFacebook />
                                        </a>
                                    </li>
                                    <li className="social__share--list">
                                        <a href="" className="social__share--icon">
                                            <FaInstagram />
                                        </a>
                                    </li>
                                    <li className="social__share--list">
                                        <a href="" className="social__share--icon">
                                            <FaTwitter />
                                        </a>
                                    </li>
                                    <li className="social__share--list">
                                        <a href="" className="social__share--icon">
                                            <FaPinterestP />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
            <Footer />
        </>
    )
}

export default Profile
