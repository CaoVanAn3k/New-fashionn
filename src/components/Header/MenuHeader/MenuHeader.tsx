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

import { Link } from 'react-router-dom';
import images from '../../Images';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
const drawerWidth = 240;
const cx = classNames.bind(styles);

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//     open?: boolean;
// }>(({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginRight: -drawerWidth,
//     ...(open && {
//         transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginRight: 0,
//     }),
//     position: 'relative',
// }));

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
    },
    {
        title: 'Cửa hàng',
        icon: <ShoppingCartIcon />,
    },
    {
        title: 'Thông tin',
        icon: <AssignmentIcon />,
    },
    {
        title: 'Tìm kiếm',
        icon: <SearchIcon />,
    },
    {
        title: 'Hi,Hiếu',
        icon: <AccountCircleIcon />,
    },
    {
        title: 'Lịch sử mua hàng',
        icon: <SearchIcon />,
    },

    {
        title: 'Login out',
        icon: <AccountCircleIcon />,
    },
];
export default function MenuHeader() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={cx('menu-header')}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
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
                    <List>
                        {MenuItem.map((text, index) => (
                            <div key={index}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon className={cx('title-icon-button')}>{text.icon}</ListItemIcon>
                                        <ListItemText className={cx('icon-button-text')} primary={text.title} />
                                        {index > 4 ? (
                                            ''
                                        ) : (
                                            <IconButton className={cx('icon-button-next')}>
                                                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                            </IconButton>
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </div>
    );
}
