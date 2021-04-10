import React, { useEffect } from 'react';
import { Button, Header, Icon, List, Segment } from 'semantic-ui-react';
import { useLazyQuery } from '@apollo/react-hooks';
import { loadStripe } from '@stripe/stripe-js';

import CartItem from '../CartItem';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART  } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    function toggleCart() {
        dispatch({ type:TOGGLE_CART});
    }
    
    
    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const menuItemIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                menuItemIds.push(item._id);
            }
        });

        getCheckout({
            variables: { menuItems: menuItemIds }
        });
    }

    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          dispatch({ type: ADD_MULTIPLE_TO_CART, menuItems: [...cart] });
        };
    
        if (!state.cart.length) {
          getCart();
        }
      }, [state.cart.length, dispatch]);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    if (!state.cartOpen) {
        return (
            <div className='cart-closed' onClick={toggleCart}>
                <span
                role='img'
                aria-label='takeout'>🥡</span>
            </div>
        );
    }

    return (
        <Segment className='cart'>
            <div className='close' onClick={toggleCart}>[close]</div>
            <Header size='medium' dividing>
                Current Order
            </Header>
            {state.cart.length ? (
            <div className='cart-body'>
                <List as='ol'>
                    {state.cart.map(item => (
                        <List.Item as='li'>
                            <CartItem key={item._id} item={item} />
                        </List.Item>
                    ))}
                </List>
                <div className='flex-row space-between'>
                    <p>

                        <strong>Total: ${calculateTotal()}</strong>
                    </p>
                    <p>
                        {
                            Auth.loggedIn() ?
                            <Button animated='fade' onClick={submitCheckout} id='cart-btn'>
                                <Button.Content hidden>Checkout</Button.Content>
                                <Button.Content visible>
                                    <Icon name='shopping basket' />
                                </Button.Content>
                            </Button>
                            :
                            <span>(log in to check out)</span>
                        }
                    </p>
                </div>
            </div>
            ) : (
                <h3>
                    <span role='img' aria-label='empty plate'>
                    🍽️
                    </span>
                    There's no food in your order yet!
                </h3>
            )}
        </Segment>
    );
};

export default Cart;