import React from 'react';
import { Accordion, Button, Form } from 'semantic-ui-react';

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

    const handleChange = event => {
        const { name, value } = event.target    

        // specifically targets semantic ui's select form
        if (event.target.getAttribute('role') === 'option') {

            // gets course type selected
            const selectedOption = event.target.querySelector('span').textContent
            
            dispatch({
                type: UPDATE_CURRENT_MENU_ITEM,
                itemPreview: {
                    ...state.itemPreview,
                    course: selectedOption
                }
            })
        } else {
            // updates GlobalState on input change for menu item preview
            dispatch({
                type: UPDATE_CURRENT_MENU_ITEM,
                itemPreview: { 
                    ...state.itemPreview, 
                    [name]: value 
                }
            });
        }

    };

    return (
        <Accordion.Content active={state.activeIndex === index}>
            <Form>
                <Form.Input 
                    label='Name' 
                    name='name'
                    placeholder='Enter the name of the menu item' 
                    onChange={handleChange} 
                />
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label for='form-price'>Price</label>
                        <input 
                            type='number' 
                            name='price' 
                            min='0' 
                            onChange={handleChange} 
                            id='form-price'
                        />
                    </Form.Field> 
                    <Form.Select 
                        fluid 
                        label='Course'
                        name='course'
                        placeholder='Select the Course' 
                        options={courses} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Input 
                    label='Image' 
                    name='image'
                    placeholder='' 
                    onChange={handleChange} 
                />
                <Form.TextArea 
                    label='Description' 
                    name='description'
                    placeholder='Enter a short description of the menu item.' 
                    onChange={handleChange} 
                />
                    <Button type='submit'>Save</Button>
            </Form>
        </Accordion.Content>
    );
};

export default MenuForm;