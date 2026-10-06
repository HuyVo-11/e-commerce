
import TS1 from '../../assets/TS1.svg'
import styles from './NewArrivals.module.scss';

const NewArrivals = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>New Arrivals</h2>
            </div>
            <div className={styles.newArrivalProduct}>
                <div className={styles.productCard}>
                    <div className={styles.img}>
                        <img src={TS1} alt='TS1' />
                    </div>
                    <div className={styles.productName}>
                       
                    </div>
                    <div className={styles.rating}>
                        rate
                    </div>
                    <div className={styles.price}>
                        price
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewArrivals;