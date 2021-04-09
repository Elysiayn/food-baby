import React from "react";

import { Link } from "react-router-dom";
import { Header, Grid } from 'semantic-ui-react';

import Auth from "../../utils/auth";

function Nav() {

  function showNav() {
    if (Auth.loggedIn()) {
      return (
      <>
        <Grid.Column className="navLinks"> 
          <Link to="/orderHistory">
            Order History
          </Link>
        </Grid.Column> 
        
        <Grid.Column className="navLinks"> 
          <a href="/" onClick={() => Auth.logout()}>
            Logout
          </a>
        </Grid.Column>
      </>
      );
    } else {
      return (
      <>
        <Grid.Column className="navLinks">      
          <Link to="/signup">
            Sign-Up
          </Link>
        </Grid.Column>    
      
        <Grid.Column className="navLinks">   
          <Link to="/Login">
            Login
          </Link>
        </Grid.Column>
      </>
      );
    }
  }

  return (
    <Header className="block nav-container"> 
      <Grid className="middle aligned" columns={3} divided>
        <Grid.Row>
          <Grid.Column className="navLinks">  
            <h1>
              <Link to="/">
                <span role="img" aria-label="empty plate">🍽️Nerdy Nummies</span>
              </Link>
            </h1>
          </Grid.Column>  

          {showNav()}

        </Grid.Row>
      </Grid>
    </Header>
  );
}

export default Nav;
