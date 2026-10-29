import { paths } from './path';
// import Shop from '../pages/shop/Shop'
import OnSale from '../pages/onSale/OnSale';
import NewArrivals from '../pages/newArrivals/NewArrivals';

import Brands from '../pages/brands/Brands';

export const navLinks = [
    {
        path: paths.shop,
        // component: Shop,
        text: 'Shop',
    },
    {
        path: paths.onSale,
        component: OnSale,
        text: 'OnSales',
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