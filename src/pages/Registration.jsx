import FooterLogin from '../components/footer_login/footer_login';
import HeaderLogin from '../components/header_login/header_login';
import logo_google from './../img/logo/google.png';
import defimage from './../img/photo/def.jpg';
import { NavLink } from 'react-router-dom';
import { MdPhotoCamera } from "react-icons/md";

import React, { useState } from 'react';

import AnchorLink from '../components/AnchorLink';
import './../styles/registration.css'

const Registration = () => {
    const [image, setImage] = useState('');

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    return ( 
        <>
        <HeaderLogin/>
        <div className='login'>
        <body>
            <div className="container_login">
                <div className="half">
                <div className='divstep'>
                <div class="step">
                    <div className='step_text1'>Створити акаунт</div>
                    <div class="circle1">1</div>
                </div>

                <div class="step">
                    <div className='step_text2'>Особисті дані</div>
                    <div class="circle2">2</div>
                </div>
                </div>
                </div>
                <div className="half">
                    <p className='plog1'>Створити свій обліковий запис</p>
                    <form className='forms'>
                        <div className="input-container">
                            <input type="email" id="email2" name="email" placeholder="E-mail"/>
                        </div>
                        <div className="input-container">
                            <input type="password" id="password2" name="password" placeholder="Пароль"/>
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
                    <div className="input-container">
                        <input type="name" id="name" name="name" placeholder="Name"/>
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
                            <NavLink to='/registrationtwo'>
                               <div className='next2'>
                                   <p className='t_enter'>ПРОДОВЖИТИ</p>
                                </div>
                            </NavLink>
                            <NavLink to='/login' className='l_registration'>
                                <div className='back'>
                                    <p className='t_registration'>ВІДМІНА</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </div>
        <FooterLogin/>
        </>
     );
}
 
export default Registration;