import Navbar from "../navbar/navbar";

import styles from './HeaderLayout.module.scss';

const HeaderLayout = () => {
    return (
        <div className={styles.headerContainer}>
            <Navbar/>
        </div>
    )
}

export default HeaderLayout;