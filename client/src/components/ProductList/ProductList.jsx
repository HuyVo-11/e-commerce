import { useEffect, useState } from 'react';

import ProductCard from '../ProductCard/ProductCard.jsx';
import { getProducts } from '../../services/api';
import styles from './ProductList.module.scss';

const itemsPerPage = 9;
const MAX_PAGE_BUTTONS = 7;

// Trả về danh sách trang cần hiển thị, luôn chứa currentPage
const getPaginationGroup = (currentPage, totalPages) => {
    if (totalPages <= MAX_PAGE_BUTTONS) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Gần đầu: 1 2 3 4 5 ... last
    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, '...', totalPages];
    }

    // Gần cuối: 1 ... last-4 last-3 last-2 last-1 last
    if (currentPage >= totalPages - 3) {
        return [
            1,
            '...',
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    // Ở giữa: 1 ... p-1 p p+1 ... last
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const fetchProducts = async () => {
            try {
                const data = await getProducts({
                    limit: itemsPerPage,
                    skip: (currentPage - 1) * itemsPerPage,
                });

                if (cancelled) return;

                setProducts(data.products ?? []);
                setTotalItems(data.meta?.total ?? 0);
                setError(false);
            } catch {
                if (cancelled) return;

                setProducts([]);
                setTotalItems(0);
                setError(true);
            }
        };

        fetchProducts();

        return () => {
            cancelled = true;
        };
    }, [currentPage]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className={styles.productListWrapper}>
            <div className={styles.productGrid}>
                {error && (
                    <p className={styles.state}>
                        Unable to load products. Please make sure the API server is running.
                    </p>
                )}

                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant='shop'
                    />
                ))}
            </div>

            <div className={styles.divider} />

            {totalPages > 1 && (
                <div className={styles.paginationWrapper}>
                    <div className={styles.pagination}>
                        <button
                            className={styles.btnLR}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage <= 1}
                        >&larr; Previous</button>

                        <div className={styles.pageNumbers}>
                            {getPaginationGroup(currentPage, totalPages).map((item, index) => {
                                if (item === '...') {
                                    return (
                                        <span key={`dots-${index}`} className={styles.dots}>
                                            ...
                                        </span>
                                    );
                                }

                                return (
                                    <button
                                        key={item}
                                        className={`
                                                    ${styles.pageBtn}
                                                    ${currentPage === item ? styles.active : ''}`}
                                        onClick={() => setCurrentPage(item)}
                                    >
                                        {item}
                                    </button>
                                )
                            })}
                        </div>
                        <button
                            className={styles.btnLR}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.max(totalPages, 1)))}
                            disabled={currentPage >= totalPages}
                        >Next &rarr;</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductList;
