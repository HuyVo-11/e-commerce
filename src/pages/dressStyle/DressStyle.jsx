
import { dressStyles } from '../../constant/path';

import styles from './DressStyle.module.scss'

const DressStyle = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>BROWSE BY DRESS STYLE</h2>
                </div>

                <div className={styles.imgWrapper}>
                    <div className={styles.imgItems}>
                        {dressStyles.map(dressStyle => (
                            <div key={dressStyle.name} className={styles.imgCard}>
                                <img src={dressStyle.image} alt={dressStyle.name}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DressStyle;