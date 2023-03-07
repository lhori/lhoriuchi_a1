import React from 'react';
import Button from '@mui/material/Button';

export const CustomButtons = ({children, color, disabled, size, variant, sx, onClick}) => {
  return (
    <Button
        disabled = {disabled}
        size = {size}
        color = {color}
        variant = {variant}
        sx = {sx}
        onClick={onClick}>

     {children}
    </Button>
  )
}

export default CustomButtons