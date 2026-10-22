import { paths } from '../constant/path';
import Shop from '../pages/shop/Shop'
import OnSale from '../pages/onSale/OnSale';
import NewArrivals from '../pages/newArrivals/NewArrivals';
import LandingPage from '../pages/landingPage/LandingPage';
import Brands from '../pages/brands/Brands';


export const routes = [
    { path: paths.landingPage, component: LandingPage },
    { path: paths.shop, component: Shop },
    { path: paths.onSale, component: OnSale },
    { path: paths.newArrivals, component: NewArrivals },
    { path: paths.brands, component: Brands },
]