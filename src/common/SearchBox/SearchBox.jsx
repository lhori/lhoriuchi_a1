import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';


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