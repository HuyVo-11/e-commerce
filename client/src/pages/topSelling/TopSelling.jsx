import ProducSection from '../../components/ProductSection/ProductSection.jsx';
import { PRODUCT_TAGS } from '../../constant/masterData.js';
import styles from './TopSelling.module.scss';

const TopSelling = () => {
    return (
        <div className={styles.topSellingWrapper}>
            <ProducSection
                {...PRODUCT_TAGS.POPULAR}
            />
        </div>
    )
}
export default TopSelling;
