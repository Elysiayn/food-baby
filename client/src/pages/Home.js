import React, { createRef } from 'react'; 
import { Grid, Segment, Rail, Sticky, Ref } from 'semantic-ui-react';

import Cart from '../components/Cart';
import Menu from '../components/Menu';

const Home = () => {
    const contextRef = createRef();
    
    return (
        <Grid stackable columns={2}>
            <Grid.Column id='mobile'>
                <Ref innerRef={contextRef}>
                    <Segment className="menu">
                        <Menu />
                        <Cart cartId='overlay' />
                        <Rail position='right'>
                            <Sticky context={contextRef}>
                                <Cart cartId='sidebar' />
                            </Sticky>
                        </Rail>
                    </Segment>
                </Ref>
            </Grid.Column>
        </Grid>
    );
};

export default Home;