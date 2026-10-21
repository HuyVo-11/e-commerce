
import { useEffect, useState } from 'react';
import styles from './ProductList.module.scss'

const itemsPerPage = 12;
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

    useEffect(() => {
        const fetchProducts = async () => {
            const skip = (currentPage - 1) * itemsPerPage;
            const res = await fetch(
                `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`
            );
            const data = await res.json();

            setProducts(data.products);
            setTotalItems(data.total || 0);
        };
        fetchProducts();

    }, [currentPage]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className={styles.productListWrapper}>
            <div className={styles.productGrid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            width="150"
                            height="150"
                        />
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>

            <div className={styles.divider} />

            <div className={styles.paginationWrapper}>
                <div className={styles.pagination}>
                    <button
                        className={styles.btnLR}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
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
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >Next &rarr;</button>
                </div>
            </div>
        </div>
    )
}

export default ProductList;