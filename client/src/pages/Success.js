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
               
                const purchaseDate = parseInt(data.addOrder.purchaseDate);
                const orderTime = new Date (purchaseDate)
                const completionTime = new Date(purchaseDate);
                completionTime.setMinutes( completionTime.getMinutes() + 30 )

                

                menuItemData.forEach(item => {
                    idbPromise('cart', 'delete', item)
                    // console.log('====33333333333======', item);

                });
                
                console.log(state.user)
                const firstName = state.user.firstName;
                const firebaseId = state.user._id;
                const lastName = state.user.lastName;
    

                firebase.database().ref('orders').push({
                    firebaseId,
                    firstName,
                    lastName,
                    menuItems,
                    purchaseDate: orderTime,
                    orderReady: completionTime
                })  

                setTimeout(function() {
                    window.location.assign('/')
                }, 3000);
            } else {
                console.log('error');
            }
            
        }
        
        saveOrder();
    }, [addOrder])

  

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
};

export default Success;


// , {`${user.firstName}`}