import { FaStar } from 'react-icons/fa';

import styles from './FeedbackCard.module.scss';

const FeedbackCard = ({ feedbacks }) => {
    return (
        <div className={styles.wrapper} data-review-card>
            <div className={styles.container}>
                <div className='star'>
                    {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                            key={star}
                            color={star <= Math.round(feedbacks.rating) ? '#FFC633' : '#ccc'}
                        />
                    ))}
                </div>
                <div className={styles.customerName}>
                    {feedbacks.name}
                </div>
                <div className={styles.content}>
                    <p>
                        {feedbacks.feedback}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FeedbackCard;