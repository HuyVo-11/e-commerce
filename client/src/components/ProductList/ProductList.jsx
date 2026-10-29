import { useSearchParams } from 'react-router-dom';

import ProductCard from '../ProductCard/ProductCard.jsx';
import useProducts from '../../hooks/useProducts';
import styles from './ProductList.module.scss';

const itemsPerPage = 9;
const MAX_PAGE_BUTTONS = 7;

// Trả về danh sách số trang (1-based) cần hiển thị, luôn chứa currentPage
const getPaginationGroup = (currentPage, totalPages) => {
    if (totalPages <= MAX_PAGE_BUTTONS) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
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



const ProductList = ({ filters, errors = {}, isValid = true }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const rawPage = Number.parseInt(searchParams.get('page') ?? '1', 10);
    const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;
    const goToPage = (page) => {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.set('page', String(page));
        setSearchParams(nextSearchParams);
    };
    const { products, meta, error } = useProducts({
        filters,
        page: currentPage,
        limit: itemsPerPage,
        enabled: isValid,
    });
    const totalItems = meta?.total ?? 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const from = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const to = Math.min(currentPage * itemsPerPage, totalItems);
    return (
        <div className={styles.productListWrapper}>
            {isValid && totalItems > 0 && (
                <p className={styles.productCount}>
                    Showing {from}–{to} of {totalItems} Products
                </p>
            )}
            <div className={styles.productGrid}>
                {errors.price && (
                    <p className={styles.state}>
                        Invalid price range.
                    </p>
                )}

                {errors.sizes && (
                    <p className={styles.state}>
                        Invalid size.
                    </p>
                )}

                {isValid && error && (
                    <p className={styles.state}>
                        Unable to load products.
                    </p>
                )}

                {isValid && products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant='shop'
                    />
                ))}
            </div>

            <div className={styles.divider} />

            {isValid && totalPages > 1 && (
                <div className={styles.paginationWrapper}>
                    <div className={styles.pagination}>
                        <button
                            className={styles.btnLR}
                            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                            disabled={currentPage <= 1}
                        >
                            &larr; Previous
                        </button>

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
                                        className={`${styles.pageBtn} ${currentPage === item ? styles.active : ''}`}
                                        onClick={() => goToPage(item)}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            className={styles.btnLR}
                            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage >= totalPages}
                        >
                            Next &rarr;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ProductList;


