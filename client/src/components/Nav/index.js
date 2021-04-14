import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { Header, Grid } from 'semantic-ui-react';

import Auth from "../../utils/auth";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_USER } from '../../utils/actions';
import { QUERY_USER } from '../../utils/queries';
import Permission from '../Permission';

function Nav() {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(QUERY_USER);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_USER,
                user: data.user
            })
        }
    }, [data, loading, dispatch]);

    

    function showNav() {
        switch (true) {
            case (state.user.role ===  'user'):
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
                        <Permission />
                    </>
                );
            case (state.user.role === 'owner'):
                return (
                    <>
                        <Grid.Column className="navLinks"> 
                            <Link to="/dashboard">
                                Owner Dashboard
                            </Link>
                        </Grid.Column> 
                        
                        <Grid.Column className="navLinks"> 
                            <a href="/" onClick={() => Auth.logout()}>
                                Logout
                            </a>
                        </Grid.Column>
                    </>
                );
            default: 
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
	};

    return (
        <Header className="block nav-container"> 
            <Grid className="middle aligned" columns={3} divided>
                <Grid.Row className='navBar'>
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
};

export default Nav;