// File         : CustomButtons.jsx
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 02/24/2023
// Description  : This file contains the customizable mui button component that can be used commonly inside this application.

import React from 'react';
import Button from '@mui/material/Button';

// Function   : CustomButtons
// Description: This function is for creating custom common button for whole application.
// Parameters : children - the text inside the button
//              color - color setting of the button
//              disabled - button state
//              size - button size option
//              variant - button's style setting
//              sx - additional button setting
//              onClick - function that will be invoked when the button is clicked
// Returns    : Components to display the customized button
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