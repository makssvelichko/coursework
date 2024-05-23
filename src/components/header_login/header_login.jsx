import './header_login.css'
import logo from './../../img/logo/logo.png'
import { NavLink } from 'react-router-dom';

function HeaderLogin(){
    return(
        <header className='header'>
            <div className="container">
                <div className="header_row">
                    <div className="header_logo">
                        <NavLink to='/'><img src={logo} alt="LOGO" /></NavLink>
                    </div>
                    <nav className="header_nav">
                        <ul>
                            <li className='stick'>|</li>
                            <li><div>ОСОБИСТИЙ КАБІНЕТ</div></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )

}

export default HeaderLogin;