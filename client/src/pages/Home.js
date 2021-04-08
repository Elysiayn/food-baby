import React from 'react'; 
import { Container, Grid, Segment } from 'semantic-ui-react';

import Cart from '../components/Cart';
import Menu from '../components/Menu';

const Home = () => {
    return (
        // <div className='container'>

        <Grid stackable columns={2}>
            <Grid.Column>
                {/* <Segment> */}
                    <Menu />
                {/* </Segment> */}
            </Grid.Column>
            <Grid.Column>
                <Segment>
                    <Cart />
                </Segment>
            </Grid.Column>
        </Grid>
        // </div>
    );
};

export default Home;