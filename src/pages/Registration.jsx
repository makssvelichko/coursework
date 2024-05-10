import FooterLogin from '../components/footer_login/footer_login';
import HeaderLogin from '../components/header_login/header_login';
import logo_google from './../img/logo/google.png';
import defimage from './../img/photo/def.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdPhotoCamera } from "react-icons/md";

import React, { useState } from 'react';

import AnchorLink from '../components/AnchorLink';
import './../styles/registration.css'
import { LOGIN_ROUTE, REGISTRATIONTWO_ROUTE } from '../utils/consts';

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setEmailError(email === '');
        setPasswordError(password === '');
        setNameError(name === '');

        if(email !== '' && password !== '' && name !== '') {
            navigate(REGISTRATIONTWO_ROUTE);
        }
    }


    const [image, setImage] = useState('');

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    return ( 
        <>
        <HeaderLogin/>
        <div className='login'>
            <div className="container_login">
                <div className="half">
                <div className='divstep'>
                <div className="step">
                    <div className='step_text1'>Створити акаунт</div>
                    <div className="circle1">1</div>
                </div>

                <div className="step">
                    <div className='step_text2'>Особисті дані</div>
                    <div className="circle2">2</div>
                </div>
                </div>
                </div>
                <div className="half">
                    <p className='plog1'>Створити свій обліковий запис</p>
                    <form className='forms'>
                        <div className={"input-container " + (emailError ? 'error' : '')}>
                            <input type="email" id="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            {emailError && <p className='error-message'>Треба заповнити пусте поле</p>}
                        </div>
                        <div className={"input-container " + (passwordError ? 'error' : '')}>
                            <input type="password" id="password" name="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            {passwordError && <p className='error-message'>Треба заповнити пусте поле</p>}
                        </div>
                        <div className="profile-container">
                            <img className="profile-image" src={image || defimage} alt="Profile" />
                            <label className="profile-image-label">
                                <input type="file" onChange={handleImageChange} style={{display: 'none'}} />
                                <span className="camera-icon"><MdPhotoCamera /></span>
                            </label>
                        </div>
                    </form>
                    <p className='plog2'>Ваше ім'я</p>
                    <div className={"input-container " + (nameError ? 'error' : '')}>
                        <input type="name" id="name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        {nameError && <p className='error-message1'>Треба заповнити пусте поле</p>}
                    </div>
                    
                    <p className='plog2'>Або увійти за допомогою соціальних мереж</p>
                    <div className='btn_googl'>
                    <AnchorLink id="#!" className='google-btn'>
                      <img src={logo_google} alt="Google logo" className='google-img'/>
                      Google
                    </AnchorLink>
                    </div>

                    <div>
                        <div className='btns_log1'>
                            {/* <NavLink to={REGISTRATIONTWO_ROUTE}> */}
                                <div className='next2' onClick={handleLogin}>
                                   <p className='t_enter'>ПРОДОВЖИТИ</p>
                                </div>
                            {/* </NavLink> */}
                            <NavLink to={LOGIN_ROUTE} className='l_registration'>
                                <div className='back'>
                                    <p className='t_registration'>ВІДМІНА</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterLogin/>
        </>
     );
}
 
export default Registration;