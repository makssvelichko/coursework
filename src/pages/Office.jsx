
import FooterOffice from '../components/footer_office/footer_office';

import './../styles/office.css'

import React, { useState } from 'react';
import HeaderOffice, { ModalContext } from './../components/header_office/header_office';
import { HOME_ROUTE, OFFICE_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaDumbbell } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";

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
                                <button className="modal-button" onClick={() => {}}>ОСОБИСТА ІНФОРМАЦІЯ</button>
                                <button className="modal-button" onClick={() => {}}>МОЯ ПІДПИСКА</button>
                                <button className="modal-button" onClick={() => navigate(HOME_ROUTE)}>ВИХІД</button>
                            </div>
                        </div>
                    </div>
                )}
            </ModalContext.Provider>

            <div className="half_office">
                <p className='t_programs'>Усі програми</p>

                <div className="cards_programs1">
                    <Card
                    title="ГНУЧКА СПИНА"
                    image="/path/to/image.jpg"
                    sessions={6}
                    duration="25-30 хв"
                    intensity="Низька"
                    reviews={5}
                    />

                    <Card
                    title="TURBO DUMBBELLS"
                    image="/path/to/image.jpg"
                    sessions={6}
                    duration="25-30 хв"
                    intensity="Низька"
                    reviews={5}
                    />

                    <Card
                    title="NEW GENERATION"
                    image="/path/to/image.jpg"
                    sessions={6}
                    duration="25-30 хв"
                    intensity="Низька"
                    reviews={5}
                    />
                
                </div>

                <div className="cards_programs2">
                    <Card
                    title="ЗДОРОВА ГНУЧКІСТЬ"
                    image="/path/to/image.jpg"
                    sessions={6}
                    duration="25-30 хв"
                    intensity="Низька"
                    reviews={5}
                    />

                    <Card
                    title="ПРУЖНІ СІДНИЦІ"
                    image="/path/to/image.jpg"
                    sessions={6}
                    duration="25-30 хв"
                    intensity="Низька"
                    reviews={5}
                    />

                    <Card
                    title="TABATA ENERGY"
                    image="/path/to/image.jpg"
                    sessions={6}
                    duration="25-30 хв"
                    intensity="Низька"
                    reviews={5}
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
                                <NavLink to={OFFICE_ROUTE} className='l_registration'>
                                <div className='nav_btn'>
                                    <PiForkKnifeBold />
                                    <div className='text_btn_nav'>ХАРЧУВАННЯ</div>
                                </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={OFFICE_ROUTE} className='l_registration'>
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