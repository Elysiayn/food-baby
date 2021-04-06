import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MENU_ITEMS } from '../../utils/actions';
import { QUERY_MENU_ITEMS } from '../../utils/queries' // not written yet
import { MenuItem } from '../MenuItem/index';

function Menu() {
    const [state, dispatch] = useStoreContext();
    const { currentCourse } = state; // might not need, remove from GlobalState
    const { loading, data } = useQuery(QUERY_MENU_ITEMS); // not written yet

    useEffect(() => {
        if (data) {
            dispatch({ 
                type: UPDATE_MENU_ITEMS,
                menuItems: data.menuItems
            });
        } 
    })
    // need to add IDB save

    function filterMenu(courseName) {
        return state.menuItems.filter(item => item.course.name === courseName);
    };

    return (
        <div>
            <h2>Food Baby Menu</h2>
            {/* DRY by querying categories and looping categories/forEach? */}
            <h3>Appetizers</h3>
            <div>
                {filterMenu('appetizers').map(item => (
                    <MenuItem
                        key={item._id}
                        _id={item._id}
                        image={item.image}
                        name={item.price}
                        price={item.price}
                    />
                ))}
            </div>
            <h3>Mains</h3>
            <div>
                {filterMenu('mains').map(item => (
                    <MenuItem
                        key={item._id}
                        _id={item._id}
                        image={item.image}
                        name={item.price}
                        price={item.price}
                    />
                ))}
            </div>
            <h3>Desserts</h3>
            <div>
                {filterMenu('desserts').map(item => (
                    <MenuItem
                        key={item._id}
                        _id={item._id}
                        image={item.image}
                        name={item.price}
                        price={item.price}
                    />
                ))}
            </div>
            <h3>Drinks</h3>
            <div>
                {filterMenu('drinks').map(item => (
                    <MenuItem
                        key={item._id}
                        _id={item._id}
                        image={item.image}
                        name={item.price}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;