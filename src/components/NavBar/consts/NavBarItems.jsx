// File         : NavBarItems.jsx
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 02/24/2023
// Description  : This file contains the constants of navigation bar menu items.

import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';

export const NavBarItems = [
    {
        id: 0,
        icon: <HomeIcon/>,
        label: 'Top',
        route: '',
    },
    {
        id: 1,
        icon: <SearchIcon/>,
        label: 'Search',
        route: 'search',
    },
    {
        id: 2,
        icon: <StarIcon/>,
        label: 'Favourites',
        route: 'favourites',
    }
]