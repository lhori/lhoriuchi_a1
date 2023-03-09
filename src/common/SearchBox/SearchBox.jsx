// File         : SearchBox.jsx
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 02/25/2023
// Description  : This file contains the search box component used in the search page.

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';

// Function   : SearchBox
// Description: This function is for creating search box component which includes search icon and text input.
// Parameters : placeholder - the gray text that will be shown if any input isn't inside the text input area
//              onChange - function that will be invoked when the user inputs occurs
//              onKeyPress - function that will be invoked when the user press such key
//              searchBarWidth - search bar width
// Returns    : Components to display the search box
const SearchBox = ({placeholder, onChange, onKeyPress, searchBarWidth}) => {
  return (
    <div>
        <SearchIcon sx={{ marginRight: '10px'}}/>
        <Input 
            placeholder={placeholder}
            onChange={onChange}
            onKeyPress={onKeyPress}
            sx={{width: searchBarWidth, color: 'rgba(0, 0, 0, 0.6)', fontSize: 20}}
            />
        
    </div>
  )
}

export default SearchBox