import React, { useState } from 'react';
import { Accordion, Grid, Icon, Segment } from 'semantic-ui-react';

const Dashboard = () => {
    const [activeIndex, setActiveIndex] = useState({ activeIndex: 0 })

    const handleClick = (e, titleProps) => {
        console.log(e)
        const { index } = titleProps;
        const { activeIndex } = activeIndex;
        const newIndex = activeIndex === index ? -1 : index;

        setActiveIndex({ activeIndex: newIndex });
    } 

    return (
        <Segment.Group horizontal>
            <Segment>
                <Accordion fluid styled>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={() => handleClick()}
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
                        onClick={() => handleClick()}
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
                        onClick={() => handleClick()}
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
                {/* <Grid.Column>
                    Test
                </Grid.Column> */}
            </Segment>
        </Segment.Group>
    );
};

export default Dashboard;