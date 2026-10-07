import { paths } from '.';
import Shop from '../pages/shop/Shop'
import OnSale from '../pages/onSale/OnSale';
import NewArrivals from '../pages/newArrivals/NewArrivals';

import Brands from '../pages/brands/Brands';
import LandingPage from '../pages/landingPage/LandingPage';

// Tất cả các routes của app (dùng trong Router)
export const routes = [
    { path: paths.landingPage, component: LandingPage },
    { path: paths.shop, component: Shop },
    { path: paths.onSale, component: OnSale },
    { path: paths.newArrivals, component: NewArrivals },
    { path: paths.brands, component: Brands },
]

// Chỉ những link hiển thị trên Navbar (không có Home)
export const navLinks = [
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