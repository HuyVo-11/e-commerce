
import FooterLayout from './Footer/FooterLayout'
import HeaderLayout from './Header/HeaderLayout';
import styles from './RootLayout.module.scss';

const RootLayout = ({children}) => {
    return (
        <div className={styles.mainLayout}>
            <header>
                <HeaderLayout />
            </header>
            <main className={styles.mainContent}>
                {children}
            </main>
            <footer>
                <FooterLayout/>
            </footer>
        </div>
    );
}

export default RootLayout;