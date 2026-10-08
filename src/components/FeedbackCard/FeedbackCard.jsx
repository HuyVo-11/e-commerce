import { FaStar } from 'react-icons/fa';

import styles from './FeedbackCard.module.scss';

const FeedbackCard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.star}>
                    <FaStar/>
                </div>
                <div className={styles.customerName}>
                    Sarah M.
                </div>
                <div className={styles.content}>
                    "I'm blown away by the quality and style of the clothes I received from Shop.co.
                     From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                </div>
            </div>
        </div>
    )
}

export default FeedbackCard;