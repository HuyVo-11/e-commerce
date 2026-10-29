import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSliders } from 'react-icons/fa6';
import { ChevronDown, ChevronUp } from 'lucide-react';

import styles from './Shop.module.scss';
import { sizeList } from '../../constant/masterData';
import PriceFilter from '../../components/PriceFilter/PriceFilter';
import ProductList from '../../components/ProductList/ProductList';

const PRICE_MIN = 0;
const PRICE_MAX = 250;
const PRICE_PATTERN = /^\d+(?:\.\d+)?$/;

// Đọc giá từ URL; trả null nếu không truyền hoặc không hợp lệ, mục đích là đổi về Number để sử d
const parsePriceParam = (value) => {
    if (value === null) return null;

    const trimmed = value.trim();

    if (!PRICE_PATTERN.test(trimmed)) return null;

    return Number(trimmed);
};

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const urlMinPrice = Math.min(
        Math.max(parsePriceParam(searchParams.get('minPrice')) ?? PRICE_MIN, PRICE_MIN),
        PRICE_MAX
    );
    const urlMaxPrice = Math.min(
        Math.max(parsePriceParam(searchParams.get('maxPrice')) ?? PRICE_MAX, PRICE_MIN),
        PRICE_MAX
    );

    const urlPriceRange = [
        Math.min(urlMinPrice, urlMaxPrice),
        Math.max(urlMinPrice, urlMaxPrice),
    ];
    const urlPriceKey = `${urlPriceRange[0]}:${urlPriceRange[1]}`;

    // Draft chỉ có hiệu lực khi URL chưa đổi; URL đổi (Apply/back/forward)
    // thì slider tự lấy giá trị mới, không cần setState trong useEffect.
    const [priceDraft, setPriceDraft] = useState({
        key: urlPriceKey,
        range: urlPriceRange,
    });
    const priceRange = priceDraft.key === urlPriceKey ? priceDraft.range : urlPriceRange;

    const handlePriceChange = (range) => {
        setPriceDraft({ key: urlPriceKey, range });
    };

    const urlSize = searchParams.get('size')?.trim() ?? '';
    const urlSizeValue = sizeList.includes(urlSize) ? urlSize : null;
    const urlSizeKey = urlSizeValue ?? '';

    const [sizeDraft, setSizeDraft] = useState({
        key: urlSizeKey,
        value: urlSizeValue,
    });
    const [isSizeOpen, setIsSizeOpen] = useState(true);
    const selectedSize = sizeDraft.key === urlSizeKey ? sizeDraft.value : urlSizeValue;

    const handleSizeClick = (size) => {
        setSizeDraft({
            key: urlSizeKey,
            value: selectedSize === size ? null : size,
        });
    };

    const handleApplyFilter = () => {
        const [minPrice, maxPrice] = priceRange;
        const nextSearchParams = new URLSearchParams(searchParams);

        nextSearchParams.set('minPrice', String(minPrice));
        nextSearchParams.set('maxPrice', String(maxPrice));

        if (selectedSize) {
            nextSearchParams.set('size', selectedSize);
        } else {
            nextSearchParams.delete('size');
        }

        // Đồng bộ draft với URL mới để back/forward không khôi phục lựa chọn cũ
        setSizeDraft({ key: selectedSize ?? '', value: selectedSize });

        // Đổi filter phải quay về trang đầu
        nextSearchParams.set('page', '0');
        setSearchParams(nextSearchParams);
    };

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
                            <h2>Filter</h2>
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
                                onChange={handlePriceChange}
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                            />
                        </div>

                        <div className={styles.divider} />

                        {/* Kích cỡ (Size) */}
                        <div className={styles.filterSection}>
                            <div className={styles.sectionHeader}>
                                <h2>Size</h2>
                                <button
                                    type='button'
                                    className={styles.sectionToggle}
                                    onClick={() => setIsSizeOpen((prev) => !prev)}
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
                                    {sizeList.map((size) => (
                                        <button
                                            key={size}
                                            type='button'
                                            className={`${styles.sizeItem} ${selectedSize === size ? styles.active : ''}`}
                                            aria-pressed={selectedSize === size}
                                            onClick={() => handleSizeClick(size)}
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
                                <h2>Dress Style</h2>
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
                                onClick={handleApplyFilter}
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
                            <ProductList/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Shop;

