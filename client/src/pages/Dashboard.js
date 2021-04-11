import React from 'react';
import { Accordion, Icon, Placeholder, Segment } from 'semantic-ui-react';

import MenuForm from '../components/MenuForm';
import MenuList from '../components/MenuList';

import { UPDATE_ACTIVE_INDEX } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';

const Dashboard = () => {
    const [state, dispatch] = useStoreContext();

    const handleClick = (index) => {
        dispatch({
            type: UPDATE_ACTIVE_INDEX,
            activeIndex: index
        });
    };

    return (
        <Segment.Group horizontal>
            <Segment>
                <Accordion fluid styled>

                    <Accordion.Title
                        active={state.activeIndex === 0}
                        onClick={() => handleClick(0)}
                    >
                        <Icon name='dropdown' />
                        Section 1
                    </Accordion.Title>
                    <MenuList />

                    <Accordion.Title
                        active={state.activeIndex === 1}
                        onClick={() => handleClick(1)}
                    >
                        <Icon name='dropdown' />
                        Section 2
                    </Accordion.Title>
                    <Accordion.Content active={state.activeIndex === 1}>
                        <MenuForm />
                    </Accordion.Content>

                    <Accordion.Title
                        active={state.activeIndex === 2}
                        onClick={() => handleClick(2)}
                    >
                        <Icon name='dropdown' />
                        Section 3
                    </Accordion.Title>
                    <Accordion.Content active={state.activeIndex === 2}>
                        Test content
                    </Accordion.Content>
                    
                </Accordion>
            </Segment>
            <Segment>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Segment>
        </Segment.Group>
    );
};

export default Dashboard;