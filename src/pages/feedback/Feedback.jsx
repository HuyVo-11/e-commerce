
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';
import styles from './Feedback.module.scss'
import { feedbacks } from '../../constant/feedbackData';

const Feedback = () => {
    return (
        <div className={styles.wrapper}>

                <div className={styles.header}>
                    <h2>
                    OUR HAPPY CUSTOMERS
                    </h2>
                </div>
                <div className={styles.list}>
                    {feedbacks.map(item => (
                        <FeedbackCard
                            key={item.id}
                            feedbacks={item}
                        />
                    ))}
                </div>
            </div>

    )
}

export default Feedback;