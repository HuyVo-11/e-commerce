
import ck from '../../assets/ck.svg';
import gc from '../../assets/gc.svg';
import pd from '../../assets/pd.svg';
import vs from '../../assets/vs.svg';
import zr from '../../assets/zr.svg';
import styles from './Banner.module.scss';

const Banner = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>
                        <b>FIND CLOTHES THAT MATCHES YOUR STYLE</b>
                    </h1>
                    <div className={styles.text}>
                        <p>Browse through our diverse range of meticulously
                            crafted garments, designed to bring out your individuality
                            and cater to your sense of style.
                        </p>
                    </div>
                    <button className={styles.shopBtn}>Shop Now</button>
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
                    <div>
                        <img src={ck} alt='Calvon Klein' />
                    </div>
                    <div>
                        <img src={gc} alt='Gucci' />
                    </div>
                    <div>
                        <img src={pd} alt='Prada' />
                    </div>
                    <div>
                        <img src={vs} alt='Versace' />
                    </div>
                    <div>
                        <img src={zr} alt='Zara' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;