import ProducSection from '../../components/ProductSection/ProductSection.jsx';
import {PRODUCT_TAGS} from '../../constant/masterData.js'

import styles from './NewArrivals.module.scss';

const NewArrivals = () => {
    return (
        <div className={styles.newArrivalsWrapper}>
            <ProducSection
                {...PRODUCT_TAGS.NEW}
            />
        </div>
    )
}
export default NewArrivals;
