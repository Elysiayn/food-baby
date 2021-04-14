import React, { useEffect } from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';

import MenuForm from '../components/MenuForm';
import MenuList from '../components/MenuList';
import MenuPreview from '../components/MenuPreview';

import { UPDATE_ACTIVE_INDEX } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';

const Dashboard = () => {
    const [state, dispatch] = useStoreContext();
    const { editMode } = state;

    useEffect(() => {
        const formTitleEl = document.querySelector('.form-title');

        if (editMode) {
            formTitleEl.innerHTML = '<i aria-hidden="true" class="dropdown icon"></i> Edit Menu Item';
        } else {
            formTitleEl.innerHTML = '<i aria-hidden="true" class="dropdown icon"></i> Add Menu Item';
        }

    }, [editMode]);

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
                        Add Menu Item
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