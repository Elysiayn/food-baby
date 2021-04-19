import React from "react";
import { Link } from "react-router-dom";
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
    <div className="order-container">
      <Grid padded columns={2}>
        <Link className="checkout-link" to="/">
        <p className='menuLink'>← Back to Menu Items</p>
        </Link>
          {user ? (
            <>
            <Grid.Row className="centered"> 
              <h2  className="order" >Order History for {user.firstName} {user.lastName} </h2>
            </Grid.Row>
            <div>
              {user.orders.map((order) => (
                <Card.Group key={order._id}  >
                <div>
                  <h3 className="date" >{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                    <div >
                      <Card.Group className="order-group">
                      {order.menuItems.map(({ image, name, price, description }, index) => (
                          <Card key={index}>
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
                      ))}
                      </Card.Group>
                    </div>
                  </div>
                </Card.Group>
              ))}
            </div>
            </>
          ) : null}
      </Grid>
    </div>
  </>)
  };

export default OrderHistory;