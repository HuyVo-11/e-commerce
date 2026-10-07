
import TS1 from '../../assets/TS1.svg'
import styles from './ProductCard.module.scss';

const ProductCard = () => {
    return (
        <div className={styles.newArrivalProduct}>
                <div className={styles.productCard}>
                    <div className={styles.img}>
                        <img src={TS1} alt='TS1' />
                    </div>
                    <div className={styles.productName}>
                        Name
                    </div>
                    <div className={styles.rating}>
                        rate
                    </div>
                    <div className={styles.price}>
                        price
                    </div>
                </div>
            </div>
    )
}

export default ProductCard;