import Banner from '../banner/Banner';
import DressStyle from '../dressStyle/dressStyle';
import Feedback from '../feedback/Feedback';
import NewArrivals from '../newArrivals/NewArrivals';
import TopSelling from '../topSelling/topSelling';

const LandingPage = () => {
    return (
        <div>
            <Banner />
            <NewArrivals/>
            <TopSelling/>
            <DressStyle/>
            <Feedback/>
        </div>
    );
};

export default LandingPage;
