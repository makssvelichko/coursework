import { IoManOutline } from "react-icons/io5";
import { IoWomanOutline } from "react-icons/io5";

import "./../styles/registrationtwo.css";
import { OFFICE_ROUTE } from "../utils/consts";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { GiWeightScale } from "react-icons/gi";
import { GiMuscularTorso } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";
import { handleErrors } from "../errors/handleErrors";

import FooterLogin from "../components/footer_login/footer_login";
import HeaderLogin from "../components/header_login/header_login";
import defimage from "./../img/photo/def.jpg";

import { NavLink } from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";

import React, { useContext, useState } from "react";
import { Context } from "../index";

import "./../styles/registration.css";
import { LOGIN_ROUTE } from "../utils/consts";

import { registration } from "../http/AuthServices";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { GoogleOAuthProvider } from "@react-oauth/google";

export const Card = ({ title, initialValue, onSelect, min, max }) => {
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
    <div className="card">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      <div className="controls">
        <button className="btn-plus" onClick={decreaseValue}>
          -
        </button>
        <button className="btn-minus" onClick={increaseValue}>
          +
        </button>
      </div>
    </div>
  );
};

export const Card2 = ({ text, selected, onSelect, icon }) => (
  <div className={`card2 ${selected ? "selected" : ""}`} onClick={onSelect}>
    <div className="card-icon">{icon}</div>
    <h3>{text}</h3>
    {selected && (
      <div className="checkmark">
        <IoIosCheckmarkCircleOutline />
      </div>
    )}
  </div>
);

const Registration = () => {
  const [step, setStep] = useState(1);

  const showNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const showPreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [sex, setSex] = useState("men");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [age, setAge] = useState(24);
  const [weight, setWeight] = useState(82);
  const [height, setHeight] = useState(178);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { user } = useContext(Context);

  const handleLogin = () => {
    setEmailError(email === "");
    setPasswordError(password === "");
    setNameError(username === "");

    if (email !== "" && password !== "" && username !== "") {
      showNextStep();
    }
  };

  const handleProfilePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const [active, setActive] = useState("man");

  const [selectedCard, setSelectedCard] = useState(null);
  const cards = [
    { text: "Спалити жир", icon: <GiWeightScale /> },
    { text: "Набір м'язів", icon: <GiMuscularTorso /> },
    { text: "Підтримка форми", icon: <GiRunningShoe /> },
  ];

  const signIn = async () => {
    try {
      const userData = {
        username,
        email,
        password,
        sex,
        age,
        weight,
        height,
        profilePhoto,
      };

      const newUser = await registration(userData);
      user.setUser(newUser);
      user.setIsAuth(true);
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="899348282415-rhce4qf0726geh0t9316g296sksn3u1c.apps.googleusercontent.com">
      <>
        <HeaderLogin />
        {step === 1 && (
          <div id="registerStepOne" className="login">
            <div className="container_login">
              <div className="half">
                <div className="divstep">
                  <div className="step">
                    <div className="step_text1">Створити акаунт</div>
                    <div className="circle1">1</div>
                  </div>

                  <div className="step">
                    <div className="step_text2">Особисті дані</div>
                    <div className="circle2">2</div>
                  </div>
                </div>
              </div>
              <div className="half">
                <p className="plog1">Створити свій обліковий запис</p>
                <form className="forms_r">
                  <div
                    className={"input-container " + (emailError ? "error" : "")}
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <p className="error-message">
                        Треба заповнити пусте поле
                      </p>
                    )}
                  </div>
                  <div
                    className={
                      "input-container " + (passwordError ? "error" : "")
                    }
                  >
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                      <p className="error-message">
                        Треба заповнити пусте поле
                      </p>
                    )}
                  </div>
                  <div className="profile-container">
                    <img
                      className="profile-photo"
                      src={
                        profilePhoto
                          ? URL.createObjectURL(profilePhoto)
                          : defimage
                      }
                      alt="ProfilePhoto"
                    />
                    <label className="profile-image-label">
                      <input
                        type="file"
                        onChange={handleProfilePhotoChange}
                        style={{ display: "none" }}
                      />
                      <span className="camera-icon">
                        <MdPhotoCamera />
                      </span>
                    </label>
                  </div>
                </form>
                <p className="plog2">Ваше ім'я</p>
                <form>
                  <div
                    className={"input-container " + (nameError ? "error" : "")}
                  >
                    <input
                      type="username"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    {nameError && (
                      <p className="error-message1">
                        Треба заповнити пусте поле
                      </p>
                    )}
                  </div>
                </form>

                <p className="plog2">
                  Або увійти за допомогою соціальних мереж
                </p>
                <div className="btn_googl">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse?.credential);
                      console.log(decoded);
                      setEmail(decoded.email);
                      setPassword(decoded.sub);
                      setUserName(decoded.name);
                      showNextStep();
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>

                <div>
                  <div className="btns_log1">
                    {/* <NavLink to={REGISTRATIONTWO_ROUTE}> */}
                    <div className="next2" onClick={handleLogin}>
                      <p className="t_enter">ПРОДОВЖИТИ</p>
                    </div>
                    {/* </NavLink> */}
                    <NavLink to={LOGIN_ROUTE} className="l_registration">
                      <div className="back">
                        <p className="t_registration">ВІДМІНА</p>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div id="registerStepTwo" className="registrationtwo">
            <div className="container_registrationtwo">
              <div className="half_r2">
                <div className="divstep2">
                  <div className="step2">
                    <div className="step_text12">Створити акаунт</div>
                    <div className="circle12">1</div>
                  </div>

                  <div className="step2">
                    <div className="step_text22">Особисті дані</div>
                    <div className="circle22">2</div>
                  </div>
                </div>
              </div>
              <div className="half_r2">
                <p className="plog1">Особисті дані</p>

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

                <div className="card-container">
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
                </div>

                <div>
                  <p className="plog2">Яка ваша мета:</p>
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
                  <form className="checkbox">
                    <input
                      type="checkbox"
                      id="remember-me"
                      name="remember-me"
                      className="check_box"
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="remember-me" className="remember-me">
                      Я прочитав(ла) Правила користування та даю згоду на
                      обробку особистих даних
                    </label>
                  </form>
                  <div className="btns_log">
                    <NavLink
                      to={OFFICE_ROUTE}
                      className={isChecked ? "active" : "disabled"}
                    >
                      <div className="next" onClick={signIn}>
                        <p className="t_enter">РЕЄСТРАЦІЯ</p>
                      </div>
                    </NavLink>
                    {/* <NavLink to={REGISTRATION_ROUTE} className='l_registration'> */}
                    <div className="back" onClick={showPreviousStep}>
                      <p className="t_registration">ПОВЕРНУТИСЯ</p>
                    </div>
                    {/* </NavLink> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <FooterLogin />
      </>
    </GoogleOAuthProvider>
  );
};

export default Registration;
