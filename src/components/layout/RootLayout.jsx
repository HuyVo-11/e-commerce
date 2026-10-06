
import HeaderLayout from './HeaderLayout';
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
            {/* <footer><FooterLayout /></footer> */}
        </div>
    );
}

export default RootLayout;