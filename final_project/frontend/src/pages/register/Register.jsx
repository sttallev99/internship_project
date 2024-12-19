import React, { useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Header from '../../components/header/Header';
import './style.scss';
import Footer from '../../components/footer/Footer';
import { baseUrl } from '../../constants';
import { addUser } from '../../features/userSlice';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!formData.email.trim()) {
            validationErrors.email = 'Email required'
        } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            validationErrors.email = 'Email is not valid'
        }
        if(!formData.password.trim()) {
            validationErrors.password = 'Password required';
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0 ) {
            try {
                const response = await axios.post(`${baseUrl}/sign-in`, formData);
                if(response.data.success) {
                    dispatch(addUser(response.data.user));
                    navigate('/')
                }

            } catch(err) {
                console.log(err)
            }
        }

    }

    return (
        <>
            <form action="#" className='account__form--conrainer'>
                <div className='account__form--input'>
                    <label htmlFor='email' className='account__form--input__label'>Email Address</label>
                    <input 
                        type="text" 
                        className='account__form--input__field' 
                        id='email' 
                        placeholder='Enter Emai Address*'
                        name='email'
                        onChange={handleOnChange}
                    />
                </div>
                <div className='account__form--input'>
                    <label htmlFor='password' className='account__form--input__label'>Password</label>
                    <input 
                        type="password" 
                        className='account__form--input__field' 
                        id='password' 
                        placeholder='Create password*'
                        name='password'
                        onChange={handleOnChange}
                    />
                </div>
                <button className='account__form--btn' type='submit' onClick={handleSubmit}>Login</button>
            </form>
        </>
    )
}

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        phoneNumber: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const confirmPassEl = useRef(null);
    const confirmCheckEl = useRef(null);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if(!formData.firstName.trim()) {
            validationErrors.firstName = 'First name required'
        }
        if(!formData.lastName.trim()) {
            validationErrors.lastName = 'Last name required'
        }
        if(!formData.nickname.trim()) {
           validationErrors.nickname = 'Nickname required'
        }
        if(!formData.email.trim()) {
            validationErrors.email = 'Email required'
        } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            validationErrors.email = 'Email is not valid'
        }
        if(!formData.phoneNumber.trim()) {
            validationErrors.phoneNumber = 'Phone number required'
        }
        if(!formData.password.trim()) {
            validationErrors.password = 'Password required'
        }
        if(confirmPassEl.current.value !== formData.password) {
            validationErrors.confirmPassword = 'password not match'
        }
        if(!confirmCheckEl.current.checked) {
            validationErrors.confirmTerms = 'Terms need to be checked'
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            try {
                const res = await axios.post(`${baseUrl}/sign-up`, { ...formData });

                if(res.data.success) {
                    navigate('/login')
                }
            }catch(err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <form action="#" className='account__form--conrainer'>
                <div className='account__form--input'>
                    <label htmlFor='fname' className='account__form--input__label'>First Name</label>
                    <input 
                        type="text" 
                        name='firstName'
                        className='account__form--input__field' 
                        id='fname' 
                        placeholder='Enter your First Name*'
                        onChange={handleOnChange}
                    />
                    {errors.firstName && <span>{errors.firstName}</span>}
                </div>
                <div className='account__form--input'>
                    <label htmlFor='fname' className='account__form--input__label'>Last Name</label>
                    <input 
                        type="text" 
                        name='lastName'
                        className='account__form--input__field' 
                        id='fname' 
                        placeholder='Enter your Last Name*'
                        onChange={handleOnChange}
                    />
                    {errors.lastName && <span>{errors.lastName}</span>}
                </div>
                <div className='account__form--input'>
                    <label htmlFor='nickname' className='account__form--input__label'>Nickname</label>
                    <input 
                        type="text"
                        name='nickname' 
                        className='account__form--input__field' 
                        id='nickname' 
                        placeholder='Enter Nickname*'
                        onChange={handleOnChange} 
                    />
                    {errors.nickname && <span>{errors.nickname}</span>}
                </div>
                <div className='account__form--input'>
                    <label htmlFor='email' className='account__form--input__label'>Email Address</label>
                    <input 
                        type="text"
                        name='email' 
                        className='account__form--input__field' 
                        id='email' 
                        placeholder='Enter Emai Address*'
                        onChange={handleOnChange}
                    />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div className='account__form--input'>
                    <label htmlFor='email' className='account__form--input__label'>Phone number</label>
                    <input 
                        type="text"
                        name='phoneNumber' 
                        className='account__form--input__field' 
                        id='email' 
                        placeholder='Enter Phone Number*'
                        onChange={handleOnChange} 
                    />
                    {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                </div>
                <div className='account__form--input'>
                    <label htmlFor='password' className='account__form--input__label'>New Password</label>
                    <input 
                        type="text"
                        name='password' 
                        className='account__form--input__field' 
                        id='password' 
                        placeholder='Create password*'
                        onChange={handleOnChange} 
                    />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div className='account__form--input'>
                    <label htmlFor='confpassword' className='account__form--input__label'>Confirm Password</label>
                    <input 
                        type="text"
                        name='confirmPassword' 
                        className='account__form--input__field' 
                        id='confpassword' 
                        placeholder='Confirm password*'
                        ref={confirmPassEl}
                    />
                    {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className='account__form--condition'>
                    <input 
                        className='account__form--condition__input' 
                        id='condition' 
                        type="checkbox"
                        name='confirmTerms'
                        ref={confirmCheckEl} 
                    />
                    <label className="account__form--condition__checkmark" htmlFor="condition">
                        I agree to all  
                        <span> Terms & Condition.</span>
                    </label>
                    {errors.confirmTerms && <span>{errors.confirmTerms}</span>}
                </div>
                <button className='account__form--btn' type='submit' onClick={handleSumbit}>Create an account</button>
            </form>
        </>
    )    
}


const Register = () => {
    const location = useLocation();
  return (
    <>
        <Header />
        <Breadcrumb />
        <section className='accout__page--section'>
            <div className='container'>
                <div className='account__tab--btn'>
                    <ul className='account__tab--btn__wrapper'>
                        <NavLink to='/register' className='account__tab--btn--items'>
                            Sign up
                        </NavLink>
                        <NavLink to='/login' className='account__tab--btn--items'>
                            Login
                        </NavLink>
                    </ul>
                </div>
                <div className='account__form--wrapper'>
                    <div className='account__header'>
                        <h2 className='account__title'>Sign Up Today!</h2>
                        <p className='account__desc'>
                            Hey! Enter your details to make an account & become member
                        </p>
                    </div>
                    <div className='account__form'>
                        {
                            location.pathname === '/login' ? <LoginForm /> : location.pathname === '/register' ? <RegisterForm /> : <></>
                        }
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Register
