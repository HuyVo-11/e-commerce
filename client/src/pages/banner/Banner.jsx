import { brands } from '../../constant/masterData';
import { Link } from "react-router-dom";

import { paths } from '../../constant';

import styles from './Banner.module.scss';

const Banner = () => {
    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.bannerContainer}>
                <div className={styles.bannerContent}>
                    <h1>
                        <b>FIND CLOTHES THAT MATCHES YOUR STYLE</b>
                    </h1>
                    <div className={styles.bannerText}>
                        <p>Browse through our diverse range of meticulously
                            crafted garments, designed to bring out your individuality
                            and cater to your sense of style.
                        </p>
                    </div>
                    <Link to={paths.shop} className={styles.shopBtn}>
                       Shop Now
                    </Link>
                    <div className={styles.qtyWrapper}>
                        <div className={styles.qtyBrands}>
                            <h3>200+</h3>
                            <p>Internation Brands</p>
                        </div>
                        <div className={styles.qtyProducts}>
                            <h3>2000+</h3>
                            <p>High-Quality Products</p>
                        </div>
                        <div className={styles.qtyCustomers}>
                            <h3>30,000+</h3>
                            <p>Happy Customer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.brandWrapper}>
                <div className={styles.brands}>
                   {brands.map(brand => (
                        <div key={brand.name}>
                            <img src={brand.image} alt={brand.name}/>
                        </div>
                   ))}
                </div>
            </div>
        </div>
    )
}

export default Banner;