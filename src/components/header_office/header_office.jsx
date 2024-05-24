import './header_office.css'
import logo from './../../img/logo/logo.png'
import { NavLink } from 'react-router-dom';
import AnchorLink from '../AnchorLink';
import React, { useState, createContext, useContext } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { OFFICE_ROUTE } from '../../utils/consts';

import { useUser } from './../UserContext'; // Імпортуйте хук для доступу до контексту

import { UserProvider } from './../../components/UserContext';

export const ModalContext = createContext();

function HeaderOffice() {

    const { user } = useUser();
    const username = user ? user.username : '';

    // const [image, setImage] = useState('');
    const [image] = useState('');
    const setModalVisible = useContext(ModalContext);

    // const handleImageChange = (e) => {
    //     setImage(URL.createObjectURL(e.target.files[0]));
    // }

    return (
        <UserProvider>
        <header className='header_office'>
            <div className="container">
                <div className="header_row">
                    <div className="header_logo">
                        <NavLink to={OFFICE_ROUTE}><img src={logo} alt="LOGO" /></NavLink>
                    </div>
                    <nav className="header_nav_office">
                        <ul>
                            <li><AnchorLink id="#!">
                                <div className='header_user_name'>{username || 'Користувач'}</div>
                                </AnchorLink>
                            </li>
                            <li><AnchorLink id="#!">
                                <div className='header_user'>
                                    <div className="profile-container2" onClick={() => setModalVisible(true)}>
                                        {image ? (
                                            <img className="profile-image2" src={image} alt="Profile" />
                                            ) : (
                                            <FaRegUserCircle className="profile-image2" />
                                        )}
                                    </div>
                                </div>
                                </AnchorLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        </UserProvider>
    );
}

export default HeaderOffice;