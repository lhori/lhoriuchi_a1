import React from 'react';
import {Card, CardContent} from '@mui/material';

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