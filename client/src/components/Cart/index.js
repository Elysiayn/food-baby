import React, { useEffect } from 'react';
import { Header, List, Segment } from 'semantic-ui-react';

import CartItem from '../CartItem';
import { idbPromise } from '../../utils/helpers';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART  } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import Auth from '../../utils/auth';
import './style.css';

const Cart = () => {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          dispatch({ type: ADD_MULTIPLE_TO_CART, menuItems: [...cart] });
        };
    
        if (!state.cart.length) {
          getCart();
        }
      }, [state.cart.length, dispatch]);

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
            <div>
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
                            <button>
                                Checkout
                            </button>
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