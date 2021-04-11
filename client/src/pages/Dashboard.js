import React, { useState } from 'react';
import { Accordion, Icon, Placeholder, Segment } from 'semantic-ui-react';

const Dashboard = () => {
    const [active, setActive] = useState({ activeIndex: 0 });
    const { activeIndex } = active;

    const handleClick = (index) => {
        setActive({ activeIndex: index });
    };

    return (
        <Segment.Group horizontal>
            <Segment>
                <Accordion fluid styled>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={() => handleClick(0)}
                    >
                        <Icon name='dropdown' />
                        Section 1
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        Test content
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={() => handleClick(1)}
                    >
                        <Icon name='dropdown' />
                        Section 2
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        Test content
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={() => handleClick(2)}
                    >
                        <Icon name='dropdown' />
                        Section 3
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
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