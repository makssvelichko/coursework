import FooterLogin from "../components/footer_login/footer_login";
import HeaderLogin from "../components/header_login/header_login";
import first from './../img/photo/prav.jpg'

import "./../styles/rules.css";
import React  from "react";

const Rules = () => {
 
  return (
    <>
      <HeaderLogin />
      <div className="login">
        <div className="container_rules">
                <div className="imgrules">
                    <img src={first} alt="first" className="rulesimg"/>
                    <div className="text">
                        <p className='toptext'>Правила користування</p>
                    </div>
                </div>  
                <div className="conteiner_text_rules">
                    <h2 className="rulesh2">ТЕРМІНОЛОГІЯ</h2>
                    <p className="ruleshp">Сайт – ресурс для проведення тренувань в Інтернеті</p>
                    <p className="ruleshp">Користувач - будь-яка зареєстрована на Сайті фізична особа, яка здійснює доступ до змісту та сервісу сайту</p>
                    <p className="ruleshp">Реєстрація – добровільна процедура, в ході якої Користувач заповнює розміщену на Сайті форму, на підставі якої в базі даних Сайту створюється обліковий запис Користувача, який однозначно ідентифікує Користувача унікальною парою реквізитів доступу: логін та пароль.</p>
                    <p className="ruleshp">Тренер – автор програми тренувань.</p>
                    <p className="ruleshp">Особистий кабінет – сторінка Користувача на Сайті, що використовується для здійснення керування своїм обліковим записом</p>
                    <h2 className="rulesh2">ПРАВА ТА ОБОВ'ЯЗКИ СТОРІН</h2>
                    <h3 className="rulesh3">Адміністрація зобов'язана: </h3>
                    <p className="ruleshp">- забезпечити Користувачеві можливість на свій розсуд змінити дані свого облікового запису.</p>
                    <h3 className="rulesh3">Користувач має право:</h3>
                    <p className="ruleshp">- припинити користування сайтом та змінити свій обліковий запис.</p>
                    <h3 className="rulesh3">Користувач зобов'язаний:</h3>
                    <p className="ruleshp">- не реєструватися на Сайті, використовуючи чужі адреси електронної пошти</p>
                    <p className="ruleshp">- не створювати кілька облікових записів на Сайті, якщо фактично вони належать одній і тій самій особі</p>
                    <p className="ruleshp">- не вчиняти дії, спрямовані на введення інших Користувачів в оману</p>
                    <p className="ruleshp">- не надавати у користування свій обліковий запис та/або логін та пароль від облікового запису третім особам</p>
                </div>
        </div>
      </div>
      <FooterLogin />
    </>
  );
};

export default Rules;