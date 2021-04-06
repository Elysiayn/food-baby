import React from 'react';
import CartItem from '../CartItem';
import './style.css';
import { TOGGLE_CART } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import Auth from '../../utils/auth';
import admin from 'firebase-admin';

const Cart = () => {
    const [state, dispatch] = useStoreContext();

    let registrationToken = 'cxI26L__jA7scTWwuCgJuF:APA91bGsJejZfWcibwtZS9vtKyglxb7NGXzB_NuO3avVwTez-naNbUEEP08vRUUwr57PwN31i76RHhJ2HUjYov1e-cXTssDmfecar1xbWesyqCB8UehH7H8JxqWICqFDwtw_3LLCaecT'
    let message = {
        data: {
            facts: "bears eat beets",
            opinion: "which bear is best"
        },
        token: registrationToken
    };

    function toggleCart() {
        dispatch({ type:TOGGLE_CART});

        admin.messaging().send(message)
            .then((response) => {
                // response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error)
            });
    };

    if (!state.cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span
                role="img"
                aria-label="trash">🛒</span>
            </div>
        );
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }
    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
            <div>
                {state.cart.map(item => (
                <CartItem key={item.id} item={item} />
                ))}
                <div className="flex-row space-between">
                    <strong>Total: ${calculateTotal()}</strong>
                    {
                        Auth.loggedIn() ?
                        <button>
                            Checkout
                        </button>
                        :
                        <span>(log in to check out</span>
                    }
                </div>
            </div>
            ) : (
                <h3>
                    <span role="img" aria-label="shocked">
                    😱
                    </span>
                    There's no food in your cart yet!
                </h3>
            )}
            <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js"></script>
        </div>
        
    );
};

export default Cart;