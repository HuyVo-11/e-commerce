import { paths } from '.';
import Shop from '../pages/shop/Shop'
import OnSale from '../pages/onSale/OnSale';
import NewArrivals from '../pages/newArrivals/NewArrivals';

import Brands from '../pages/brands/Brands';
import LandingPage from '../pages/landingPage/LandingPage';

export const navLinks = [
    {
        path: paths.landingPage,
        component: LandingPage,
        text: 'Home',
    },
    {
        path: paths.shop,
        component: Shop,
        text: 'Shop',
    },
    {
        path: paths.onSale,
        component: OnSale,
        text: 'OnSale',
    },
    {
        path: paths.newArrivals,
        component: NewArrivals,
        text: 'NewArrivals',
    },
    {
        path: paths.brands,
        component: Brands,
        text: 'Brands',
    },
]