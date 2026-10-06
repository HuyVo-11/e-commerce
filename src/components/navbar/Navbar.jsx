import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

import searchIcon from '../../assets/searchIcon.svg';
import { navLinks } from '../../constant/path';
import styles from './Navbar.module.scss'

const Navbar = () => {
    return (
        <nav className={styles.navContainer}>
            {/* logo */}
            <div className={styles.logo}>SHOP.CO</div>

            {/* nav Links */}
            <ul className={styles.navLinks}>
                {navLinks.map((item, key) => ( // return luôn bằng ()
                    <NavLink
                        to={item.path}
                        key={key}
                        className={({ isActive }) => (isActive ? styles.active : '')}
                    >
                        {item.text}
                    </NavLink>
                ))}
            </ul>

            {/* search Bar */}
            <div className={styles.searchBar}>
                <button className={styles.searchIcon}>
                    <img src={searchIcon} alt='SearchIcon' />
                </button>
                <input
                    className={styles.navSearch}
                    type='text'
                    placeholder='sreach for product'
                />
            </div>

            {/* icon */}
            <div className={styles.navIcons}>
                <FaShoppingCart />
                <FaUser />
            </div>
        </nav>
    );
};

export default Navbar;