
import { useParams } from 'react-router-dom';

import FooterOffice from '../components/footer_office/footer_office';

import './../styles/office.css'
import './../styles/detailspage.css'

import React, { useState } from 'react';
import HeaderOffice, { ModalContext } from './../components/header_office/header_office';
import { FOOD_ROUTE, HOME_ROUTE, OFFICE_ROUTE, PERSONINFORMATION_ROUTE, PROGRESS_ROUTE, SUBSCRIPTIONS_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaDumbbell } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";

import artem from './../img/photo/artem.jpg'

import { IoTrendingUpOutline } from "react-icons/io5";
import { GiMuscleUp } from "react-icons/gi";

import j1 from './../img/photo/jm1.jpeg'
import j2 from './../img/photo/jm3.jpg'
import j3 from './../img/photo/jm2.jpg'
import c1 from './../img/photo/c0.jpg'
import c2 from './../img/photo/c1.jpg'
import c3 from './../img/photo/c2.jpg'
import h1 from './../img/photo/h1.jpg'
import h2 from './../img/photo/h2.jpg'
import h3 from './../img/photo/h3.1.jpeg'

import pj1 from './../img/photo/pj1.jpeg'
import pj2 from './../img/photo/pj2.jpeg'
import pj3 from './../img/photo/pj3.jpg'
import pj4 from './../img/photo/pj4.jpg'
import pj5 from './../img/photo/pj5.jpg'
import pj6 from './../img/photo/pj6.jpeg'
import pj7 from './../img/photo/pj7.jpg'


const DetailsPage = () => {
  let { id } = useParams();
  

  const data = {
    'beginner-office': {
        title: 'BEGINNER',
        description1: ' Кардіо: 10 хвилин на біговій доріжцi',
        image1: pj1,
        description2: ' Присідання: 2 сети по 10 повторень',
        image2: pj2,
        description3: ' Вправи на грудні м`язи: 2 сети по 10 повторень',
        image3: pj3,
        description4: ' Вправи на спину: 2 сети по 10 повторень',
        image4: pj4,
        description5: ' Вправи на біцепс: 2 сети по 10 повторень',
        image5: pj5,
        description6: ' Вправи на трицепс: 2 сети по 10 повторень',
        image6: pj6,
        description7: ' Кардіо: 5 хвилин на еліптичному тренажері',
        image7: pj7,
        image: j1,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для залу',
          intensityLevel: 'Низька'
        }
        // інші деталі...
    },
    'intermediate-office': {
        title: 'INTERMEDIATE',
        description1: ' Кардіо: 15 хвилин на біговій доріжці',
        image1: pj1,
        description2: ' Присідання: 3 сети по 15 повторень',
        image2: pj2,
        description3: ' Вправи на грудні м`язи: 3 сети по 15 повторень',
        image3: pj3,
        description4: ' Вправи на спину: 3 сети по 15 повторень',
        image4: pj4,
        description5: ' Вправи на біцепс: 3 сети по 15 повторень',
        image5: pj5,
        description6: ' Вправи на трицепс: 3 сети по 15 повторень',
        image6: pj6,
        description7: ' Кардіо: 10 хвилин на еліптичному тренажері',
        image7: pj7,
        image: j2,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для залу',
          intensityLevel: 'Середня'
        }
        // інші деталі...
    },
    'advanced-office': {
        title: 'ADVANCED',
        description1: ' Кардіо: 20 хвилин на біговій доріжці',
        image1: pj1,
        description2: ' Присідання: 4 сети по 20 повторень',
        image2: pj2,
        description3: ' Вправи на грудні м`язи: 4 сети по 20 повторень',
        image3: pj3,
        description4: ' Вправи на спину: 4 сети по 20 повторень',
        image4: pj4,
        description5: ' Вправи на біцепс: 4 сети по 20 повторень',
        image5: pj5,
        description6: ' Вправи на трицепс: 4 сети по 20 повторень',
        image6: pj6,
        description7: ' Кардіо: 15 хвилин на еліптичному тренажері',
        image7: pj7,
        image: j3,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для залу',
          intensityLevel: 'Висока'
        }
        // інші деталі...
    },
    'beginner-court': {
        title: 'BEGINNER',
        description: 'Опис тренування 1',
        image: c1,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для майданчика',
          intensityLevel: 'Низька'
        }
        // інші деталі...
    },
    'intermediate-court': {
        title: 'INTERMEDIATE',
        description: 'Опис тренування 1',
        image: c2,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для майданчика',
          intensityLevel: 'Середня'
        }
        // інші деталі...
    },
    'advanced-court': {
        title: 'ADVANCED',
        description: 'Опис тренування 1',
        image: c3,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для майданчика',
          intensityLevel: 'Висока'
        }
        // інші деталі...
    },
    'beginner-home': {
        title: 'BEGINNER',
        description: 'Опис тренування 1',
        image: h1,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Вдома',
          intensityLevel: 'Низька'
        }
        // інші деталі...
    },
    'intermediate-home': {
        title: 'INTERMEDIATE',
        description: 'Опис тренування 1',
        image: h2,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Вдома',
          intensityLevel: 'Середня'
        }
        // інші деталі...
    },
    'advanced-home': {
        title: 'ADVANCED',
        description: 'Опис тренування 1',
        image: h3,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Вдома',
          intensityLevel: 'Висока'
        }
        // інші деталі...
    },

  };
  
  const details = data[id];

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
                <div className="details-container">
                    <div className='head_title'>
                        <h1 className='h1_details_title'>{details.title}</h1>
                        <GiMuscleUp alt="Логотип" className="logo"/>
                    </div>
                    <div className="header_details">
                        <div className='img_trainer_t'>
                            <img src={artem} alt={details.trainer.name} className='img_trainer_logo' />
                            <span>{details.trainer.name}</span>
                        </div>
                        <div className='location_t'>
                            <span>{details.trainer.location}</span>
                        </div>
                        <div className="trainer-info">
                            <div className='icon_Trending'><IoTrendingUpOutline/></div>
                            <span>Інтенсивність <p className='bold_t'>{details.trainer.intensityLevel}</p></span>
                        </div>
                    </div>
                    
                    <div className='content_detail'>
                        <img src={details.image} alt={details.title} className='img_detailspage'/>
                        {/* Відобразити інші деталі... */}
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description1}</div>
                        <img src={details.image1} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description2}</div>
                        <img src={details.image2} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description3}</div>
                        <img src={details.image3} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description4}</div>
                        <img src={details.image4} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description5}</div>
                        <img src={details.image5} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description6}</div>
                        <img src={details.image6} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description7}</div>
                        <img src={details.image7} alt={details.title} className='img_detail_photo'/>
                    </div>
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

};

export default DetailsPage;