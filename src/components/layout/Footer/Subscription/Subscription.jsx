import { FaEnvelope } from "react-icons/fa";

import styles from './Subscription.module.scss'

const Subscription = () => {
    return (
        <div className={styles.subscriptionContainer}>
            <div className={styles.headerWrapper}>
                <div className={styles.header}>
                    <h3>
                        STAY UP TO DATE ABOUT OUR LATEST OFFERS
                    </h3>
                </div>
            </div>

            <div className={styles.subContainerWrapper}>
                <div className={styles.subContainer}>
                    <div className={styles.emailInputWrapper}>
                        <FaEnvelope className={styles.inputIcon} />
                        <input
                            className={styles.emailInput}
                            type='text'
                            placeholder='Enter your email address'
                        />
                    </div>

                    {/* subs btn */}
                    <button
                        className={styles.btn}
                    >
                        <p>Subscribe to Newlestter</p>
                    </button>
                </div>
            </div>

        </div>


    )
}

export default Subscription;