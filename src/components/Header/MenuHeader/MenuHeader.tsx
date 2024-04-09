import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './MenuHeader.module.scss';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import images from '../../Images';
import { upStatusSearch, clearSearching } from '../../../redux/products/products';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import SearchHeader from '../SearchHeader/SearchHeader';
const drawerWidth = 240;
const cx = classNames.bind(styles);

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const MenuItem = [
    {
        title: 'Trang chủ',
        icon: <HomeIcon />,
        link: '/',
    },
    {
        title: 'Cửa hàng',
        icon: <ShoppingCartIcon />,
        link: '/shop',
    },
    {
        title: 'Thông tin',
        icon: <AssignmentIcon />,
        link: '/',
    },
    {
        title: 'Tìm kiếm',
        icon: <SearchIcon />,
        link: '/',
    },
    {
        title: 'Hi,Hiếu',
        icon: <AccountCircleIcon />,
        link: '/',
    },
    {
        title: 'Lịch sử mua hàng',
        icon: <SearchIcon />,
        link: '/',
    },

    {
        title: 'Login out',
        icon: <AccountCircleIcon />,
        link: '/',
    },
];

interface Children {
    handleSearchOn: () => void;
}
const MenuHeader: React.FC<Children> = ({ handleSearchOn }) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { statusSearch } = useAppSelector((state) => state.products);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleStatusSearch = () => {
        dispatch(upStatusSearch(true));
        handleSearchOn();
        setOpen(false);
    };
    const handleSearchOffMenu = () => {
        dispatch(clearSearching());
    };

    return (
        <div className={cx('menu-header')}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} className={cx('menu-app-bar')}>
                    <div className={cx('menu-list-bar')}>
                        <Toolbar>
                            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                                <div className={cx('menu-main-left')}>
                                    <Link to="/" className={cx('menu-left-body')}>
                                        <div className={cx('menu-left-logo')}>
                                            <img src={images.logo} alt={images.logo} />
                                        </div>
                                        <div className={cx('menu-left-title')}>
                                            <h3>Bich Thuan Stote</h3>
                                        </div>
                                    </Link>
                                </div>
                            </Typography>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerOpen}
                                sx={{ ...(open && { display: 'none', flexGrow: 1 }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </div>
                </AppBar>

                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                >
                    <DrawerHeader className={cx('icon-button')}>
                        <IconButton onClick={handleDrawerClose} className={cx('icon-button-close')}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>

                    <Divider />
                    <List className={cx('menu-link-list')}>
                        {MenuItem.map((text, index) => (
                            <div key={index}>
                                {text.title === 'Tìm kiếm' ? (
                                    <div
                                        onClick={() => {
                                            handleStatusSearch();
                                        }}
                                    >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon className={cx('title-icon-button')}>
                                                    {text.icon}
                                                </ListItemIcon>
                                                <ListItemText className={cx('icon-button-text')} primary={text.title} />
                                                {index > 4 ? (
                                                    ''
                                                ) : (
                                                    <IconButton className={cx('icon-button-next')}>
                                                        {theme.direction === 'rtl' ? (
                                                            <ChevronLeftIcon />
                                                        ) : (
                                                            <ChevronRightIcon />
                                                        )}
                                                    </IconButton>
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    </div>
                                ) : (
                                    <li
                                        onClick={() => {
                                            handleDrawerClose();
                                            navigate(text.link);
                                        }}
                                    >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon className={cx('title-icon-button')}>
                                                    {text.icon}
                                                </ListItemIcon>
                                                <ListItemText className={cx('icon-button-text')} primary={text.title} />
                                                {index > 4 ? (
                                                    ''
                                                ) : (
                                                    <IconButton className={cx('icon-button-next')}>
                                                        {theme.direction === 'rtl' ? (
                                                            <ChevronLeftIcon />
                                                        ) : (
                                                            <ChevronRightIcon />
                                                        )}
                                                    </IconButton>
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    </li>
                                )}
                            </div>
                        ))}
                    </List>
                </Drawer>
            </Box>
            {statusSearch && (
                <div className={cx('header-main-search')}>
                    <SearchHeader handleSearchOffMenu={handleSearchOffMenu} />
                </div>
            )}
        </div>
    );
};
export default MenuHeader;
