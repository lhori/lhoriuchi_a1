import React from 'react'
import { Container, Box, Typography, Grid } from '@mui/material';
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