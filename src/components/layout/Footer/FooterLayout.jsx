import styles from './FooterLayout.module.scss'
// import FooterNavbar from './FooterNavbar/FooterNavbar';
import Subscription from './Subscription/Subscription';

const FooterLayout = () => {
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.footerContainer}>
                <div className={styles.subscriptionContainer}>
                    <Subscription />
                </div>
                {/* <div className={styles.footerNavbar}>
                    <FooterNavbar />
                </div> */}
            </div>

        </div>
    )
}

export default FooterLayout;