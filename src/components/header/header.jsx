import './header.css'
import logo from './../../img/logo/logo.png'
import { NavLink } from 'react-router-dom';
import AnchorLink from '../AnchorLink';


function Header(){
    return(
        <header className='header'>
            <div className="container">
                <div className="header_row">
                    <div className="header_logo">
                        <AnchorLink id="header"><img src={logo} alt="LOGO" /></AnchorLink>
                    </div>
                    <nav className="header_nav">
                        <ul>
                            <li><AnchorLink id="programs">ПРОГРАМИ</AnchorLink></li>
                            <li><AnchorLink id="trainer">ТРЕНЕР</AnchorLink></li>
                            <li><AnchorLink id="plans">ПЛАНИ ПІДПИСОК</AnchorLink></li>
                            <li><AnchorLink id="#!" className='header_btn'>ПРИДБАТИ ПІДПИСКУ</AnchorLink></li>
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