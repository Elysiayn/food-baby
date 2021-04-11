import React from 'react';
import { Accordion, Button, Form, Icon } from 'semantic-ui-react';

import { UPDATE_CURRENT_MENU_ITEM } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';

const MenuForm = (props) => {
    const [state, dispatch] = useStoreContext();
    const { index } = props;

    const courses = [
        { key: '0', value: 'appetizers', text: 'appetizers' },
        { key: '1', value: 'mains', text: 'mains' },
        { key: '2', value: 'desserts', text: 'desserts' },
        { key: '3', value: 'drinks', text: 'drinks' }
    ]

    const renderMenu = () => {
        if (index === 1) {
            return (
                <div>
                    This is index 1.
                </div>
            );
        } else if (index === 2) {
            return (
                <div>
                    This is index 2.
                </div>
            )
        }
    };

    const handleChange = (event) => {
        dispatch({
            type: UPDATE_CURRENT_MENU_ITEM,
            test: event.target.value
        })
    };

    return (
        <Accordion.Content active={state.activeIndex === index}>
            {/* {renderMenu()} */}
            <Form>
                <Form.Input 
                    label='Name' 
                    placeholder='Enter the name of the menu item' 
                />
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Price</label>
                        <input type='number' />
                    </Form.Field> 
                    <Form.Select 
                        fluid 
                        label='Course'
                        placeholder='Select the Course' 
                        options={courses} 
                    />
                </Form.Group>
                <Form.Input 
                    label='Image' 
                    placeholder='' 
                />
                <Form.TextArea 
                    label='Description' 
                    placeholder='Enter a short description of the menu item.' 
                    onChange={handleChange} 
                />
                    <Button type='submit'>Save</Button>
            </Form>
        </Accordion.Content>
    );
};

export default MenuForm;