import { FaSliders } from 'react-icons/fa6';
import { ChevronDown, ChevronUp } from 'lucide-react';

import styles from './Shop.module.scss';
import PriceFilter from '../../components/PriceFilter/PriceFilter';
import ProductList from '../../components/ProductList/ProductList';
import useDisclosure from '../../hooks/useDisclosure';
import useFilterDraft from '../../hooks/useFilterDraft';
import useProductFilters from '../../hooks/useProductFilters';

const Shop = () => {
    const {
        filters,
        errors,
        isValid,
        priceBounds,
        sizeOptions,
        applyFilters,
    } = useProductFilters();
    const {
        priceRange,
        selectedSizes,
        setPriceRange,
        toggleSize,
        applyDraft,
    } = useFilterDraft(filters, applyFilters);
    const { isOpen: isSizeOpen, toggle: toggleSizeOpen } = useDisclosure(true);

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
                            <FaSliders size={24} />
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
                            <PriceFilter
                                value={priceRange}
                                onChange={setPriceRange}
                                min={priceBounds.min}
                                max={priceBounds.max}
                            />
                        </div>

                        <div className={styles.divider} />

                        {/* Kích cỡ (Size) */}
                        <div className={styles.filterSection}>
                            <div className={styles.sectionHeader}>
                                <h5>Size</h5>
                                <button
                                    type='button'
                                    className={styles.sectionToggle}
                                    onClick={toggleSizeOpen}
                                    aria-expanded={isSizeOpen}
                                    aria-controls='size-options'
                                >
                                    {isSizeOpen ? <ChevronUp /> : <ChevronDown />}
                                </button>
                            </div>
                            <div
                                id='size-options'
                                className={`${styles.sizeSelection} ${isSizeOpen ? styles.open : ''}`}
                            >
                                <div className={styles.sizeList}>
                                    {sizeOptions.map((size) => (
                                        <button
                                            key={size}
                                            type='button'
                                            className={`${styles.sizeItem} ${selectedSizes.includes(size) ? styles.active : ''}`}
                                            aria-pressed={selectedSizes.includes(size)}
                                            onClick={() => toggleSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.divider} />

                        {/* Phong cách (Dress Style) */}
                        <div className={styles.filterSection}>
                            <div className={styles.sectionHeader}>
                                <h5>Dress Style</h5>
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
                            <button
                                type='button'
                                className={styles.applyBtn}
                                onClick={applyDraft}
                            >
                                Apply Filter
                            </button>
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
                            <ProductList
                                filters={filters}
                                errors={errors}
                                isValid={isValid}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Shop;

