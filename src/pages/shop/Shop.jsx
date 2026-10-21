import { FaSliders } from 'react-icons/fa6';

import styles from './Shop.module.scss';
import PriceFilter from '../../components/PriceFilter/PriceFilter';
import ColorFilter from '../../components/ColorFilter/ColorFilter';
import ProductList from '../../components/ProcductList/ProductList';

const Shop = () => {
    return (
        <div className={styles.shopWrapper}>
            <div className={styles.shopContainer}>
                {/* Breadcrumb */}


                {/* Container 2 cột */}
                <div className={styles.mainContainer}>
                    {/* Cột trái: Bộ lọc (Filter Sidebar) */}
                    <div className={styles.filterSidebar}>
                        {/* Header Filters */}
                        <div className={styles.filterHeader}>
                            <h5>Filter</h5>
                            <FaSliders />
                        </div>

                        <div className={styles.divider} />

                        {/* Danh mục (Category) */}
                        <div className={styles.categoryList}>
                            <div className={styles.categoryItem}>
                                <span>T-shirts</span>
                                <span className={styles.arrow}>&gt;</span>
                            </div>
                            <div className={styles.categoryItem}>
                                <span>Shorts</span>
                                <span className={styles.arrow}>&gt;</span>
                            </div>
                            <div className={styles.categoryItem}>
                                <span>Shirts</span>
                                <span className={styles.arrow}>&gt;</span>
                            </div>
                            <div className={styles.categoryItem}>
                                <span>Hoodie</span>
                                <span className={styles.arrow}>&gt;</span>
                            </div>
                            <div className={styles.categoryItem}>
                                <span>Jeans</span>
                                <span className={styles.arrow}>&gt;</span>
                            </div>
                        </div>

                        {/* Khoảng giá (Price) */}
                        <div className={styles.filterSection}>
                            <PriceFilter />
                        </div>

                        {/* Màu sắc (Colors) */}
                        <div className={styles.filterSection}>
                            <ColorFilter />
                        </div>

                        <div className={styles.divider} />

                        {/* Kích cỡ (Size) */}
                        <div className={styles.filterSection}>
                            <div className={styles.sectionHeader}>
                                <h4>Size</h4>
                                <span className={styles.chevron}>^</span>
                            </div>
                            <div className={styles.sizeList}>
                                <div className={styles.sizeItem}>XX-Small</div>
                                <div className={styles.sizeItem}>X-Small</div>
                                <div className={styles.sizeItem}>Small</div>
                                <div className={styles.sizeItem}>Medium</div>
                                <div className={styles.sizeItem}>Large</div>
                                <div className={styles.sizeItem}>X-Large</div>
                                <div className={styles.sizeItem}>XX-Large</div>
                                <div className={styles.sizeItem}>3X-Large</div>
                                <div className={styles.sizeItem}>4X-Large</div>
                            </div>
                        </div>

                        <div className={styles.divider} />

                        {/* Phong cách (Dress Style) */}
                        <div className={styles.filterSection}>
                            <div className={styles.sectionHeader}>
                                <h4>Dress Style</h4>
                                <span className={styles.chevron}>^</span>
                            </div>
                            <div className={styles.dressStyleList}>
                                <div className={styles.dressStyleItem}>
                                    <span>Casual</span>
                                    <span className={styles.arrow}>&gt;</span>
                                </div>
                                <div className={styles.dressStyleItem}>
                                    <span>Formal</span>
                                    <span className={styles.arrow}>&gt;</span>
                                </div>
                                <div className={styles.dressStyleItem}>
                                    <span>Party</span>
                                    <span className={styles.arrow}>&gt;</span>
                                </div>
                                <div className={styles.dressStyleItem}>
                                    <span>Gym</span>
                                    <span className={styles.arrow}>&gt;</span>
                                </div>
                            </div>
                        </div>

                        {/* Nút áp dụng */}
                        <div className={styles.applyFilterWrapper}>
                            <button className={styles.applyBtn}>Apply Filter</button>
                        </div>
                    </div>

                    {/* Cột phải: Nội dung danh sách sản phẩm */}
                    <div className={styles.productContent}>
                        {/* Thanh tiêu đề & Sắp xếp */}
                        <div className={styles.contentHeader}>
                            <h4 className={styles.title}>Casual</h4>
                            <div className={styles.sortWrapper}>
                                <span className={styles.productCount}>Showing 1-10 of 100 Products</span>
                                <div className={styles.sortBy}>
                                    <span>Sort by:</span>
                                    <span className={styles.selectedSort}>Most Popular</span>
                                    <span className={styles.chevron}>v</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.ProductList}>
                            <ProductList/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Shop;

