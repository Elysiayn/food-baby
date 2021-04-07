import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MENU_ITEMS } from '../../utils/actions';
import { QUERY_ALL_MENU_ITEMS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import MenuItem from '../MenuItem/index';

function Menu() {
    const [state, dispatch] = useStoreContext();
    const { currentCourse } = state; // might not need currentCourse, remove from GlobalState
    const { loading, data } = useQuery(QUERY_ALL_MENU_ITEMS);

    useEffect(() => {
        if (data) {
            dispatch({ 
                type: UPDATE_MENU_ITEMS,
                menuItems: data.menuItems
            });

            // save to indexedDB
            data.menuItems.forEach(item => {
                idbPromise('menuItems', 'put', item);
            });

        }  else if (!loading) {
            idbPromise('menuItems', 'get').then(item => {
                dispatch({
                    type: UPDATE_MENU_ITEMS,
                    menuItems: item
                })
            })
        }
    }, [data, loading, dispatch]);

    function filterMenu(courseName) {
        console.log(state.menuItems)
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
                        name={item.name}
                        price={item.price}
                        description={item.description}
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
                        name={item.name}
                        price={item.price}
                        description={item.description}
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
                        name={item.name}
                        price={item.price}
                        description={item.description}
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
                        name={item.name}
                        price={item.price}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;