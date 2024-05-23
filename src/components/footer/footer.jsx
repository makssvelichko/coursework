import './footer.css'
import logocard from './../../img/logo/mc_symbol.svg.png'
import logo from './../../img/logo/logo.png'
import logo_inst_footer from './../../img/logo/Link → instagram.png.png'
import logo_telega_footer from './../../img/logo/Link → telegram-footer.svg.png'
import AnchorLink from '../AnchorLink'
import { NavLink } from 'react-router-dom'
import { RULES_ROUTE } from '../../utils/consts'

function Footer(){
    return(
        <footer className='footer'>
        <div className="container_footer">
            <div className="footer_row1">
                <nav className='footer_nav'>
                    <ul className="main-links">
                        <li><AnchorLink id="programs">ПРОГРАМИ</AnchorLink></li>
                        <li><AnchorLink id="trainer">ТРЕНЕР</AnchorLink></li>
                        <li><AnchorLink id="plans">ПЛАНИ ПІДПИСОК</AnchorLink></li>
                    </ul>
                    <ul className="extra-link">
                        <li><NavLink to='/login' className='btn_footer'>ОСОБИСТИЙ КАБІНЕТ</NavLink></li>
                    </ul>
                </nav>
            </div>
            <div className="footer_row2">
            </div>
            <div className="footer_row3">
                <nav className='footer_nav2'>
                    <ul className="main-links">
                        <li><img className='logo_footer' src={logo} alt="" /></li>
                        <li><img className='logo_card_footer' src={logocard} alt="" /></li>
                        <li className='l1'><NavLink to={RULES_ROUTE}>Правила користування</NavLink></li>
                        <li className='instagram_footer'><a href="https://www.instagram.com/t.kruhliak?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><img src={logo_inst_footer} alt="" /></a></li>
                        <li><a href="https://t.me/kaisteam" target="_blank" rel="noopener noreferrer"><img src={logo_telega_footer} alt="" /></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </footer>
    )

}

export default Footer;