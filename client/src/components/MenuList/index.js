import React from 'react';
import { Accordion, Icon, Table } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { UPDATE_MENU_ITEMS } from '../../utils/actions';
import { formatName } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { DELETE_MENU_ITEM } from '../../utils/mutations';

const MenuList = () => {
    const [state, dispatch] = useStoreContext();
    const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);

    if (state.menuItems.length < 1) {
        // uses menu saved in localStorage
        const menu = JSON.parse(localStorage.getItem('menuItems'));

        dispatch({ 
            type: UPDATE_MENU_ITEMS,
            menuItems: menu
        });
    }

    const handleDelete = (event) => {
        const id = event.target.getAttribute('data-id');
        deleteMenuItem({ variables: {_id: id } });
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
                                <Icon name='edit' /> 
                                / 
                                <Icon name='delete' data-id={item._id} onClick={handleDelete} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        </Accordion.Content>
    );
};

export default MenuList;