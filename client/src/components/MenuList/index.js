import React from 'react';
import { Accordion, Icon, Table } from 'semantic-ui-react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import { TOGGLE_EDIT_MODE, UPDATE_ACTIVE_INDEX, UPDATE_MENU_ITEM, UPDATE_MENU_LIST } from '../../utils/actions';
import { formatName, idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { DELETE_MENU_ITEM } from '../../utils/mutations';
import { QUERY_MENU_ITEM } from '../../utils/queries';

const MenuList = () => {
    const [state, dispatch] = useStoreContext();
    const { menuItems } = state

    const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);
    const [getMenuItem] = useLazyQuery(QUERY_MENU_ITEM, { onCompleted: data => {
        const { menuItem } = data;

        // remove __typename from menuItem object
        delete menuItem.__typename
        delete menuItem.course.__typename

        dispatch({
            type: UPDATE_MENU_ITEM,
            itemPreview: {
                ...menuItem,
                course: menuItem.course.name
            }
        });

        dispatch({
            type: UPDATE_ACTIVE_INDEX,
            activeIndex: 1
        });

                
        dispatch({
            type: TOGGLE_EDIT_MODE,
            editMode: true
        });
    }});

    if (menuItems.length < 1) {

        idbPromise('menuItems', 'get').then(list => {
            dispatch({
                type: UPDATE_MENU_LIST,
                menuItems: list
            });
        });
    }
    
    const handleEdit = event => {
        const id = event.target.getAttribute('data-id');

        console.log('clicked')

        getMenuItem({ 
            variables: { _id: id },
        });
    };

    const handleDelete = event => {
        const id = event.target.getAttribute('data-id');
        deleteMenuItem({ variables: { _id: id } });

        const filteredList = menuItems.filter(item => item._id !== id);
        
        dispatch ({
            type: UPDATE_MENU_LIST,
            menuItems: filteredList
        });

        idbPromise('menuItems', 'delete', { _id: id });
    };

    return (
        <Accordion.Content active={state.activeIndex === 0}>
            <Table striped selectable compact>
                <Table.Header>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Course</Table.HeaderCell>
                    <Table.HeaderCell className='edit-cell'>Edit / Delete</Table.HeaderCell>
                </Table.Header>

                <Table.Body>
                    {menuItems.map(item => (
                        <Table.Row key={item._id}>
                            <Table.Cell>{formatName(item.name)}</Table.Cell>
                            <Table.Cell>${item.price}</Table.Cell>
                            <Table.Cell>{item.course.name}</Table.Cell>
                            <Table.Cell className='edit-cell'>
                                <Icon className='edit-btn' name='edit' data-id={item._id} onClick={handleEdit} /> 
                                / 
                                <Icon className='delete-btn' name='delete' data-id={item._id} onClick={handleDelete} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        </Accordion.Content>
    );
};

export default MenuList;