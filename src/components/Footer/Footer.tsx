import './Footer.scss'
import logo from "../../assets/logo.svg";
import {NavLink} from "react-router-dom";

export const Footer = () => {

    return (
        <footer className={'footer'}>
            <div className='container mx-auto flex items-center justify-between flex-wrap gap-5'>
                <a href={'/'}>
                    <img src={logo} alt={'Pro Auto'}/>
                </a>
                <nav className={'flex gap-4'}>
                    <NavLink
                        to="/"
                        className="link"
                    >
                        Services
                    </NavLink>
                    <NavLink
                        to="/"
                        className="link"
                    >
                        About
                    </NavLink>
                    <NavLink to="/shop" className="link">shop</NavLink>
                    <NavLink to="/contact" className="link">contact</NavLink>
                </nav>
            </div>
        </footer>
    )
}