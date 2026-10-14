import styles from './FooterNavbar.module.scss'

const FooterNavbar = () => {
    return (
        <div className={styles.FooterNavbar}>
            <div className={styles.navLinks}>
                <div className={styles.logo}>
                    shop
                </div>
                <div className={styles.company}>
                    company
                </div>
                <div className={styles.help}>
                    help
                </div>
                <div className={styles.faq}>
                    faq
                </div>
                <div className={styles.resources}>
                    resources
                </div>
            </div>

            <div className={styles.rightsAndPayment}>
                <div className={styles.rights}>
                    rights
                </div>
                <div className={styles.payments}>
                    5 cái thẻbvh
                </div>
            </div>
        </div>
    )

}

export default FooterNavbar;