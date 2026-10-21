
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';
import styles from './Feedback.module.scss'
import { listFeedback } from '../../constant/masterData';
import useHorizontalScroll from '../../hooks/useHorizontalScroll';

const Feedback = () => {
    const { handleScroll, listRef, scroll, cloneData } = useHorizontalScroll('[data-review-card]', listFeedback)

    return (
        <div className={styles.feedbackWrapper}>
            <div className={styles.feedbackContainer}>
                <div className={styles.feedbackHeader}>
                    <h2>
                        OUR HAPPY CUSTOMERS
                    </h2>
                    <div className={styles.action}>
                        <button className={styles.btn} onClick={() => scroll('left')}>
                            left
                        </button>
                        <button className={styles.btn} onClick={() => scroll('right')}>
                            right
                        </button>
                    </div>
                </div>

                <div className={styles.feedbackList} ref={listRef} onScroll={handleScroll}>
                    {cloneData.map(item => (
                        <FeedbackCard
                            key={item._cloneKey || item.id}
                            feedbacks={item}
                        />
                    ))}
                </div>
            </div>

        </div>

    )
}

export default Feedback;