// File         : Footer.jsx
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 03/05/2023
// Description  : This file contains the footer component

import React from 'react'
import { Container, Box, Typography, Grid } from '@mui/material';

// Function   : NavBar
// Description: This function will have Box setted as a footer and inside it,
//              it will have the text of the website title and author name.
// Parameters : None
// Returns    : Components to display the footer
const Footer = () => {

    return (
    <Box
    sx={{
      width: "100%",
      height: "auto",
      backgroundColor: "#150201",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      position: "fixed",
      bottom: 0
    }}
  >
    <Container maxWidth = "calc{100vw - 250px}">
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography color="#cee2df" variant="subtitle1">
            Reddit Search App
          </Typography>
          <Typography color="#cee2df" variant="subtitle2">
            {`2023 Created by Luka Horiuchi (8257586)`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
};

export default Footer