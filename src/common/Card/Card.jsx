// File         : CommonCard.jsx
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 02/28/2023
// Description  : This file contains the card component that can be used commonly inside this application.
import React from 'react';
import {Card, CardContent} from '@mui/material';

// Function   : CommonCard
// Description: This function to create common card component that can be used through this application.
// Parameters : header - the header part of the card
//              content - content that will be displayed inside the card
// Returns    : Components to display the customized common card
const CommonCard = ({header, content}) => {
  return (
    <Card>
        {header}
            <CardContent>
                {content}
            </CardContent>
    </Card>
  )
}

export default CommonCard