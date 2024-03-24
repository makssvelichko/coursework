import './header.css'
import logo from './../../img/logo/logo.png'

function Header(){
    return(
        <header className='header'>
            <div className="container">
                <div className="header_row">
                    <div className="header_logo">
                        <img src={logo} alt="LOGO" />
                    </div>
                    <nav className="header_nav">
                        <ul>
                            <li><a href="#!">ПРОГРАМИ</a></li>
                            <li><a href="#!">ТРЕНЕР</a></li>
                            <li><a href="#!">ПЛАНИ ПІДПИСОК</a></li>
                            <li><a href="#!" className='header_btn'>ПРИДБАТИ ПІДПИСКУ</a></li>
                            <li className='stick'>|</li>
                            <li><a href="#!">УВІЙТИ</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )

}

export default Header;