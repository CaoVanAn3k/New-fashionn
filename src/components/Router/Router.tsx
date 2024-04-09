import Cart from '../../Pages/Cart';
import Home from '../../Pages/Home';
import Pay from '../../Pages/Pay';
import Shop from '../../Pages/Shop';
import DetailShop from '../../Pages/Shop/DetailShop';
import FavouriteShop from '../../Pages/Shop/FavouriteShop';
import Authentication from '../../Pages/Authentication/Authentication';
import OrderHistory from '../../Pages/OrderStatus';

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
        path: '/product/:id',
        component: DetailShop,
    },
    {
        path: '/cart',
        component: Cart,
    },

    {
        path: '/favourite-shop',
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
    {
        path: '/order-history',
        component: OrderHistory,
    },
];
export default RouterPublic;
