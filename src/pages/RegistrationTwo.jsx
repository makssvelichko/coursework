import FooterLogin from '../components/footer_login/footer_login';
import HeaderLogin from '../components/header_login/header_login';
import { NavLink } from 'react-router-dom';

import { IoManOutline } from "react-icons/io5";
import { IoWomanOutline } from "react-icons/io5";

import React, { useState } from 'react';

import './../styles/registrationtwo.css'
import { OFFICE_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { GiWeightScale } from "react-icons/gi";
import { GiMuscularTorso } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";

const Card = ({ title, initialValue }) => {
    const [value, setValue] = useState(initialValue);
  
    return (
      <div className="card">
        <div className="title">{title}</div>
        <div className="value">{value}</div>
        <div className="controls">
          <button className='btn-plus' onClick={() => setValue(value - 1)}>-</button>
          <button className='btn-minus' onClick={() => setValue(value + 1)}>+</button>
        </div>
      </div>
    );
};

const Card2 = ({ text, selected, onSelect, icon }) => (
    <div className={`card2 ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="card-icon">{icon}</div>
      <h3>{text}</h3>
      {selected && <div className="checkmark"><IoIosCheckmarkCircleOutline /></div>}
    </div>
  );

const RegistrationTwo = () => {

    const [isChecked, setIsChecked] = useState(false);

    const [active, setActive] = useState('man');

    const [selectedCard, setSelectedCard] = useState(null);
    const cards = [
        { text: 'Спалити жир', icon: <GiWeightScale /> },
        { text: 'Набір м\'язів', icon: <GiMuscularTorso /> },
        { text: 'Підтримка форми', icon: <GiRunningShoe /> },
      ];
    return ( 
        <>
        <HeaderLogin/>
        <div className='registrationtwo'>
            <div className="container_registrationtwo">
                <div className="half">
                <div className='divstep2'>
                <div className="step2">
                    <div className='step_text12'>Створити акаунт</div>
                    <div className="circle12">1</div>
                </div>

                <div className="step2">
                    <div className='step_text22'>Особисті дані</div>
                    <div className="circle22">2</div>
                </div>
                </div>
                </div>
                <div className="half">
                    <p className='plog1'>Особисті дані</p>

                    <div className="switch">
                        <div className={`option ${active === 'man' ? 'active' : ''}`} onClick={() => setActive('man')}>
                            <div className="icon"><IoManOutline /></div>
                            <div className='t_switch'>Чоловік</div>
                        </div>
                        <div className={`option ${active === 'woman' ? 'active' : ''}`} onClick={() => setActive('woman')}>
                             <div className="icon"><IoWomanOutline /></div>
                            <div className='t_switch'>Жінка</div>
                        </div>
                    </div>

                    <div className='card-container'>
                        <Card title="Biк" initialValue={24} />
                        <Card title="Baгa" initialValue={82} />
                        <Card title="Зріст" initialValue={178} />
                    </div>


                    <div>
                        <p className='plog2'>Яка ваша мета:</p>
                    </div>

                    
                    <div className="card-container2">
                        {cards.map((card, index) => (
                            <Card2
                              key={index}
                              text={card.text}
                              icon={card.icon}
                              selected={selectedCard === index}
                              onSelect={() => setSelectedCard(index)}
                            />
                        ))}
                    </div>

                    <div>
                    <form className='checkbox'>
                    <input 
                        type="checkbox" 
                        id="remember-me" 
                        name="remember-me" 
                        className='check_box' 
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="remember-me" className='remember-me'>
                        Я прочитав(ла) Правила користування та даю згоду на обробку особистих даних
                    </label>
                    </form>
                        <div className='btns_log'>
                            <NavLink to={OFFICE_ROUTE} className={isChecked ? 'active' : 'disabled'}>
                               <div className='next'>
                                   <p className='t_enter'>РЕЄСТРАЦІЯ</p>
                                </div>
                            </NavLink>
                            <NavLink to={REGISTRATION_ROUTE} className='l_registration'>
                                <div className='back'>
                                    <p className='t_registration'>ПОВЕРНУТИСЯ</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterLogin/>
        </>
     );
}
 
export default RegistrationTwo;