import React from 'react';
import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { NavBarItems } from './consts/NavBarItems';
import {useNavigate} from 'react-router-dom';


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