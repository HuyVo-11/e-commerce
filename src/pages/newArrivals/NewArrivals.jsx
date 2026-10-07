
import ProductCard from '../../components/productCard/ProductCard';
import styles from './NewArrivals.module.scss';

const NewArrivals = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>New Arrivals</h2>
            </div>

            <div className={styles.displayCard}>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            </div>

            <div className={styles.btnWrapper}>
                <button className={styles.btn}>
                    <p>View All</p>
                </button>
            </div>
        </div>
    )
}
export default NewArrivals ;