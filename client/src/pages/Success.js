import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {

    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const menuItems = cart.map(item => item._id);

            console.log('==============================', menuItems);

            debugger;
            if (menuItems.length) {
                const { data } = await addOrder({ variables: { menuItems } });
                const menuItemData = data.addOrder.menuItems;

                console.log('====222222222222======', menuItemData);

                menuItemData.forEach(item => {
                    idbPromise('cart', 'delete', item)
                    console.log('====33333333333======', item);

                });

                setTimeout(function() {
                    window.location.assign('/')
                }, 3000);
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