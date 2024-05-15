import FooterOffice from '../components/footer_office/footer_office';

import './../styles/personalinformation.css'

import React, { useState } from 'react';
import HeaderOffice, { ModalContext } from './../components/header_office/header_office';
import { FOOD_ROUTE, HOME_ROUTE, OFFICE_ROUTE, PERSONINFORMATION_ROUTE, PROGRESS_ROUTE, SUBSCRIPTIONS_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaDumbbell } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";

import defimage from "./../img/photo/def.jpg";
import { MdPhotoCamera } from "react-icons/md";
import { IoManOutline } from "react-icons/io5";
import { IoWomanOutline } from "react-icons/io5";


const Card = ({ title, initialValue, onSelect, min, max }) => {
    const [value, setValue] = useState(initialValue);
  
    const decreaseValue = () => {
      const newValue = Math.max(min, value - 1);
      setValue(newValue);
      onSelect(newValue);
    };
  
    const increaseValue = () => {
      const newValue = Math.min(max, value + 1);
      setValue(newValue);
      onSelect(newValue);
    };
  
    return (
      <div className="card_personal">
        <div className="title_personal">{title}</div>
        <div className="value_personal">{value}</div>
        <div className="controls_personal">
          <button className="btn-plus_personal" onClick={decreaseValue}>
            -
          </button>
          <button className="btn-minus_personal" onClick={increaseValue}>
            +
          </button>
        </div>
      </div>
    );
  };


const PersonInformation = () => {

    const [username, setUserName] = useState("");
    const [/*sex*/ , setSex] = useState("men");
    const [age, setAge] = useState(24);
    const [weight, setWeight] = useState(82);
    const [height, setHeight] = useState(178);

    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const [profilePhoto, setProfilePhoto] = useState("");

    const handleProfilePhotoChange = (e) => {
        setProfilePhoto(URL.createObjectURL(e.target.files[0]));
    };

    const [active, setActive] = useState("man");

    const updateData = () => {

        const profileData = {
            username: username,
            sex: active,
            age: age,
            weight: weight,
            height: height,
            profilePhoto: profilePhoto
        };
    
       
    
        console.log(profileData);
    };

    

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
                <p className='t_programs'>Особиста інформація</p>
                <div className='conteiner-name-photo'>
                    
                    <div className="profile-container-p">
                    <img
                        className="profile-photo-p"
                        src={profilePhoto || defimage}
                        alt="ProfilePhoto"
                    />
                    <label className="profile-image-label-p">
                        <input
                        type="file"
                        onChange={handleProfilePhotoChange}
                        style={{ display: "none" }}
                        />
                        <span className="camera-icon-p">
                        <MdPhotoCamera />
                        </span>
                    </label>
                    </div>
                
                    
                
                    <div className={"input-container "} >
                    <p className="p-person-name">Ваше ім'я</p>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    </div>
                </div>


                <div className='sex'>
                    <div className="switch">
                        <div
                        className={`option ${active === "man" ? "active" : ""}`}
                        onClick={() => setSex("man") || setActive("man")}
                        >
                        <div className="icon">
                            <IoManOutline />
                        </div>
                        <div className="t_switch">Чоловік</div>
                        </div>
                        <div
                        className={`option ${active === "woman" ? "active" : ""}`}
                        onClick={() => setSex("woman") || setActive("woman")}
                        >
                        <div className="icon">
                            <IoWomanOutline />
                        </div>
                        <div className="t_switch">Жінка</div>
                        </div>
                    </div>
                </div>

                <div className="card-personal">
                        <Card
                        title="Вік"
                        initialValue={24}
                        onSelect={setAge}
                        min={1}
                        max={100}
                        />
                        <Card
                        title="Вага"
                        initialValue={82}
                        onSelect={setWeight}
                        min={1}
                        max={500}
                        />
                        <Card
                        title="Зріст"
                        initialValue={178}
                        onSelect={setHeight}
                        min={1}
                        max={250}
                        />
                <div className='box-update-person'>
                    <div className='btn-update-person'>
                        <button onClick={updateData}>ОНОВИТИ</button>
                    </div>
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
}
 
export default PersonInformation;