import React, { useEffect} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';
import firebase from 'firebase';


function Success() {

    const [addOrder] = useMutation(ADD_ORDER);
    const [state] = useStoreContext();
    
    useEffect(() => {

        async function saveOrder() {
    
            const cart = await idbPromise('cart', 'get');
            const menuItems = cart.map(item => item._id);

            if (menuItems.length) {
                const { data } = await addOrder({ variables: { menuItems } });
                const menuItemData = data.addOrder.menuItems;

                menuItemData.forEach(item => {
                    idbPromise('cart', 'delete', item)
                });      
                
                    setTimeout(function() {
                        window.location.assign('/');
                        
                    }, 3000);
            } else {
                console.log('error');
            }
            
        }
    
        saveOrder();
    }, [addOrder])
    
    firebase.database().ref('orders').push({
        
        firebaseId: state.user._id,
        firstName: state.firstName,
        lastName: state.lastName
    })
   

    return (
        <div>
            <h1>Success!</h1>
            <h2>
                Thank you for your order!
            </h2>
            <h2>
                You will now be redirected to the homepage.
            </h2>
        </div>
    );
}

export default Success;