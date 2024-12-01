import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";
import cart from "../../assets/cart.svg"
import {NavLink} from "react-router-dom";

export const Header = () => (
    <header className={styles.header}>
        <div className='container mx-auto flex items-center justify-between flex-wrap gap-5'>
            <a href={'/'}>
                <img src={logo} alt={'Pro Auto'}/>
            </a>
            <nav className={'flex gap-4'}>
                <a href={'/#services'} className={'link'}>services</a>
                <a href={'/#about'} className={'link'}>about</a>
                <NavLink to="/shop" className="link">shop</NavLink>
                <NavLink to="/contact" className="link">contact</NavLink>
            </nav>
            <div className={'flex gap-2 items-center'}>
            <img src={cart} alt={'Cart'}/>
                <a href={'/'} className={'btn-primary'}>Login</a>
            </div>
        </div>
    </header>
)