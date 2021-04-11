import React from 'react';
import { Accordion, Icon, Table } from 'semantic-ui-react';

import { UPDATE_MENU_ITEMS } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';

const MenuList = () => {
    const [state, dispatch] = useStoreContext();

    if (state.menuItems.length < 1) {
        // uses menu saved in localStorage
        const menu = JSON.parse(localStorage.getItem('menuItems'));

        dispatch({ 
            type: UPDATE_MENU_ITEMS,
            menuItems: menu
        });
    }

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
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>${item.price}</Table.Cell>
                            <Table.Cell>{item.course.name}</Table.Cell>
                            <Table.Cell className='edit-cell'>
                                <Icon name='edit' /> 
                                / 
                                <Icon name='delete' />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        </Accordion.Content>
    );
};

export default MenuList;