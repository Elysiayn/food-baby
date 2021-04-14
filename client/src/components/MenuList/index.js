import React, { useEffect } from 'react';
import { Accordion, Icon, Table } from 'semantic-ui-react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import { TOGGLE_EDIT_MODE, UPDATE_ACTIVE_INDEX, UPDATE_MENU_ITEM, UPDATE_MENU_LIST } from '../../utils/actions';
import { formatName } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { DELETE_MENU_ITEM } from '../../utils/mutations';
import { QUERY_MENU_ITEM } from '../../utils/queries';

const MenuList = () => {
    const [state, dispatch] = useStoreContext();
    const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);
    const [getMenuItem, { data }] = useLazyQuery(QUERY_MENU_ITEM);

    if (state.menuItems.length < 1) {
        // uses menu saved in localStorage
        const menu = JSON.parse(localStorage.getItem('menuItems'));

        dispatch({ 
            type: UPDATE_MENU_LIST,
            menuItems: menu
        });
    }
    
    useEffect(() => {
        if (data) {
            const { menuItem } = data;

            // remove __typename
            delete menuItem.__typename
            delete menuItem.course.__typename

            dispatch({
                type: UPDATE_MENU_ITEM,
                itemPreview: {
                    ...menuItem,
                    course: menuItem.course.name
                }
            })

            dispatch({
                type: UPDATE_ACTIVE_INDEX,
                activeIndex: 1
            });

            dispatch({
                type: TOGGLE_EDIT_MODE,
                editMode: true
            })
        }
    }, [data, dispatch])

    const handleEdit = event => {
        const id = event.target.getAttribute('data-id');

        getMenuItem({ 
            variables: { _id: id } 
        });
    };

    const handleDelete = event => {
        const id = event.target.getAttribute('data-id');
        deleteMenuItem({ variables: { _id: id } });
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
                    {state.menuItems.map(item => (
                        <Table.Row>
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