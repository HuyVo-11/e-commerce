
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';
import styles from './Feedback.module.scss'

const Feedback = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                OUR HAPPY CUSTOMERS
            </div>
            <div>
                <FeedbackCard/>
            </div>
        </div>
    )
}

export default Feedback;