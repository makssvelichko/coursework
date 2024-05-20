import FooterLogin from "../components/footer_login/footer_login";
import HeaderLogin from "../components/header_login/header_login";
import { NavLink, useNavigate } from "react-router-dom";

import "./../styles/login.css";
import { OFFICE_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { login } from "../http/AuthServices";
import { Context } from "../index";

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loginAttempt, setLoginAttempt] = useState(false);

  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    setEmailError(email === "");
    setPasswordError(password === "");
  
    if (email !== "" && password !== "") {
      const userData = await login(email, password);
      if (userData) {
        user.setUser(userData);
        user.setIsAuth(true);
        navigate(OFFICE_ROUTE);
      } else {
        console.error("Login failed!");
      }
    }
  }, [email, password, user, navigate]);


  useEffect(() => {
    if (loginAttempt) {
      handleLogin();
      setLoginAttempt(false);
    }
  }, [email, password, handleLogin, loginAttempt]);

  return (
    <GoogleOAuthProvider clientId="899348282415-rhce4qf0726geh0t9316g296sksn3u1c.apps.googleusercontent.com">
    <>
      <HeaderLogin />
      <div className="login">
        <div className="container_login">
          <div className="half"></div>
          <div className="half">
            <p className="plog1">Авторизація</p>
            <form className="forms">
                <div className={"input-container " + (emailError ? "error" : "")}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="error-message">Треба заповнити пусте поле</p>
                  )}
                </div>
                <div className={"input-container " + (passwordError ? "error" : "")}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <p className="error-message">Треба заповнити пусте поле</p>
                  )}
                </div>
                </form>
            <p className="plog3">Або увійти за допомогою соціальних мереж</p>
            <div className="btn_googl">
            <GoogleLogin onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse?.credential);
                console.log(decoded);
                setEmail(decoded.email);
                setPassword(decoded.sub);
                setLoginAttempt(true);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />

              <form className="checkbox1">
                <input
                  type="checkbox"
                  id="remember-me1"
                  name="remember-me1"
                  className="check_box1"
                />
                <label htmlFor="remember-me1" className="remember-me1">
                  Запам'ятати мене
                </label>
              </form>
              <div className="btns_log">
                {/* <NavLink to={OFFICE_ROUTE} className='l_registration'> */}
                <div className="enter" onClick={handleLogin}>
                  <p className="t_enter">УВІЙТИ</p>
                </div>
                {/* </NavLink> */}

                <NavLink to={REGISTRATION_ROUTE} className="l_registration">
                  <div className="registration">
                    <p className="t_registration">РЕЄСТРАЦІЯ</p>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLogin />
    </>
    </GoogleOAuthProvider>
  );
};

export default Login;