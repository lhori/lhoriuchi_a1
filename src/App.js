// File         : App.js
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 02/24/2023
// Description  : This file contains the top/base page of this application.

import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import { Grid, Container, Typography } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import CustomButtons from "./common/Button/CustomButtons";
import Footer from "./components/NavBar/Footer";

// Function   : App
// Description: This function will display the base page of the application. 
//              Depending on the page location, the welcome page and buttons will not be shown.
// Parameters : None
// Returns    : the components that will show navigation bar, footer, and welcome page texts with button.
function App() {
  const location = useLocation();

  return (
    <div>
      <Grid container>
        <NavBar/>
        <Link to="/search"></Link>
        <Link to="/favourites"></Link>
        <Outlet />
        <Footer/>
      </Grid>


      {/* if the location is not "/" then it will disable everything below */}
      {location.pathname === "/" && (
        <Container maxWidth = "calc{100vw - 250px}">
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography color="#150201" variant="h3">
                Reddit Search App
              </Typography>
            </Grid>
            <Grid item>
            <Typography color="#81b2aa" variant="h5">
                Welcome! Click your options!
            </Typography>
            </Grid>
            <Grid item sx={{marginTop: "10px"}}>
              <Link to="/search"><CustomButtons variant="contained" size="large">Search Reddit</CustomButtons></Link>
              <Link to="/favourites"><CustomButtons variant="contained" size="large" color="secondary" sx={{marginLeft: "10px"}}>See your Favourites</CustomButtons></Link>
            </Grid>
          </Grid>
      </Container>
      )}
    </div>
  );
}

export default App;
