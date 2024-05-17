import FooterOffice from '../components/footer_office/footer_office';

import './../styles/progress.css'

import React, { useState, useEffect } from 'react';
import HeaderOffice, { ModalContext } from './../components/header_office/header_office';
import { FOOD_ROUTE, HOME_ROUTE, OFFICE_ROUTE, PERSONINFORMATION_ROUTE, PROGRESS_ROUTE, SUBSCRIPTIONS_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaDumbbell } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";

import { FaFire } from "react-icons/fa";

import { LineChart, Line, XAxis, YAxis, Tooltip, Area } from 'recharts';

const Card = ({ title, weight, setWeight, calories, setCalories }) => {
    const handleMinus = () => {
        setWeight(weight - 1);
        setCalories(calories - 7700);
    };

    const handlePlus = () => {
        setWeight(weight + 1);
        setCalories(calories + 7700);
    };

    return (
      <div className="card_progress">
        <div className="title_progress">{title}</div>
        <div className="value_progress">{weight}</div>
        <div className="controls_progress">
          <button className='btn-plus_progress' onClick={handleMinus}>-</button>
          <button className='btn-minus_progress' onClick={handlePlus}>+</button>
        </div>
      </div>
    );
};

const Progress = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState([
        {date: new Date().toLocaleDateString(), weight: 74, calories: 0},
    ]);

    const [weight, setWeight] = useState(data[data.length - 1].weight);
    const [calories, setCalories] = useState(data[data.length - 1].calories);

    const updateData = () => {
        setData(prevData => [...prevData, {date: new Date().toLocaleDateString(), weight: weight, calories: calories}]);
    };

    const months = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];


    const transformedData = data.map(item => {
    const date = new Date(item.date.split('.').reverse().join('-'));
    const month = months[date.getMonth()];
    return { ...item, date: month };
    });


    console.log(`Вага: ${data[data.length - 1].weight} кг`);
    console.log(`Дата: ${data[data.length - 1].date}`);
    console.log(`Калорії: ${data[data.length - 1].calories} cal`);

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return ( 
        <>
        <HeaderOffice/>
        <div className='progress'>
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

            <div className="half_progress">
                <p className='t_programs'>Прогрес</p>

                <div className='graph'>
                    
                    <div>
                        <h2 className='h2_progress'>Графік втрати ваги</h2>
                        <div className='graph_area'>
                        <LineChart
                            width={dimensions.width * 0.42}
                            height={dimensions.height * 0.5}
                            data={transformedData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="weight" stroke="#FF0000" strokeWidth={3} activeDot={{ r: 8 }} />
                            <Area type="monotone" dataKey="weight" stroke="#FF0000" fill="#82ca9d" />
                        </LineChart>
                        </div>
                        <div className='p_progress'>Всього згоріло: <p className='val_calories'>{calories}</p> ккал <p className='FaFire'><FaFire /></p></div>
                    </div>
                    <div>
                        <Card title="Вага" weight={weight} setWeight={setWeight} calories={calories} setCalories={setCalories} />
                        <button className='btn_up_progress' onClick={updateData}>ОНОВИТИ</button>
                    </div>
                    
                </div>
            
            
                
                
            
            </div>
                <div className="half_progress">
                    
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
 
export default Progress;