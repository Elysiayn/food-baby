import React, { useEffect } from 'react';
import { idbPromise } from "../../utils/helpers";
import CartItem from '../CartItem';
// import './style.css';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART  } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import Auth from '../../utils/auth';

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
            <div className="cart-closed" onClick={toggleCart}>
                <span
                role="img"
                aria-label="takeout">🥡</span>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Current Order</h2>
            {state.cart.length ? (
            <div>
                {state.cart.map(item => (
                <CartItem key={item._id} item={item} />
                ))}
                <div className="flex-row space-between">
                    <strong>Total: ${calculateTotal()}</strong>
                    {
                        Auth.loggedIn() ?
                        <button>
                            Checkout
                        </button>
                        :
                        <span>(log in to check out)</span>
                    }
                </div>
            </div>
            ) : (
                <h3>
                    <span role="img" aria-label="empty plate">
                    🍽️
                    </span>
                    There's no food in your order yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;