import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.scss';
import { signIn, signUp } from '../../api/auth';
import { getErrorMessage } from '../../api/client';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { EMAIL_PATTERN } from '../../constants';
import { addUser } from '../../features/userSlice';

const validateEmail = (email) => {
    if (!email.trim()) return 'Email required';
    if (!EMAIL_PATTERN.test(email.trim())) return 'Email is not valid';
    return undefined;
};

/** Drops the keys whose value is empty, so `errors` only holds real messages. */
const compact = (errors) => Object.fromEntries(Object.entries(errors).filter(([, message]) => message));

const AccountField = ({ label, id, error, ...inputProps }) => (
    <div className='account__form--input'>
        <label htmlFor={id} className='account__form--input__label'>{label}</label>
        <input id={id} className='account__form--input__field' {...inputProps} />
        {error && <span>{error}</span>}
    </div>
);

const useFormState = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    return [formData, handleOnChange];
};

const LoginForm = () => {
    const [formData, handleOnChange] = useFormState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = compact({
            email: validateEmail(formData.email),
            password: !formData.password && 'Password required',
        });
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);
        try {
            const user = await signIn({ email: formData.email.trim(), password: formData.password });
            dispatch(addUser(user));
            toast.success(`Welcome back, ${user.firstName}!`);
            navigate('/');
        } catch (error) {
            toast.error(getErrorMessage(error, 'Login failed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className='account__form--conrainer' onSubmit={handleSubmit} noValidate>
            <AccountField
                label='Email Address'
                id='login-email'
                type='email'
                name='email'
                placeholder='Enter Email Address*'
                autoComplete='email'
                value={formData.email}
                onChange={handleOnChange}
                error={errors.email}
            />
            <AccountField
                label='Password'
                id='login-password'
                type='password'
                name='password'
                placeholder='Enter password*'
                autoComplete='current-password'
                value={formData.password}
                onChange={handleOnChange}
                error={errors.password}
            />
            <button className='account__form--btn' type='submit' disabled={isSubmitting}>Login</button>
        </form>
    );
};

const RegisterForm = () => {
    const [formData, handleOnChange] = useFormState({
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = compact({
            firstName: !formData.firstName.trim() && 'First name required',
            lastName: !formData.lastName.trim() && 'Last name required',
            nickname: !formData.nickname.trim() && 'Nickname required',
            email: validateEmail(formData.email),
            phoneNumber: !formData.phoneNumber.trim() && 'Phone number required',
            password: !formData.password && 'Password required',
            confirmPassword: formData.confirmPassword !== formData.password && 'Passwords do not match',
            acceptTerms: !formData.acceptTerms && 'Terms need to be accepted',
        });
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const { confirmPassword, acceptTerms, ...user } = formData;

        setIsSubmitting(true);
        try {
            await signUp({ ...user, email: user.email.trim() });
            toast.success('Account created! You can now log in.');
            navigate('/login');
        } catch (error) {
            toast.error(getErrorMessage(error, 'Registration failed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const fieldProps = (name) => ({ name, value: formData[name], onChange: handleOnChange, error: errors[name] });

    return (
        <form className='account__form--conrainer' onSubmit={handleSubmit} noValidate>
            <AccountField label='First Name' id='first-name' type='text' placeholder='Enter your First Name*' autoComplete='given-name' {...fieldProps('firstName')} />
            <AccountField label='Last Name' id='last-name' type='text' placeholder='Enter your Last Name*' autoComplete='family-name' {...fieldProps('lastName')} />
            <AccountField label='Nickname' id='nickname' type='text' placeholder='Enter Nickname*' autoComplete='nickname' {...fieldProps('nickname')} />
            <AccountField label='Email Address' id='register-email' type='email' placeholder='Enter Email Address*' autoComplete='email' {...fieldProps('email')} />
            <AccountField label='Phone number' id='phone-number' type='tel' placeholder='Enter Phone Number*' autoComplete='tel' {...fieldProps('phoneNumber')} />
            <AccountField label='New Password' id='register-password' type='password' placeholder='Create password*' autoComplete='new-password' {...fieldProps('password')} />
            <AccountField label='Confirm Password' id='confirm-password' type='password' placeholder='Confirm password*' autoComplete='new-password' {...fieldProps('confirmPassword')} />
            <div className='account__form--condition'>
                <input
                    className='account__form--condition__input'
                    id='accept-terms'
                    type="checkbox"
                    name='acceptTerms'
                    checked={formData.acceptTerms}
                    onChange={handleOnChange}
                />
                <label className="account__form--condition__checkmark" htmlFor="accept-terms">
                    I agree to all
                    <span> Terms & Condition.</span>
                </label>
                {errors.acceptTerms && <span>{errors.acceptTerms}</span>}
            </div>
            <button className='account__form--btn' type='submit' disabled={isSubmitting}>Create an account</button>
        </form>
    );
};

const Register = () => {
    const { pathname } = useLocation();
    const isLogin = pathname === '/login';

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
                            <h2 className='account__title'>{isLogin ? 'Welcome Back!' : 'Sign Up Today!'}</h2>
                            <p className='account__desc'>
                                {isLogin
                                    ? 'Enter your email and password to access your account'
                                    : 'Hey! Enter your details to make an account & become member'}
                            </p>
                        </div>
                        <div className='account__form'>
                            {isLogin ? <LoginForm /> : <RegisterForm />}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Register;
