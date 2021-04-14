import React from "react";
import { Link } from "react-router-dom";
// import MenuItem from '../../src/components/MenuItem/index'; 
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
      <Grid padded stackable columns={2}>
        <Link className="checkout-link" to="/">
          ← Back to Menu Items
        </Link>
          {user ? (
            <>
            <Grid.Row> 
              <h2 className="order" >Order History for {user.firstName} {user.lastName} </h2>
            </Grid.Row>
              {user.orders.map((order) => (
<<<<<<< HEAD
                <div key={order._id} >
                  <h3 className="order" >{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                  {/* <Grid.Column  id='mobile'>  */}
                    <div>
                      <Card.Group className="order-group">
                      {order.menuItems.map(({ _id, image, name, price, description }, index) => (
                        // <Grid.Column>
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
=======
                <div key={order._id} className="my-2">
                  <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                  <div className="flex-row">
                    {order.menuItems.map(({ _id, image, name, price }, index) => (
                      <div key={index} className="card px-1 py-1">
                        <Link to={`/menuItems/${_id}`}>
                          <img
                            alt={name}
                            src={image}
                            />
                            <p>{name}</p>
                        </Link>
                        <div>
                          <span>${price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
>>>>>>> 8170963b84e17fc70ba4dfeae25e2cf47b966920
                </div>
              ))}
            </>
          ) : null}
      </Grid>
    </div>
  </>)
  };

export default OrderHistory;