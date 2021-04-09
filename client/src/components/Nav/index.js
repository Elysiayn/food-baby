import React from "react";

import { Link } from "react-router-dom";
import { Header, Grid, List } from 'semantic-ui-react';

import Auth from "../../utils/auth";

function Nav() {

  function showNav() {
    if (Auth.loggedIn()) {
      return (

          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/orderHistory">
                OrderHistory
              </Link>
            </li>
            <li className="mx-1">
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </li>
          </ul>
      );
    } else {
      return (
      <List divided horizontal>  
        {/* <Grid.Column>       */}
          {/* <List divided horizontal> */}
          <List.Item>   
            <Link to="/signup">
              Sign Up
            </Link>
          </List.Item>  
          {/* </List>  */}
        {/* </Grid.Column>     */}
      
        {/* <Grid.Column>    */}
          {/* <List divided horizontal>  */}
          <List.Item>  
            <Link to="/Login">
              Login
            </Link>
          </List.Item>  
          {/* </List>  */}
        {/* </Grid.Column>     */}
      </List>
      );
    }
  }

  return (
    <Header className="block nav-container"> 
      <Grid columns={3} divided>
        <Grid.Row>
          {/* <Grid.Column>   */}
            <h1>
              <Link to="/">
                <span role="img" aria-label="empty plate">🍽️N</span>
              </Link>
            </h1>
          {/* </Grid.Column>   */}

          {/* <Grid.Column>     */}
            {/* <nav>   */}
              {/* <Grid.Column>    */}
                {showNav()}
              {/* </Grid.Column>    */}
            {/* </nav>   */}
            {/* </Grid.Column>      */}
        </Grid.Row>
      </Grid>
    </Header>
  );
}

export default Nav;
