import { FaStar } from 'react-icons/fa';

import TS1 from '../../assets/TS1.svg'
import styles from './ProductCard.module.scss';

const ProductCard = ({ product }) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.imgWrapper}>
                <img src={TS1} alt='TS1' />
            </div>
            <div className={styles.productName}>
                <p>{product.name}</p>
            </div>
            <div className={styles.rating}>
                <div className='star'>
                    {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                            key={star}
                            color={star <= Math.round(product.rating) ? '#FFC633' : '#ccc'}
                        />
                    ))}
                </div>
                <div className={styles.numRating}>
                    <p>{product.rating} /5</p>
                </div>
            </div>
            <div className={styles.price}>
                <p>${product.price}</p>
            </div>
        </div>
    )
}

export default ProductCard;