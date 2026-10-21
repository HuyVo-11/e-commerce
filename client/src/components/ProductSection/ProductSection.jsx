import { useMemo, useState } from 'react';

import ProductCard from '../ProductCard/ProductCard.jsx';
import { products } from '../../constant/masterData';
import styles from './ProductSection.module.scss';

const CustomButton = ({
    onClick,
    title,
    className,
}) => {
    return (
        <button
            type='button'
            className={className}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

const ProductSection = ({
    title,
    tag,
    defaultProduct = 4,
    step = 4,
}) => {
    const [visibleCount, setVisibleCount] = useState(defaultProduct);

    // Chỉ lọc lại khi tag thay đổi, không lọc lại mỗi lần bấm nút
    const filteredProducts = useMemo(
        () => products.filter(product => product.tag?.includes(tag)),
        [tag]
    );

    const visibleList = filteredProducts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredProducts.length;
    const canCollapse = filteredProducts.length > defaultProduct;

    const handleShowMore = () => {
        setVisibleCount(count => Math.min(count + step, filteredProducts.length));
    }

    const handleShowLess = () => {
        setVisibleCount(defaultProduct);
    }

    const renderAction = () => {
        if (hasMore) {
            return (
                <CustomButton
                    className={styles.btn}
                    title='SHOW MORE'
                    onClick={handleShowMore}
                />
            )
        }

        if (canCollapse) {
            return (
                <CustomButton
                    className={styles.btn}
                    title='SHOW LESS'
                    onClick={handleShowLess}
                />
            )
        }

        return null;
    }

    return (
        <div className={styles.productSectionWrapper}>
            <div className={styles.productSectionContainer}>
                {title && (
                    <div className={styles.productSectionHeader}>
                        <h2>{title}</h2>
                    </div>
                )}
                <div className={styles.displayCard}>
                    <div className={styles.listItem}>
                        {visibleList.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                    {renderAction()}
                </div>
            </div>
        </div>
    )
}

export default ProductSection;
