import Banner from '../banner/Banner';
import DressStyle from '../dressStyle/DressStyle';
import Feedback from '../feedback/Feedback';
import NewArrivals from '../newArrivals/NewArrivals';
import TopSelling from '../topSelling/TopSelling';

import styles from './LandingPage.module.scss'

const LandingPage = () => {
    return (
        <div className={styles.landingPage}>
            <Banner />
            <NewArrivals/>
            <hr className={styles.line}/>
            <TopSelling/>
            <DressStyle/>
            <Feedback/>
        </div>
    );
};

export default LandingPage;
