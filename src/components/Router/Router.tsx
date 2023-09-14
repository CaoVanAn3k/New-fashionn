import Home from '../../Pages/Home';
import Shop from '../../Pages/Shop';
import DetailShop from '../../Pages/Shop/DetailShop';

const RouterPublic = () => [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/shop',
        component: Shop,
    },
    {
        path: '/detail',
        component: DetailShop,
    },
];
export default RouterPublic;
