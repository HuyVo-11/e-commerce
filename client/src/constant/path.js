import { paths } from '.';
import Shop from '../pages/shop/Shop'
import OnSale from '../pages/onSale/OnSale';
import NewArrivals from '../pages/newArrivals/NewArrivals';

import Brands from '../pages/brands/Brands';
import LandingPage from '../pages/landingPage/LandingPage';

import ck from '../assets/ck.svg';
import gc from '../assets/gc.svg';
import pd from '../assets/pd.svg';
import vs from '../assets/vs.svg';
import zr from '../assets/zr.svg';

import casual from '../assets/casual.svg'
import formal from '../assets/formal.svg'
import party from '../assets/party.svg'
import gym from '../assets/gym.svg'


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

// brand logo
export const brands = [
    {
        image: ck, name: 'Calvin Klein'
    },
    {
        image: gc, name: 'Gucci'
    },
    {
        image: pd, name: 'Prada'
    },
    {
        image: vs, name: 'Versace'
    },
    {
        image: zr, name: 'Zara'
    },
]

export const dressStyles = [
    {
        image: casual, name: 'Casual'
    },
    {
        image: formal, name: 'Formal'
    },
    {
        image: party, name: 'Party'
    },
    {
        image: gym, name: 'Gym'
    },
]
