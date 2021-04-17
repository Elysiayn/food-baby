import React, { useEffect, useState } from 'react';
import { Accordion, Button, Form, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import ImageUpload from '../ImageUpload';

import { TOGGLE_EDIT_MODE, UPDATE_MENU_ITEM, UPDATE_MENU_LIST } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';
import { ADD_MENU_ITEM, EDIT_MENU_ITEM } from '../../utils/mutations';

const MenuForm = (props) => {
    const [state, dispatch] = useStoreContext();
    const { editMode, itemPreview, menuItems } = state;

    const [errorMessage, setErrorMessage] = useState('');
    const { index } = props;

    const [addMenuItem] = useMutation(ADD_MENU_ITEM);
    const [editMenuItem] = useMutation(EDIT_MENU_ITEM);

    const menuItemForm = document.querySelector('.menu-item-form');

    useEffect(() => {

        const populateForm = inputName => {
            const el = document.querySelector(`[name=${inputName}]`);

            switch(inputName) {
                case ('course'):
                    const selected = el.querySelector(`option[value='${itemPreview[inputName]}']`);
                    selected.setAttribute('selected', 'selected');
                    break;

                case ('description'):
                    el.textContent = itemPreview[inputName];
                    break;

                default:
                    el.value = itemPreview[inputName];
            };
        };

        // populates form fields when form is in 'edit mode'
        if(editMode) {
            const formFields = ['name', 'price', 'course', 'description'];
            formFields.forEach(field => populateForm(field));
        }
    }, [editMode, itemPreview])

    const handleChange = event => {
        const { name, value } = event.target    

        // updates GlobalStore for live function render and to handle form save
        switch (true) {
            // specifically targets semantic ui's select form
            case (event.target.getAttribute('role') === 'option'): 
                
                // gets course type selected
                const selectedOption = event.target.querySelector('span').textContent
                
                dispatch({
                    type: UPDATE_MENU_ITEM,
                    itemPreview: {
                        ...itemPreview,
                        course: selectedOption
                    }
                });

                break;
            case (name === 'price'):
                // parses an integer from form data
                const priceInt = parseInt(value);

                dispatch({ 
                    type: UPDATE_MENU_ITEM,
                    itemPreview: {
                        ...itemPreview,
                        price: priceInt
                    }
                });

                break;
            default: 
                dispatch({
                    type: UPDATE_MENU_ITEM,
                    itemPreview: { 
                        ...itemPreview, 
                        [name]: value 
                    }
                });
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            if (editMode) {
                idbPromise('menuItems', 'put', itemPreview);

                const editedItem = await editMenuItem({
                    variables: {
                        menuItem: itemPreview
                    }
                });

                // turn off editMode
                dispatch({ 
                    type: TOGGLE_EDIT_MODE,
                    editMode: false
                });
            } else {
                const { data } = await addMenuItem({
                    variables: {
                        menuItem: itemPreview
                    }
                });

                idbPromise('menuItems', 'put', data.addMenuItem);

                dispatch({
                    type: UPDATE_MENU_LIST,
                    menuItems: [...menuItems, data.addMenuItem]
                });

            }
        } catch (e) {
            console.log(e);
            setErrorMessage('Please check your form fields or try again later.');
            setTimeout(() => setErrorMessage(''), 5000);
        }
          
        menuItemForm.reset();
    };

    return (
        <Accordion.Content active={state.activeIndex === index}>
            {errorMessage && (
                <Message negative>
                    <Message.Header>Error!</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
            )}
            <Form className='menu-item-form' onSubmit={handleFormSubmit}>
                <Form.Input 
                    label='Name' 
                    name='name'
                    placeholder='Enter the name of the menu item' 
                    onChange={handleChange} 
                />
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label htmlFor='form-price'>Price</label>
                        <input 
                            type='number' 
                            name='price' 
                            min='0' 
                            onChange={handleChange} 
                            id='form-price'
                        />
                    </Form.Field> 
                    <Form.Field>
                        <label htmlFor='form-course'>Course</label>
                        <select name='course' id='form-course' onChange={handleChange}>
                            <option value='' disabled>Select the course</option>
                            <option value='appetizers'>appetizers</option>
                            <option value='mains'>mains</option>
                            <option value='desserts'>desserts</option>
                            <option value='drinks'>drinks</option>
                        </select>
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <label htmlFor='form-image-upload'>Image</label>
                    <ImageUpload />
                </Form.Field>
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