import { useEffect, useMemo, useState } from 'react';

import ProductCard from '../ProductCard/ProductCard.jsx';
import { getProducts } from '../../services/api';
import styles from './ProductSection.module.scss';

const EMPTY_PRODUCTS = [];

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
    step = 8,
    maxVisible = 12,
    maxProduct = 100,
}) => {
    // Khoá nhận diện bộ tham số đang dùng, để biết dữ liệu/trạng thái có còn khớp không
    const requestKey = `${tag ?? ''}|${maxProduct}|${maxVisible}`;

    // Kết quả của lần gọi API gần nhất (kèm requestKey tương ứng)
    const [result, setResult] = useState({
        key: requestKey,
        products: [],
        status: 'loading', // loading | success | error
    });

    // Số sản phẩm đang hiển thị, gắn với requestKey để tự reset khi đổi tag
    const [paging, setPaging] = useState({
        key: requestKey,
        count: defaultProduct,
    });

    // Dữ liệu lấy từ API backend (nguồn duy nhất), lọc theo tag ở server
    useEffect(() => {
        let cancelled = false;
        const key = `${tag ?? ''}|${maxProduct}|${maxVisible}`;
        const limit = Math.min(maxProduct, maxVisible);

        getProducts({ tag, limit })
            .then(data => {
                if (cancelled) return;

                setResult({ key, products: data.products ?? [], status: 'success' });
            })
            .catch(() => {
                if (cancelled) return;

                setResult({ key, products: [], status: 'error' });
            });

        return () => {
            cancelled = true;
        };
    }, [tag, maxProduct, maxVisible]);

    // Dữ liệu của bộ tham số cũ được coi như đang tải, không cần setState trong effect
    const isFresh = result.key === requestKey;
    const status = isFresh ? result.status : 'loading';
    const products = isFresh ? result.products : EMPTY_PRODUCTS;
    const displayed = paging.key === requestKey ? paging.count : defaultProduct;

    const visibleList = useMemo(
        () => products.slice(0, displayed),
        [products, displayed]
    );

    // Chỉ được xem tối đa maxVisible (12) sản phẩm
    const hasMore = displayed < Math.min(products.length, maxVisible);
    const canCollapse = displayed > defaultProduct;

    const handleShowMore = () => {
        setPaging({
            key: requestKey,
            count: Math.min(displayed + step, products.length, maxVisible),
        });
    }

    const handleShowLess = () => {
        setPaging({ key: requestKey, count: defaultProduct });
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

    const renderBody = () => {
        if (status === 'loading') {
            return <p className={styles.state}>Loading products...</p>;
        }

        if (status === 'error') {
            return (
                <p className={styles.state}>
                    Unable to load products. Please make sure the API server is running.
                </p>
            );
        }

        return (
            <>
                <div className={styles.listItem}>
                    {visibleList.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
                {renderAction()}
            </>
        );
    }
console.log({title});
    return (
        <div className={styles.productSectionWrapper}>
            <div className={styles.productSectionContainer}>
                {title && (
                    <div className={styles.productSectionHeader}>
                        <h2>{title}</h2>
                    </div>
                )}
                <div className={styles.displayCard}>
                    {renderBody()}
                </div>
            </div>
        </div>
    )
}

export default ProductSection;
