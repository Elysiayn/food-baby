import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import firebase from 'firebase';

const CartItem = ({ item } ) => {
    const [,dispatch] = useStoreContext();

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', { ...item });
    };

    const onChange = (e) => {
        const value = e.target.value;

        if( value < 1) {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
            idbPromise('cart', 'delete', { ...item });
                
            firebase.database().ref(`cart/${item._id}`).update({
                itemId: item._id
            });
        } else {
            dispatch({
                type:UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
            
            firebase.database().ref(`cart/${item._id}`).update({
                itemId: item._id
            });
            
            firebase.onMessage = function ( payload ) {
                console.log('check')
                console.log('Notifications received.', payload);
                if (payload.notification) {
                    // If notifications are supported on this browser we display one.
                    if (window.Notification instanceof Function) {
                      // This displays a notification if notifications have been granted.
                      new Notification(payload.notification.title, payload.notification);
                    }
            }
           
        }
    };
    };

    return (
        <div className="flex-row">
            <div>
                <img
                    src={`/images/${item.image}`}
                    alt=""
                />
            </div>
            <div>
                <div>{item.name}, ${item.price}</div>
                <div>
                    <span>Qty:</span>
                    <input
                        type="number"
                        placeholder="1"
                        value={item.purchaseQuantity}
                        onChange={onChange}
                    />
                    <span
                        role="img"
                        aria-label="trash"
                        onClick={()=> removeFromCart(item)}
                    >
                     🗑️
                    </span>
                </div>
            </div>
            <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js"></script>
        </div>
    );
}

export default CartItem;