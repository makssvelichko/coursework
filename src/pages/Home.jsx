import './../styles/promo.css'
import './../styles/start.css'
import './../styles/mainprograms.css'
import './../styles/blocktrainer.css'
import './../styles/blockplans.css'

import Header from '../components/header/header'

import first from './../img/photo/Section0.png'
import second from './../img/photo/workouts-library-36a4ef01f5bc38a1bf26ab7d6d246bc85fc7e0f4cb6b59c2eba30d24d6924e2f.jpg.png'
import pprograms1 from './../img/photo/Link1.1.png'
import pprograms2 from './../img/photo/Link1.2.png'
import pprograms3 from './../img/photo/Link1.3.png'
import trainer_inst from './../img/logo/Rectangle 41.png'
import trainer_telega from './../img/logo/Rectangle 40.png'
import trainer_youtube from './../img/logo/Rectangle 42.png'
import p_trainer from './../img/photo/Rectangle 32.png'
import plans1 from './../img/photo/Section2.png'
import plans2 from './../img/photo/Section1.png'
import plans3 from './../img/photo/Section.png'
import plans4 from './../img/photo/Section (1).png'

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../components/footer/footer'

import AnchorLink from '../components/AnchorLink';


const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};


const Home = () => {
    return (
        <>
        <Header/>
        <section id='header' className="promo">
        <div className="conteiner">
            <div className="content">
                <div className="img">
                    <img src={first} alt="first" />
                    <div className="text">
                        <p className='toptext'>Почни зміни вже зараз</p>
                        <p className='bottomtext'>Побудуй форму своєї мрії</p>
                    </div>
                </div>
            </div>
        </div>
        </section>

        <section className="start">
        <div className="conteiner">
            <div className='start_line'>
            <div className='start_photo'>
                <img src={second} alt="second" />
            </div>
            <div className='textblock'>
                <ul>
                    <li className='li_one'>Різні рівні підготовки</li>
                    <li className='li_two'>Тренування будь-де та відео уроки для тебе</li>
                    <li className='li_p'>.</li>
                    <li className='btn_start'><AnchorLink id="#!" className='btn_a'>Почати</AnchorLink></li>
                </ul>
            </div>
            </div>
        </div>
        </section>

        <section id = 'programs' className="mainprograms">
        <div className="conteinerprograms">
            <div className="contentprograms">
                <div className='text_programs'>
                    Програми
                </div>
                <div className='programs_card'>
                    <ul>
                        <li>
                            <AnchorLink id="#!">
                                <div className='image-text-wrapper'>
                                    <img className='programs_card1' src={pprograms1} alt="card1" />
                                    <div className='image-text'>
                                        <p className='image-text1'>Beginner</p>
                                        <div>
                                            <p className='image-text2'>Beginner program</p>
                                            <p className='image-text3'>4568 likes - 56 comments</p>
                                        </div>
                                    </div>
                                </div>
                            </AnchorLink>
                        </li>
                        <li><AnchorLink id="#!">
                        <div className='image-text-wrapper'>
                                    <img className='programs_card1' src={pprograms2} alt="card2" />
                                    <div className='image-text'>
                                        <p className='image-text1'>Intermediate</p>
                                        <div>
                                            <p className='image-text2'>Intermediate program</p>
                                            <p className='image-text3'>6901 likes - 123 comments</p>
                                        </div>
                                    </div>
                                </div>
                            </AnchorLink>
                        </li>
                        <li><AnchorLink id="#!">
                        <div className='image-text-wrapper'>
                                    <img className='programs_card1' src={pprograms3} alt="card3" />
                                    <div className='image-text'>
                                        <p className='image-text1'>Advanced</p>
                                        <div>
                                            <p className='image-text2'>Advanced program</p>
                                            <p className='image-text3'>3863 likes - 52 comments</p>
                                        </div>
                                    </div>
                                </div>
                            </AnchorLink>
                        </li>
                    </ul>
                </div>
                <div className='programs_btn'>
                    <AnchorLink id="#!">Всі програми</AnchorLink>
                </div>
            </div>
        </div>
        </section>

        <section id='trainer' className="blocktrainer">
        <div className="conteiner">
            <div className='block_trainer'>
                <ul className='ul1'>
                    <li>
                        <div className='list_trainer'>
                            <p className='artem'>Кругляк Артем, 18</p>
                            <ul>
                                <li>● Досвід у спорті 6+ років</li>
                                <li>● Сертифікований тренер FitLab, Coursera</li>
                                <li>● Сертифікований інструктор тренажерної зали</li>
                                <li>● 100+ годин навчання</li>
                                <li>● Працює тренером в @energy.ostroh</li>
                                <li>● Мотивує та вчить розумінню дисципліни та спорту</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className='middle_trainer'>
                            <p className='bold_text_trainer'>Тренер</p>
                            <div>
                                <p className='middle_trainer_text'>Дізнатися більше можна тут</p>
                                <ul className='social_network'>
                                    <li>
                                        <a href="https://www.instagram.com/t.kruhliak?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                                            <img className='inst' src={trainer_inst} alt="inst" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/kaisteam" target="_blank" rel="noopener noreferrer">
                                            <img className='telega' src={trainer_telega} alt="telega" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/@KA1WAY" target="_blank" rel="noopener noreferrer">
                                            <img className='youtube' src={trainer_youtube} alt="youtube" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='photo_trainer_block'>
                            <img className='photo_trainer' src={p_trainer} alt="trainer" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </section>
        

        <section>
        <div id='plans' className='conteiner_blockplans'>
        <div>
            <p className='text_plans'>Плани підписки для тебе</p>
        <div className='carusel'>
            <Carousel className='my-carousel' responsive={responsive} arrows infinite={true}>
                <div className='image-text-wrapper-plans'>
                    <img className='photo_plans1' src={plans1} alt="Plan 1" />
                        <div className='image-text-plans'>
                            <p className='image-text-plans1'>1 МІСЯЦЬ</p>
                            <p className='image-text-plans2'>640 <mark className='grn'>грн</mark></p>
                            <p className='image-text-plans3'><AnchorLink className='start_plan' id="#!">Почати</AnchorLink></p>
                        </div>
                </div>
                <div className='image-text-wrapper-plans'>
                    <img className='photo_plans2' src={plans2} alt="Plan 2" />
                        <div className='image-text-plans'>
                            <p className='image-text-plans1'>3 МІСЯЦІВ</p>
                            <p className='image-text-plans2'>1632 <mark className='grn'>грн</mark></p>
                            <p className='image-text-plans3'><AnchorLink className='start_plan' id="#!">Почати</AnchorLink></p>
                        </div>
                </div>
                <div className='image-text-wrapper-plans'>
                    <img className='photo_plans3' src={plans3} alt="Plan 3" />
                        <div className='image-text-plans'>
                            <p className='image-text-plans1'>6 МІСЯЦІВ</p>
                            <p className='image-text-plans2'>2496 <mark className='grn'>грн</mark></p>
                            <p className='image-text-plans3'><AnchorLink className='start_plan' id="#!">Почати</AnchorLink></p>
                        </div>
                </div>
                <div className='image-text-wrapper-plans'>
                    <img className='photo_plans4' src={plans4} alt="Plan 4" />
                        <div className='image-text-plans'>
                            <p className='image-text-plans1'>12 МІСЯЦІВ</p>
                            <p className='image-text-plans2'>3840 <mark className='grn'>грн</mark></p>
                            <p className='image-text-plans3'><AnchorLink className='start_plan' id="#!">Почати</AnchorLink></p>
                        </div>
                </div>
            </Carousel>
        </div>
        </div>
        </div>
        </section>

        <Footer/>
        </>
    );
}
 
export default Home;