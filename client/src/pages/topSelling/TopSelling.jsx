import ProducSection from '../../components/ProductSection/ProductSection.jsx';
import styles from './TopSelling.module.scss';

const TopSelling = () => {
    return (
        <div className={styles.topSellingWrapper}>
            <ProducSection
                title="TOP SELLING"
                tag="popular"
            />
        </div>
    )
}
export default TopSelling;
