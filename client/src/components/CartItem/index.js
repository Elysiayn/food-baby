import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import firebase from 'firebase';

const CartItem = ({ item } ) => {
    const [,dispatch] = useStoreContext();

    let cartRef = firebase.database().ref('cart');
    cartRef.on('child_added', function(snapshot) {
        let cid = snapshot.key;
    })
    

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', { ...item });
    };

    const onChange = (e) => {
        const value = e.target.value;
        
        if( value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
            idbPromise('cart', 'delete', { ...item });
                let cid = this.item._id;
            firebase.database().ref(`cart/${cid}`).update({
                itemId: item._id
            });
        } else {
            dispatch({
                type:UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
            let cid = this.item._id;
            firebase.database().ref(`cart/${cid}`).update({
                itemId: item._id
            });
        }
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
        </div>
    );
}

export default CartItem;