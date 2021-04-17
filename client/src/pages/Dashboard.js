import React from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import MenuForm from '../components/MenuForm';
import MenuList from '../components/MenuList';
import MenuPreview from '../components/MenuPreview';

import { UPDATE_ACTIVE_INDEX } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';
import { QUERY_ROLE } from '../utils/queries';

const Dashboard = () => {
    const [state, dispatch] = useStoreContext();
    const { editMode } = state;
    const { data } = useQuery(QUERY_ROLE);

    // redirects unless user is an owner
    // if (!data || data.user.role !== 'owner') {
    //     window.location.replace('/');
    // }

    const handleClick = (index) => {
        if (index === state.activeIndex) {
            // closes menu if active menu is the one clicked
            dispatch({
                type: UPDATE_ACTIVE_INDEX,
                activeIndex: -1
            })
        } else {
            dispatch({
                type: UPDATE_ACTIVE_INDEX,
                activeIndex: index
            });
        }
    };

    return (
        <Segment.Group horizontal>
            <Segment className='dashboard-left'>
                <Accordion fluid styled>

                    <Accordion.Title
                        active={state.activeIndex === 0}
                        onClick={() => handleClick(0)}
                    >
                        <Icon name='dropdown' />
                        Current Menu
                    </Accordion.Title>
                    <MenuList />

                    <Accordion.Title
                        active={state.activeIndex === 1}
                        onClick={() => handleClick(1)}
                        className='form-title'
                    >
                        <Icon name='dropdown' />
                        {editMode ? "Edit" : "Add"} Menu Item
                    </Accordion.Title>
                    <MenuForm index={1} />
                    
                </Accordion>
            </Segment>
            <Segment className='dashboard-right'>
                <MenuPreview />
            </Segment>
        </Segment.Group>
    );
};

export default Dashboard;