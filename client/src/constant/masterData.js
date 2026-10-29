import ck from '../assets/ck.svg';
import gc from '../assets/gc.svg';
import pd from '../assets/pd.svg';
import vs from '../assets/vs.svg';
import zr from '../assets/zr.svg';

import casual from '../assets/casual.svg'
import formal from '../assets/formal.svg'
import party from '../assets/party.svg'
import gym from '../assets/gym.svg'


export const listFeedback = [
    {
        id: 'FB001',
        name: 'Sarah M.',
        rating: 5,
        feedback: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
        verified: true,
    },
    {
        id: 'FB002',
        name: 'Alex K.',
        rating: 5,
        feedback: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
        verified: true,
    },
    {
        id: 'FB003',
        name: 'James L.',
        rating: 5,
        feedback: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
        verified: true,
    },
    {
        id: 'FB004',
        name: 'Emily R.',
        rating: 4,
        feedback: "The fit is perfect and the material feels luxurious without breaking the bank. Fast shipping and great customer service as well!",
        verified: true,
    },
    {
        id: 'FB005',
        name: 'Michael B.',
        rating: 5,
        feedback: "Exceptional quality! The attention to detail in their products is impressive. I've already recommended Shop.co to all my friends.",
        verified: true,
    },
];


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
export const PRODUCT_TAGS = {
    NEW: {
        tag: 'new',
        title: 'NEW ARRIVALS'
    },
    POPULAR: {
        tag: 'popular',
        title: 'TOP SELLING'
    },
    ONSALE: {
        tag: 'sale',
        title: 'ONSALE'
    },
};
