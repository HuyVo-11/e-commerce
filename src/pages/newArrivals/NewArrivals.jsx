import ProducSection from '../../components/ProductSection/ProductSection.jsx';

import styles from './NewArrivals.module.scss';

const NewArrivals = () => {
    return (
        <div className={styles.newArrivalsWrapper}>
            <ProducSection
                title="NEW ARRIVALS"
                tag="new"
            />
        </div>
    )
}
export default NewArrivals;
