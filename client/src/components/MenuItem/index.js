import React from 'react';
import { Card, Image, Button, Icon } from 'semantic-ui-react';

import { useStoreContext } from '../../utils/GlobalState';
import { formatName } from '../../utils/helpers';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function MenuItem(item) {
    const {
        _id,
        name,
        image,
        price,
        description  
    } = item;

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

    return (
        <Card>
            <Image ui={false} wrapped src={image} />
            <Card.Content>
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