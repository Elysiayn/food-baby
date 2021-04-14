import React, { useEffect }  from 'react';
import { Card, Image, Button, Icon } from 'semantic-ui-react';

import {useQuery } from '@apollo/react-hooks';

import { useStoreContext } from '../../utils/GlobalState';
import { formatName, idbPromise } from '../../utils/helpers';
import { ADD_TO_CART, UPDATE_CART_QUANTITY, UPDATE_MENU_LIST } from '../../utils/actions';
import { QUERY_MENU_ITEM } from '../../utils/queries';

function MenuItem(item) {
    const {
        _id,
        name,
        image,
        price,
        description  
    } = item;

    const { loading, data } = useQuery(QUERY_MENU_ITEM);

    const [state, dispatch] = useStoreContext();
    const { cart } = state;

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id);

        // if there was an item in cart, update purchase qty
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });

            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                menuItem: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart','put', { ...item, purchaseQuantity: 1 });
        }
    };

    // 
    useEffect(() => {
      // if there's data to be stored
      if (data) {
        //  store's in the global state object
        dispatch ({
            type: UPDATE_MENU_LIST,
            menuItems: data.menuItems
        });
        // takes each item and saves it to IndexDB
        data.menuItems.forEach((menuItem) => {
            idbPromise('menuItems', 'put', menuItem);
        });
      } else if (!loading) {
        idbPromise('menuItems', 'get').then((menuItems) => {
            dispatch({
                type: UPDATE_MENU_LIST,
                menuItems: menuItems
            });
        });
      }
    }, [data, loading, dispatch]);

    return (
        <Card>
            <Image ui={false} wrapped src={image} />
            <Card.Content className='menu-cards'>
                <Card.Header>{formatName(name)}</Card.Header>
                <Card.Meta>${price}</Card.Meta>
                <Card.Description>{description}</Card.Description>
            </Card.Content>
            <Button animated='fade' onClick={addToCart}>
                <Button.Content hidden>Add To Order</Button.Content>
                <Button.Content visible>
                    <Icon name='utensils' />
                </Button.Content>
            </Button>
        </Card>
    );
};

export default MenuItem