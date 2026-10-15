
import { Outlet } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import FooterLayout from './Footer/FooterLayout'
import HeaderLayout from './Header/HeaderLayout';
import styles from './RootLayout.module.scss';

const RootLayout = ({children}) => {
    return (
        <div className={styles.mainLayout}>
            <header>
                <HeaderLayout />
            </header>
            <Breadcrumb/>
            <main className={styles.mainContent}>
                {children}
            </main>
            <Outlet/>
            <footer>
                <FooterLayout/>
            </footer>
        </div>
    );
}

export default RootLayout;