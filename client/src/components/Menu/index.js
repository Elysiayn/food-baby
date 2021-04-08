import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Container } from 'semantic-ui-react';

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
        return state.menuItems.filter(item => item.course.name === courseName);
    };

    return (
        <div>
            <h2>Food Baby Menu</h2>
            {/* DRY by querying categories and looping categories/forEach? */}
            <h3>Appetizers</h3>
            <div>
                <Card.Group>
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
                </Card.Group>
            </div>
            <h3>Mains</h3>
            <div>
                <Card.Group>
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
                </Card.Group>
            </div>
            <h3>Desserts</h3>
            <div>
                <Card.Group>
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
                </Card.Group>
            </div>
            <h3>Drinks</h3>
            <div>
                <Card.Group>
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
                </Card.Group>
            </div>
        </div>
    );
};

export default Menu;