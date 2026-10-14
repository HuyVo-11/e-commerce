import styles from './FooterLayout.module.scss'
import FooterNavbar from './FooterNavbar/FooterNavbar';
import Subscription from './Subscription/Subscription';

const FooterLayout = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.subscriptionContainer}>
                <Subscription/>
            </div>
            <div className={styles.FooterNavbar}>
                <FooterNavbar/>
            </div>
        </div>
    )
}

export default FooterLayout;