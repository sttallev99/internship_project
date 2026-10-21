import React from 'react';
import { MdOutlineCameraAlt } from '../../components/icons';
import { FaFacebook, FaInstagram, FaPinterestP, FaTwitter } from '../../components/icons';
import { useSelector } from 'react-redux';

import './style.scss';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ProfileHeading from '../../components/profile_heading/ProfileHeading';
import SideNav from '../../components/sideNav/SideNav';

const PROFILE_BACKGROUND_IMG =
    'https://risingtheme.com/html/demo-newvilla/newvilla/admin/assets/img/dashboard/profile-sticky-thumbpng.png';
const SOCIAL_ICONS = [FaFacebook, FaInstagram, FaTwitter, FaPinterestP];

const ProfileInfo = ({ title, value }) => (
    <li className="profile__info--list">
        <h3 className="profile__info--title">{title}</h3>
        <span className="profile__info--text">{value}</span>
    </li>
);

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <>
            <Header />
            <section className='profile__page--section'>
                <SideNav />
                <main className="main__content--wrapper">
                    <ProfileHeading />
                    <div className="dashboard__profile--wrapper">
                        <div className="profile__backgroung--thumbnail">
                            <img src={PROFILE_BACKGROUND_IMG} alt="" />
                            <button type='button' className="profile__edit--btn">
                                <MdOutlineCameraAlt />
                                <span>Edit</span>
                            </button>
                        </div>
                        <div className="profile__main--content">
                            <div className="profile__author">
                                <div className="profile__author--thumbnail">
                                    <img src={user.profilePicture} alt={fullName} />
                                </div>
                                <div className="profile__author--content">
                                    <h3 className="profile__author--title">{fullName}</h3>
                                </div>
                            </div>
                            <div className="profile__info">
                                <ul className="profile__info--wrapper">
                                    <ProfileInfo title='EMAIL' value={user.email} />
                                    <ProfileInfo title='PHONE' value={user.phoneNumber} />
                                </ul>
                                <ul className="profile__info--wrapper">
                                    <ProfileInfo title='NICKNAME' value={user.nickname} />
                                    <ProfileInfo title='NAME' value={fullName} />
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
                                    {SOCIAL_ICONS.map((Icon, index) => (
                                        <li className="social__share--list" key={index}>
                                            <span className="social__share--icon"><Icon /></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
            <Footer />
        </>
    );
};

export default Profile;
