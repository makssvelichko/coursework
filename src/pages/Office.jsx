
import FooterOffice from '../components/footer_office/footer_office';

import './../styles/office.css'

import React, { useState } from 'react';
import HeaderOffice, { ModalContext } from './../components/header_office/header_office';
import { FOOD_ROUTE, HOME_ROUTE, OFFICE_ROUTE, PERSONINFORMATION_ROUTE, PROGRESS_ROUTE, SUBSCRIPTIONS_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaDumbbell } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";

import j1 from './../img/photo/jm1.jpeg'
import j2 from './../img/photo/jm3.jpg'
import j3 from './../img/photo/jm2.jpg'
import c1 from './../img/photo/c0.jpg'
import c2 from './../img/photo/c1.jpg'
import c3 from './../img/photo/c2.jpg'
import h1 from './../img/photo/h1.jpg'
import h2 from './../img/photo/h2.jpg'
import h3 from './../img/photo/h3.1.jpeg'



import Card from './../components/Card';

const Office = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

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
                                <button className="modal-button" onClick={() => navigate(HOME_ROUTE)}>ВИХІД</button>
                            </div>
                        </div>
                    </div>
                )}
            </ModalContext.Provider>

            <div className="half_office">
                <p className='t_programs'>Усі програми</p>
                <p className='t_name_cards'>Для залу</p>
                <div className="cards_programs1">
                    <Card
                    id="beginner-office"
                    title="Beginner"
                    image={j1}
                    sessions={6}
                    duration="25-30 хв"
                    intensity="Низька"
                    />

                    <Card
                    id="intermediate-office"
                    title="Intermediate"
                    image={j2}
                    sessions={8}
                    duration="25-35 хв"
                    intensity="Середня"
                    />

                    <Card
                    id="advanced-office"
                    title="Advanced"
                    image={j3}
                    sessions={12}
                    duration="35-45 хв"
                    intensity="Висока"
                    />
                
                </div>
                <p className='t_name_cards'>Для майданчика</p>

                <div className="cards_programs2">
                    <Card
                    id="beginner-court"
                    title="Beginner"
                    image={c1}
                    sessions={6}
                    duration="25-30 хв"
                    intensity="Низька"
                    />

                    <Card
                    id="intermediate-court"
                    title="Intermediate"
                    image={c2}
                    sessions={8}
                    duration="25-35 хв"
                    intensity="Середня"
                    />

                    <Card
                    id="advanced-court"
                    title="Advanced"
                    image={c3}
                    sessions={12}
                    duration="35-45 хв"
                    intensity="Висока"
                    />
                
                </div>
                <p className='t_name_cards'>Вдома</p>
                <div className="cards_programs3">
                    <Card
                    id="beginner-home"
                    title="Beginner"
                    image={h1}
                    sessions={6}
                    duration="25-30 хв"
                    intensity="Низька"
                    />

                    <Card
                    id="intermediate-home"
                    title="Intermediate"
                    image={h2}
                    sessions={8}
                    duration="25-35 хв"
                    intensity="Середня"
                    />

                    <Card
                    id="advanced-home"
                    title="Advanced"
                    image={h3}
                    sessions={12}
                    duration="35-45 хв"
                    intensity="Висока"
                    />
                
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
 
export default Office;