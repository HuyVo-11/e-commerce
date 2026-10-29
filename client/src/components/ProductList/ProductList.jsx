import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductCard from '../ProductCard/ProductCard.jsx';
import { getProducts } from '../../services/api';
import styles from './ProductList.module.scss';

const itemsPerPage = 9;
const MAX_PAGE_BUTTONS = 7;
const PRICE_PATTERN = /^\d+(?:\.\d+)?$/;

// Bỏ qua giá không hợp lệ để tránh gọi API lỗi
const parsePriceParam = (value) => {
    if (value === null) return undefined;

    const trimmed = value.trim();

    if (!PRICE_PATTERN.test(trimmed)) return undefined;

    return Number(trimmed);
};

// Trả về danh sách index trang (0-based) cần hiển thị, luôn chứa currentPage
const getPaginationGroup = (currentPage, totalPages) => {
    if (totalPages <= MAX_PAGE_BUTTONS) {
        return Array.from({ length: totalPages }, (_, i) => i);
    }

    // Gần đầu: 0 1 2 3 4 ... last
    if (currentPage <= 3) {
        return [0, 1, 2, 3, 4, '...', totalPages - 1];
    }

    // Gần cuối: 0 ... last-4 last-3 last-2 last-1 last
    if (currentPage >= totalPages - 4) {
        return [
            0,
            '...',
            totalPages - 5,
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
        ];
    }

    // Ở giữa: 0 ... p-1 p p+1 ... last
    return [0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1];
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const minPrice = parsePriceParam(searchParams.get('minPrice'));
    const maxPrice = parsePriceParam(searchParams.get('maxPrice'));
    const hasInvalidPriceRange =
        minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice;

    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState(false);

    const rawPage = Number.parseInt(searchParams.get('page') ?? '0', 10);
    const currentPage = Number.isInteger(rawPage) && rawPage >= 0 ? rawPage : 0;
    const goToPage = (page) => {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.set('page', String(page));
        setSearchParams(nextSearchParams);
    };

    useEffect(() => {
        if (hasInvalidPriceRange) return;

        let cancelled = false;

        const fetchProducts = async () => {
            try {
                const data = await getProducts({
                    minPrice,
                    maxPrice,
                    limit: itemsPerPage,
                    skip: currentPage * itemsPerPage,
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
    }, [currentPage, minPrice, maxPrice, hasInvalidPriceRange]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className={styles.productListWrapper}>
            <div className={styles.productGrid}>
                {hasInvalidPriceRange && (
                    <p className={styles.state}>
                        Invalid price range: minPrice ({minPrice}) cannot be greater than maxPrice ({maxPrice}).
                        Please update the URL or press Apply Filter.
                    </p>
                )}

                {!hasInvalidPriceRange && error && (
                    <p className={styles.state}>
                        Unable to load products. Please make sure the API server is running.
                    </p>
                )}

                {!hasInvalidPriceRange && products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant='shop'
                    />
                ))}
            </div>

            <div className={styles.divider} />

            {!hasInvalidPriceRange && totalPages > 1 && (
                <div className={styles.paginationWrapper}>
                    <div className={styles.pagination}>
                        <button
                            className={styles.btnLR}
                            onClick={() => goToPage(Math.max(currentPage - 1, 0))}
                            disabled={currentPage <= 0}
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
                                        {item + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            className={styles.btnLR}
                            onClick={() => goToPage(Math.min(currentPage + 1, totalPages - 1))}
                            disabled={currentPage >= totalPages - 1}
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
