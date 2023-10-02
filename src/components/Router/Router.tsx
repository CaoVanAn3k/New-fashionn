import Cart from '../../Pages/Cart';
import Home from '../../Pages/Home';
import Pay from '../../Pages/Pay';
import Shop from '../../Pages/Shop';
import DetailShop from '../../Pages/Shop/DetailShop';
import FavouriteShop from '../../Pages/Shop/FavouriteShop';
import Authentication from '../../Pages/Authentication/Authentication';

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
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/favouriteshop',
        component: FavouriteShop,
    },
    {
        path: '/pay',
        component: Pay,
    },
    {
        path: '/login',
        component: Authentication,
    },
    {
        path: '/register',
        component: Authentication,
    },
];
export default RouterPublic;
