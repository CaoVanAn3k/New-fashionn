import Home from '../../Pages/Home';
import Shop from '../../Pages/Shop';

const RouterPublic = () => [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/shop',
        component: Shop,
    },
];
export default RouterPublic;
