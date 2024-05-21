import FooterOffice from '../components/footer_office/footer_office';

import './../styles/subscriptions.css'

import React, { useState } from 'react';
import HeaderOffice, { ModalContext } from './../components/header_office/header_office';
import { FOOD_ROUTE, HOME_ROUTE, OFFICE_ROUTE, PERSONINFORMATION_ROUTE, PROGRESS_ROUTE, SUBSCRIPTIONS_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaDumbbell } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";

import { LiaAddressCard } from "react-icons/lia";
import { BsCalendarDateFill } from "react-icons/bs";

import { logout } from './../http/AuthServices';


import plans1 from './../img/photo/Section2.png'
import plans2 from './../img/photo/Section1.png'
import plans3 from './../img/photo/Section.png'
import plans4 from './../img/photo/Section (1).png'

const OfferCard = ({ image, duration, price, discount }) => {
    const discountedPrice = price - (price * discount / 100);
    
    return (
      <div className="offer-card">
        <img src={image} alt="Exercise" />
        <div className="info">
          <div className="duration">{duration} місяці</div>
          <div className="price">{discountedPrice}₴</div>
          <button>Продовжити</button>
        </div>
      </div>
    );
  };

const Subscriptions = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const offers = [
        { image: plans1, duration: 1, price: 640, discount: 0 },
        { image: plans2, duration: 3, price: 1920, discount: 15 },
        { image: plans3, duration: 6, price: 3840, discount: 35 },
        { image: plans4, duration: 12, price: 7680, discount: 50 },
      ];
    
    return ( 
        <>
        <HeaderOffice/>
        <div className='office'>
            <div className="container_office">
            <ModalContext.Provider value={setModalVisible}>
                <HeaderOffice />
                {modalVisible && (
                    <div className="modal" onClick={() => setModalVisible(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <div className="dark-container">
                                <button className="modal-button" onClick={() => navigate(PERSONINFORMATION_ROUTE)}>ОСОБИСТА ІНФОРМАЦІЯ</button>
                                <button className="modal-button" onClick={() => navigate(SUBSCRIPTIONS_ROUTE)}>МОЯ ПІДПИСКА</button>
                                <button className="modal-button" onClick={() => {logout(); navigate(HOME_ROUTE);}}>ВИХІД</button>
                            </div>
                        </div>
                    </div>
                )}
            </ModalContext.Provider>

            <div className="half_office">
            <div className="details-container">
                    <div className='head_title'>
                        <h1 className='h1_details_title'>Моя підписка</h1>
                    </div>
                    <div className="header_sub">
                        <div className='img_trainer_t1'>
                            <LiaAddressCard className='img_trainer_logo1' />
                            <div>Підписка на: <strong>1 місяць</strong></div>
                        </div>
                        <div className='location_t'>
                            
                        </div>
                        <div className="trainer-info">
                            <div className='icon_Trending'><BsCalendarDateFill /></div>
                            <span>Залишилось: <p className='bold_t'>5 днів</p></span>
                        </div>
                    </div>
                </div>
            <p className='t_programs'>Доступні підписки</p>
            <div className="offers-grid">
                {offers.map((offer, index) => (
                    <OfferCard key={index} {...offer} />
                ))}
            </div>
            
            </div>
                <div className="half_office">
                    
                    <div className="navigation-panel">
                        <ul className="nav-links">
                            <li>
                                <NavLink to={OFFICE_ROUTE} className='l_registration'>
                                <div className='nav_btn'>
                                    <FaDumbbell />
                                    <div className='text_btn_nav'>ПРОГРАМИ ТРЕНУВАНЬ</div>
                                </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={FOOD_ROUTE} className='l_registration'>
                                <div className='nav_btn'>
                                    <PiForkKnifeBold />
                                    <div className='text_btn_nav'>ХАРЧУВАННЯ</div>
                                </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={PROGRESS_ROUTE} className='l_registration'>
                                <div className='nav_btn'>
                                    <GiProgression />
                                    <div className='text_btn_nav'>ПРОГРЕС</div>
                                </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <FooterOffice/>
        </>
     );
}
 
export default Subscriptions;