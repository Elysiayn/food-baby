import React from "react";
import { Link } from "react-router-dom";
import MenuItem from '../../src/components/MenuItem/index';
import { Card, Image, Button, Icon } from 'semantic-ui-react';
import { formatName } from '../utils/helpers';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries"; 

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Menu Items
          </Link>

          {user ? (
            <>
              <h2>Order History for {user.firstName} {user.lastName} </h2>
              {user.orders.map((order) => (
                <div key={order._id} className="Card">
                  <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                  <Card>
                    {order.menuItems.map(({ _id, image, name, price, description }, index) => (
                      <Card key={index}>
                        <Image
                          alt={name}
                          src={`/images/${image}`}
                          />
                        <Card.Content className='menu-cards'>
                          <Card.Header>{formatName(name)}</Card.Header>
                          <Card.Meta>${price}</Card.Meta>
                          <Card.Description>{description}</Card.Description>
                        </Card.Content>
                        {/* <Button animated='fade' onClick={addToCart}>
                          <Button.Content hidden>Add To Order</Button.Content>
                          <Button.Content visible>
                              <Icon name='utensils' />
                          </Button.Content>
                        </Button> */}
                      </Card>
                    ))}
                  </Card>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </>)
  };

export default OrderHistory;