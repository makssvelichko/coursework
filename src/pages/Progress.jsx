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

import { logout } from './../http/AuthServices';

import { LineChart, Line, XAxis, YAxis, Tooltip, Area } from 'recharts';


import { update } from "./../http/AuthServices";
import { load } from "./../http/AuthServices";

export const Card = ({ title, value, onSelect, min, max, field, calories, setCalories }) => {
    const decreaseValue = () => {
        const newValue = Math.max(min, value - 1);
        onSelect(field, newValue);
        setCalories(prevCalories => {
            const updatedCalories = prevCalories - 7700;
            localStorage.setItem('calories', updatedCalories); // Зберігаємо калорії в localStorage
            return updatedCalories;
        });
    };

    const increaseValue = () => {
        const newValue = Math.min(max, value + 1);
        onSelect(field, newValue);
        setCalories(prevCalories => {
            const updatedCalories = prevCalories + 7700;
            localStorage.setItem('calories', updatedCalories); // Зберігаємо калорії в localStorage
            return updatedCalories;
        });
    };

    return (
        <div className="card_progress">
            <div className="title_progress">{title}</div>
            <div className="value_progress">{value}</div>
            <div className="controls_progress">
                <button className='btn-plus_progress' onClick={decreaseValue}>-</button>
                <button className='btn-minus_progress' onClick={increaseValue}>+</button>
            </div>
        </div>
    );
};

export const Progress = () => {
    const [changedFields, setChangedFields] = useState({});
    const [initialFields, setInitialFields] = useState({});
    const [weightData, setWeightData] = useState([]); // масив для зберігання точок ваги і дати
    const [calories, setCalories] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const months = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleFieldChange = (field, value) => {
        setChangedFields((prev) => ({ ...prev, [field]: value }));
    };

    const updateData = async () => {
        const fieldsToUpdate = Object.keys(changedFields).reduce((acc, key) => {
            if (changedFields[key] !== undefined && changedFields[key] !== null) {
                if (initialFields[key] !== changedFields[key]) {
                    acc[key] = changedFields[key];
                }
            }
            return acc;
        }, {});

        try {
            const updatedUser = await update(fieldsToUpdate);
            console.log("Profile updated successfully", updatedUser);
            setInitialFields(updatedUser);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const updateWeightData = (newWeight) => {
        const newPoint = {
            weight: newWeight,
            date: new Date().toISOString() // Поточна дата і час
        };
        const updatedWeightData = [...weightData, newPoint];
        setWeightData(updatedWeightData);
        localStorage.setItem('weightData', JSON.stringify(updatedWeightData)); // Збереження в localStorage
    };

    const handleWeightUpdate = () => {
        const newWeight = changedFields.weight; // Нове значення ваги з changedFields
        updateWeightData(newWeight);
        updateData(); // Оновлення інших даних (як ви робите вже)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await load();
                setInitialFields(data);
                setChangedFields(data);
                const storedCalories = localStorage.getItem('calories');
                setCalories(storedCalories !== null ? parseInt(storedCalories, 10) : (data.calories || 0));
                
                const storedWeightData = localStorage.getItem('weightData');
                if (storedWeightData) {
                    setWeightData(JSON.parse(storedWeightData));
                } else {
                    setWeightData([ // Додаємо початкову точку з поточними значеннями
                        {
                            weight: data.weight,
                            date: new Date().toISOString()
                        }
                    ]);
                }
            } catch (error) {
                console.error("Error loading profile data:", error);
            }
        };

        fetchData();

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

    const transformedData = weightData.map(item => {
        const date = item.date ? new Date(item.date) : null;
        const month = date ? months[date.getMonth()] : null;
        return { ...item, date: month };
    });
    
    return (
        <>
        <HeaderOffice />
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
                                <button className="modal-button" onClick={() => { logout(); navigate(HOME_ROUTE); }}>ВИХІД</button>
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
                        <Card title="Вага" value={changedFields.weight} onSelect={handleFieldChange} min={1} max={500} field="weight" calories={calories} setCalories={setCalories} />
                        <button className='btn_up_progress' onClick={handleWeightUpdate}>ОНОВИТИ</button>
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
        <FooterOffice />
        </>
    );
}

export default Progress;