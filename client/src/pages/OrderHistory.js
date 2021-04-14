import React from "react";
import { Link } from "react-router-dom";
import MenuItem from '../../src/components/MenuItem/index';
import { Card, Image, Grid } from 'semantic-ui-react';
import { formatName } from '../utils/helpers';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries"; 

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log(user.orders)
  } 

  return (
    <>
      <Grid className="order-container" padded stackable columns={2}>

        <Link className="checkout-link" to="/">
          ← Back to Menu Items
          </Link>

          {user ? (
            <>
            <Grid.Row>
              <h2>Order History for {user.firstName} {user.lastName} </h2>
            </Grid.Row>
            <Grid.Row>
              {user.orders.map((order) => (
                <div key={order._id} >
                  <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                  {/* <Grid.Column  id='mobile'>  */}
                    <div>
                      {order.menuItems.map(({ _id, image, name, price, description }, index) => (
                        <Grid.Column>
                          <Card className="card-group" key={index}>
                            <Image
                              alt={name}
                              src={image}
                              />
                            <Card.Content className='menu-cards'>
                              <Card.Header>{formatName(name)}</Card.Header>
                              <Card.Meta>${price}</Card.Meta>
                              <Card.Description>{description}</Card.Description>
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                      ))}
                    </div>
                  {/* </Grid.Column>  */}
                </div>
              ))}
            </Grid.Row>
            </>
          ) : null}
        </Grid>
      </>)
  };

export default OrderHistory;