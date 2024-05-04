import FooterLogin from '../components/footer_login/footer_login';
import HeaderLogin from '../components/header_login/header_login';
import { NavLink } from 'react-router-dom';

import { IoManOutline } from "react-icons/io5";
import { IoWomanOutline } from "react-icons/io5";

import React, { useState } from 'react';

import AnchorLink from '../components/AnchorLink';
import './../styles/registrationtwo.css'

const RegistrationTwo = () => {

    const [isChecked, setIsChecked] = useState(false);

    const [active, setActive] = useState('man');
    return ( 
        <>
        <HeaderLogin/>
        <div className='registrationtwo'>
        <body>
            <div className="container_registrationtwo">
                <div className="half">
                <div className='divstep2'>
                <div class="step2">
                    <div className='step_text12'>Створити акаунт</div>
                    <div class="circle12">1</div>
                </div>

                <div class="step2">
                    <div className='step_text22'>Особисті дані</div>
                    <div class="circle22">2</div>
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
                            <AnchorLink id="#!" className={isChecked ? 'active' : 'disabled'}>
                               <div className='next'>
                                   <p className='t_enter'>РЕЄСТРАЦІЯ</p>
                                </div>
                            </AnchorLink>
                            <NavLink to='/registration' className='l_registration'>
                                <div className='back'>
                                    <p className='t_registration'>ПОВЕРНУТИСЯ</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </div>
        <FooterLogin/>
        </>
     );
}
 
export default RegistrationTwo;