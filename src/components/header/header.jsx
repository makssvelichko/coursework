import './header.css'
import logo from './../../img/logo/logo.png'
import { NavLink } from 'react-router-dom';


function Header(){
    return(
        <header className='header'>
            <div className="container">
                <div className="header_row">
                    <div className="header_logo">
                        <a href="#header"><img src={logo} alt="LOGO" /></a>
                    </div>
                    <nav className="header_nav">
                        <ul>
                            <li><a href="#programs">ПРОГРАМИ</a></li>
                            <li><a href="#trainer">ТРЕНЕР</a></li>
                            <li><a href="#plans">ПЛАНИ ПІДПИСОК</a></li>
                            <li><a href="#!" className='header_btn'>ПРИДБАТИ ПІДПИСКУ</a></li>
                            <li className='stick'>|</li>
                            <li><NavLink to='/login'>УВІЙТИ</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )

}

export default Header;