import { useState } from 'react';

import ProductCard from '../ProductCard/ProductCard.jsx';
import styles from './ProductSection.module.scss';
import { products } from '../../constant/productData.js'
import classNames from 'classnames';

const defaultProduct = 4
const CustomButton = ({
    onClick,
    title,
    className,
}) => {
    return (
        <button className={className}
            onClick={onClick}
        >
            {title}
        </button>
    )
}
const ProductSection = ({ title, tag }) => {
    const [visibleCount, setVisibleCount] = useState(defaultProduct);
    const [activeViewAll, setActiveViewAll] = useState(false);

    const newProducts = products.filter(product =>
        product.tag?.includes(tag)
    )

    const visibleList = newProducts.slice(0, visibleCount)

    const listProducts = visibleList.map(product => (
        <ProductCard
            key={product.id}
            product={product}
        />
    ))


    const handleOnClickView = (status) => {
        setActiveViewAll(pre => !pre)

        if (status === 'All') {
            setVisibleCount(pre => pre + 4)
        } else {
            setVisibleCount(defaultProduct)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.displayCard}>
                    <div className={classNames(styles.listItem, {
                        [styles.viewAll]: activeViewAll
                    })}>
                        {listProducts}
                    </div>
                    {visibleCount < 8 ? (
                        <CustomButton
                            className={styles.btn}
                            title='SHOW MORE'
                            onClick={() => handleOnClickView('All')}
                        />
                    ) : (
                        <CustomButton
                            className={styles.btn}
                            title='VIEW ALL'
                            onClick={() => handleOnClickView()}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductSection;