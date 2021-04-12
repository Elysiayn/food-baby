import React from 'react';
import { Header, Input } from 'semantic-ui-react'
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

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
        } else {
            dispatch({
                type:UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    };
    };

    return (
        <div className='flex-row'>
            <div>
                <Header size='small'>{item.name}</Header>
                ${item.price}
                <div>
                    <span>Qty: </span>
                    <Input
                        type='number'
                        placeholder='1'
                        value={item.purchaseQuantity}
                        onChange={onChange}
                    /> 
                    <span
                        role='img'
                        aria-label='trash'
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