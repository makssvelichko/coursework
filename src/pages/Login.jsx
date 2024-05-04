import FooterLogin from '../components/footer_login/footer_login';
import HeaderLogin from '../components/header_login/header_login';
import { NavLink } from 'react-router-dom';
import logo_google from './../img/logo/google.png'

import AnchorLink from '../components/AnchorLink';
import './../styles/login.css'

const Login = () => {
    return ( 
        <>
        <HeaderLogin/>
        <div className='login'>
        <body>

            <div className="container_login">
                <div className="half"></div>
                <div className="half">
                    <p className='plog1'>Авторизація</p>
                    <form className='forms'>
                    <div className="input-container">
                        <input type="email" id="email" name="email" placeholder="E-mail"/>
                    </div>
                    <div className="input-container">
                        <input type="password" id="password" name="password" placeholder="Пароль"/>
                    </div>
                    </form>
                    <p className='plog2'>Або увійти за допомогою соціальних мереж</p>
                    <div className='btn_googl'>
                    <AnchorLink id="#!" className='google-btn'>
                      <img src={logo_google} alt="Google logo" className='google-img'/>
                      Google
                    </AnchorLink>

                    <form className='checkbox'>
                        <input type="checkbox" id="remember-me" name="remember-me" className='check_box'/>
                        <label for="remember-me" className='remember-me'>Запам'ятати мене</label>
                    </form>
                    <div className='btns_log'>
                    <AnchorLink id="#!">
                        <div className='enter'>
                            <p className='t_enter'>УВІЙТИ</p>
                        </div>
                    </AnchorLink>
                    
                    <NavLink to='/registration' className='l_registration'>
                        <div className='registration'>
                            <p className='t_registration'>РЕЄСТРАЦІЯ</p>
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
 
export default Login;