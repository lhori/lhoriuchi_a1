// File         : NavBar.jsx
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 02/24/2023
// Description  : This file contains the navigation bar component logic.

import React from 'react';
import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { NavBarItems } from './consts/NavBarItems';
import {useNavigate} from 'react-router-dom';

// Function   : NavBar
// Description: This function will have drawer setted up as a left navigation bar.
//              It has the list of menu items as list items.
// Parameters : None
// Returns    : Components to display the navigation bar
const NavBar = () => {
    const navigate = useNavigate();
    const drawerWidth = 250;
    return (
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#150201',
            color: '#cee2df'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {NavBarItems.map((item, index) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => navigate(item.route)}>
                <ListItemIcon sx={{color:'#cee2df'}}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
}

export default NavBar