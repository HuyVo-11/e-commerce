import { FaStar } from 'react-icons/fa';

import TS1 from '../../assets/TS1.svg';
import { resolveImageUrl } from '../../services/api';
import styles from './ProductCard.module.scss';

const STARS = [1, 2, 3, 4, 5];

// Card chỉ hiển thị 1 sản phẩm: ảnh, tên, rating, giá.
// Kích thước do component cha quyết định (grid/flex), card không tự đặt số cột.
const ProductCard = ({ product, variant = 'default' }) => {
    const rating = Number(product.rating) || 0;
    const image = resolveImageUrl(product.thumbnail ?? product.image) ?? TS1;

    return (
        <div className={`${styles.productCard} ${styles[variant] ?? ''}`.trim()}>
            <div className={styles.imgWrapper}>
                <img src={image} alt={product.name} loading='lazy' />
            </div>
            <div className={styles.productName}>
                <p>{product.name}</p>
            </div>
            <div className={styles.rating}>
                <div className='star'>
                    {STARS.map(star => (
                        <FaStar
                            key={star}
                            color={star <= Math.round(rating) ? '#FFC633' : '#ccc'}
                        />
                    ))}
                </div>
                <div className={styles.numRating}>
                    <p>{rating} /5</p>
                </div>
            </div>
            <div className={styles.price}>
                <p>${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
