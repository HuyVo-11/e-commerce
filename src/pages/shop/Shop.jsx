import styles from './Shop.module.scss';

const Shop = () => {
    return (
        <div className={styles.wrapper}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <span>Home</span>
                <span className={styles.separator}>&gt;</span>
                <span className={styles.current}>Casual</span>
            </div>

            {/* Container 2 cột */}
            <div className={styles.mainContainer}>
                {/* Cột trái: Bộ lọc (Filter Sidebar) */}
                <div className={styles.filterSidebar}>
                    {/* Header Filters */}
                    <div className={styles.filterHeader}>
                        
                        <div className={styles.filterIcon}>filter</div>
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

                    <div className={styles.divider} />

                    {/* Khoảng giá (Price) */}
                    <div className={styles.filterSection}>
                        <div className={styles.sectionHeader}>
                            <h4>Price</h4>
                            <span className={styles.chevron}>^</span>
                        </div>
                        <div className={styles.priceSlider}>
                            <div className={styles.sliderTrack}>
                                <div className={styles.sliderThumb}></div>
                                <div className={styles.sliderThumb}></div>
                            </div>
                            <div className={styles.priceValues}>
                                <span>$50</span>
                                <span>$200</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.divider} />

                    {/* Màu sắc (Colors) */}
                    <div className={styles.filterSection}>
                        <div className={styles.sectionHeader}>
                            <h4>Colors</h4>
                            <span className={styles.chevron}>^</span>
                        </div>
                        <div className={styles.colorPalette}>
                            <div className={styles.colorItem}></div>
                            <div className={styles.colorItem}></div>
                            <div className={styles.colorItem}></div>
                            <div className={styles.colorItem}></div>
                            <div className={styles.colorItem}></div>
                            <div className={styles.colorItem}></div>
                            <div className={styles.colorItem}></div>
                            <div className={styles.colorItem}></div>
                            <div className={styles.colorItem}></div>
                            <div className={styles.colorItem}></div>
                        </div>
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
                        <h2 className={styles.title}>Casual</h2>
                        <div className={styles.sortWrapper}>
                            <span className={styles.productCount}>Showing 1-10 of 100 Products</span>
                            <div className={styles.sortBy}>
                                <span>Sort by:</span>
                                <span className={styles.selectedSort}>Most Popular</span>
                                <span className={styles.chevron}>v</span>
                            </div>
                        </div>
                    </div>

                    {/* Lưới sản phẩm */}
                    <div className={styles.productGrid}>
                        <div className={styles.productCard}>Product 1</div>
                        <div className={styles.productCard}>Product 2</div>
                        <div className={styles.productCard}>Product 3</div>
                        <div className={styles.productCard}>Product 4</div>
                        <div className={styles.productCard}>Product 5</div>
                        <div className={styles.productCard}>Product 6</div>
                        <div className={styles.productCard}>Product 7</div>
                        <div className={styles.productCard}>Product 8</div>
                        <div className={styles.productCard}>Product 9</div>
                    </div>

                    <div className={styles.divider} />

                    {/* Phân trang (Pagination) */}
                    <div className={styles.pagination}>
                        <div className={styles.prevBtn}>&larr; Previous</div>
                        <div className={styles.pageNumbers}>
                            <div className={styles.pageItem}>1</div>
                            <div className={styles.pageItem}>2</div>
                            <div className={styles.pageItem}>3</div>
                            <div className={styles.pageDots}>...</div>
                            <div className={styles.pageItem}>8</div>
                            <div className={styles.pageItem}>9</div>
                            <div className={styles.pageItem}>10</div>
                        </div>
                        <div className={styles.nextBtn}>Next &rarr;</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;