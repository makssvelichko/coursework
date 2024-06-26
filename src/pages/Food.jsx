
import FooterOffice from '../components/footer_office/footer_office';

import './../styles/food.css'

import React, { useState, useEffect } from 'react';
import HeaderOffice, { ModalContext } from '../components/header_office/header_office';
import { FOOD_ROUTE, HOME_ROUTE, OFFICE_ROUTE, PERSONINFORMATION_ROUTE, PROGRESS_ROUTE, SUBSCRIPTIONS_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaDumbbell } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";

import { logout } from './../http/AuthServices';

import s1 from './../img/photo/s1.jpg'
import s2 from './../img/photo/s2.jpg'
import s3 from './../img/photo/s3.jpg'
import s4 from './../img/photo/s4.jpg'
import s5 from './../img/photo/s5.png'
import s6 from './../img/photo/s6.jpg'
import s7 from './../img/photo/s7.jpg'
import s8 from './../img/photo/s8.jpg'

import o0 from './../img/photo/o0.jpg'
import o1 from './../img/photo/o1.jpg'
import o2 from './../img/photo/o2.jpg'
import o3 from './../img/photo/o3.jpg'
import o4 from './../img/photo/o4.jpg'
import o5 from './../img/photo/o5.jpg'
import o6 from './../img/photo/o6.jpg'
import o7 from './../img/photo/o7.jpg'

import v1 from './../img/photo/v1.jpg'
import v2 from './../img/photo/v2.jpg'
import v3 from './../img/photo/v3.jpeg'
import v4 from './../img/photo/v4.jpg'
import v5 from './../img/photo/v5.jpg'
import v6 from './../img/photo/v6.jpeg'
import v7 from './../img/photo/v7.jpg'
import v8 from './../img/photo/v8.jpg'


import CardFood from '../components/FoodCard';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

import './../styles/cardfood.css'

import { load } from "./../http/AuthServices";

export const Food = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const [total, setTotal] = useState({calories: 0, proteins: 0, fats: 0, carbs: 0});

    const addToMenu = (values) => {
      setTotal(prevTotal => ({
        calories: prevTotal.calories + values.calories,
        proteins: prevTotal.proteins + values.proteins,
        fats: prevTotal.fats + values.fats,
        carbs: prevTotal.carbs + values.carbs
      }));
    };
  
    const removeFromMenu = (values) => {
      setTotal(prevTotal => ({
        calories: prevTotal.calories - values.calories,
        proteins: prevTotal.proteins - values.proteins,
        fats: prevTotal.fats - values.fats,
        carbs: prevTotal.carbs - values.carbs
      }));
    };

    const [centerSlidePercentage, setCenterSlidePercentage] = useState(31);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            // Змінюйте значення відсотків відповідно до вашого дизайну
            if (width < 650) {
                setCenterSlidePercentage(74);
            }else if (width < 850) {
                setCenterSlidePercentage(48);
            } else if (width < 1350) {
                setCenterSlidePercentage(40);
            }
            else {
                setCenterSlidePercentage(31);
            }
        };

        window.addEventListener('resize', handleResize);

        // Викликайте функцію при завантаженні сторінки
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    
    const [/**userHeight**/, setUserHeight] = useState("");
    const [/**userWeight**/, setUserWeight] = useState("");
    const [/**userAge**/, setUserAge] = useState("");
    const [/**userSex**/, setUserSex] = useState("");

    const [lowActivityCalories, setLowActivityCalories] = useState(0);
    const [moderateActivityCalories, setModerateActivityCalories] = useState(0);
    const [highActivityCalories, setHighActivityCalories] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const userData = await load();
            if (userData) {
            setUserHeight(userData.height);
            setUserWeight(userData.weight);
            setUserAge(userData.age);
            setUserSex(userData.sex);
            console.log(userData.sex)
            // Розрахунок BMR за формулою Міффліна - Сан Жеора
            let BMR;
            if (userData.sex === "man") {
                BMR = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
            } else if (userData.sex === "woman") {
                BMR = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
            }
    
            // Розрахунок споживання калорій для різних рівнів активності
            setLowActivityCalories((BMR * 1.2).toFixed(1));
            setModerateActivityCalories((BMR * 1.55).toFixed(1));
            setHighActivityCalories((BMR * 1.9).toFixed(1));
            }
        } catch (error) {
            console.error("Помилка завантаження даних користувача: ", error);
        }
        };
    
        fetchData();
    }, []);


    return ( 
        <>
        <HeaderOffice/>
        <div className='food'>
            <div className="container_food">
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
                <p className='t_food'>Харчування</p>
                <p className='t_name_cards'>Сніданок</p>
                
                <Carousel className='my_carousel_food'
                showThumbs={false}
                showArrows={true} 
                showStatus={false} 
                showIndicators={false} 
                centerMode 
                centerSlidePercentage={centerSlidePercentage}
                // centerSlidePercentage={31}
                infiniteLoop={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) => 
                    hasPrev && (
                        <button className='btn_next_prev' type="button" onClick={onClickHandler} title={label}>
                            <GrPrevious />
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) => 
                    hasNext && (
                        <button className='btn_next_prev' type="button" onClick={onClickHandler} title={label}>
                            <GrNext />
                        </button>
                    )
                }>
                    <div>
                        <CardFood
                        name="Каша Геркулес 150г + яйце +150г овочів"
                        image={s1}
                        calories={382}
                        proteins={24}
                        fats={17}
                        carbs={22}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Омлет з 2 яєць + 2 хлібці + 150г овочів"
                        image={s2}
                        calories={308}
                        proteins={17}
                        fats={17}
                        carbs={20}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Каша пшоняна 100г + 1 яйце + 150г овочів"
                        image={s3}
                        calories={234}
                        proteins={11}
                        fats={9}
                        carbs={26}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Каша гречана 150г + 1 яйце + 150г овочів"
                        image={s4}
                        calories={254}
                        proteins={11}
                        fats={8}
                        carbs={29}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Смузі з 1 банану, ківі, апельсин + 100мл йогурту"
                        image={s5}
                        calories={276}
                        proteins={9}
                        fats={2}
                        carbs={57}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Перлова каша 150г + 150г фруктів та ягід + 20г горіхів"
                        image={s6}
                        calories={225}
                        proteins={9}
                        fats={2}
                        carbs={32}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Сир Фета 100г +2 хлібці + овочі 150г"
                        image={s7}
                        calories={382}
                        proteins={17}
                        fats={24}
                        carbs={22}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="2 хлібці + 2 яйця + 150г овочів"
                        image={s8}
                        calories={225}
                        proteins={5}
                        fats={17}
                        carbs={23}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                </Carousel>
                <p className='t_name_cards'>Обід</p>

                <Carousel className='my_carousel_food'
                showThumbs={false}
                showArrows={true} 
                showStatus={false} 
                showIndicators={false} 
                centerMode 
                centerSlidePercentage={centerSlidePercentage}
                infiniteLoop={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) => 
                    hasPrev && (
                        <button className='btn_next_prev' type="button" onClick={onClickHandler} title={label}>
                            <GrPrevious />
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) => 
                    hasNext && (
                        <button className='btn_next_prev' type="button" onClick={onClickHandler} title={label}>
                            <GrNext />
                        </button>
                    )
                }>
                    <div>
                        <CardFood
                        name="Курка в духовці 150г з овочами 200г"
                        image={o0}
                        calories={458}
                        proteins={30}
                        fats={7}
                        carbs={8}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Рис нешліфований 150г з тушкованими овочами"
                        image={o1}
                        calories={593}
                        proteins={10}
                        fats={7}
                        carbs={78}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Спагетті 150г з помідорами та оливковим маслом"
                        image={o2}
                        calories={586}
                        proteins={17}
                        fats={6}
                        carbs={77}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Каша гречана 150г з грибами та салатом з овочів 200г"
                        image={o3}
                        calories={461}
                        proteins={18}
                        fats={9}
                        carbs={75}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Риба щука 200г з салатом з овочів 200г"
                        image={o4}
                        calories={396}
                        proteins={42}
                        fats={8}
                        carbs={12}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Індичка тушкована 150г з овочами 200г"
                        image={o5}
                        calories={535}
                        proteins={30}
                        fats={13}
                        carbs={17}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Курячий шашлик 150г з овочами 200г"
                        image={o6}
                        calories={473}
                        proteins={23}
                        fats={11}
                        carbs={8}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Картопля 200г тушкована з овочами 200г"
                        image={o7}
                        calories={513}
                        proteins={16}
                        fats={15}
                        carbs={38}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                </Carousel>

                <p className='t_name_cards'>Вечеря</p>
                
                <Carousel className='my_carousel_food'
                showThumbs={false}
                showArrows={true} 
                showStatus={false} 
                showIndicators={false} 
                centerMode 
                centerSlidePercentage={centerSlidePercentage}
                infiniteLoop={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) => 
                    hasPrev && (
                        <button className='btn_next_prev' type="button" onClick={onClickHandler} title={label}>
                            <GrPrevious />
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) => 
                    hasNext && (
                        <button className='btn_next_prev' type="button" onClick={onClickHandler} title={label}>
                            <GrNext />
                        </button>
                    )
                }>
                    <div>
                        <CardFood
                        name="Риба хек 200г з запеченими овочами 200г"
                        image={v1}
                        calories={380}
                        proteins={42}
                        fats={7}
                        carbs={24}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Окунь 200г у духовці із запеченими овочами 200г"
                        image={v2}
                        calories={376}
                        proteins={38}
                        fats={10}
                        carbs={10}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Мікс морепродуктів 200г з овочами гриль 200г"
                        image={v3}
                        calories={290}
                        proteins={19}
                        fats={14}
                        carbs={26}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Рибні котлети 200г з запеченими овочами 200г"
                        image={v4}
                        calories={416}
                        proteins={36}
                        fats={17}
                        carbs={24}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Суп з лососем 150г з овочами 200г"
                        image={v5}
                        calories={271}
                        proteins={12}
                        fats={9}
                        carbs={6}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Лаваш з куркою 200г та овочами 200г"
                        image={v6}
                        calories={591}
                        proteins={28}
                        fats={20}
                        carbs={35}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Каша гречана 170г з тушкованими овочами 200г"
                        image={v7}
                        calories={382}
                        proteins={17}
                        fats={24}
                        carbs={22}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                    <div>
                        <CardFood
                        name="Булгур 170г + салат з овочів 200г"
                        image={v8}
                        calories={545}
                        proteins={19}
                        fats={7}
                        carbs={88}
                        addToMenu={addToMenu}
                        removeFromMenu={removeFromMenu}
                        />
                    </div>
                </Carousel>


                <div className='box_cardsfood_all'>
                    <div className="spacebetween_cardsfood">
                    <p>Загальні калорії:</p>
                    <p className='val_card'>{total.calories} cal</p>
                    </div>

                    <div className="spacebetween_cardsfood">
                    <p>Загальні білки:</p>
                    <p className='val_card'>{total.proteins} г</p>
                    </div>

                    <div className="spacebetween_cardsfood">
                    <p>Загальні жири:</p>
                    <p className='val_card'>{total.fats} г</p>
                    </div>

                    <div className="spacebetween_cardsfood">
                    <p>Загальні вуглеводи:</p>
                    <p className='val_card'>{total.carbs} г</p>
                    </div>
                </div>

                <div className='calculCalories'>
                    <h2 className='calculCaloriesh2'>Потрібна кількість споживання калорій для вас</h2>
                    <div className="spacebetween_cardsfood">
                    <p>Калорії для низької активності:</p>
                    <p className='val_card'>{lowActivityCalories} cal</p>
                    </div>

                    <div className="spacebetween_cardsfood">
                    <p>Калорії для помірної активності:</p>
                    <p className='val_card'>{moderateActivityCalories} cal</p>
                    </div>

                    <div className="spacebetween_cardsfood">
                    <p>Калорії для високої активності:</p>
                    <p className='val_card'>{highActivityCalories} cal</p>
                    </div>
                </div>

                <div className='calculCalories2'>
                    <h3>Формула Міффліна - Сан Жеора</h3>
                    <ul>
                        <li><strong>Для чоловіків:</strong>  BMR = 10 × вага(кг) + 6.25 × зріст(см) − 5 × вік(роки) + 5</li>
                        <li><strong>Для жінок:</strong> BMR = 10 × вага(кг) + 6.25 × зріст(см) − 5 × вік(роки) − 161</li>
                    </ul>
                    <p>Ці формули дають вам базовий обмін речовин (BMR), який відображає кількість калорій, які ви спалюєте в стані спокою. Щоб отримати загальне споживання калорій, ви маєте помножити BMR на коефіцієнт активності, який відображає ваш рівень фізичної активності.</p>
                    <h3>Коефіцієнти активності:</h3>
                    <ul>
                        <li><strong>Низька активність:</strong> BMR x 1.2</li>
                        <li><strong>Помірна активність:</strong> BMR x 1.55</li>
                        <li><strong>Висока активність:</strong> BMR x 1.9</li>
                    </ul>
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
 
export default Food;