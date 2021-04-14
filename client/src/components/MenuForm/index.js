import React, { useEffect } from 'react';
import { Accordion, Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import ImageUpload from '../ImageUpload';

import { TOGGLE_EDIT_MODE, UPDATE_MENU_ITEM } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';
import { ADD_MENU_ITEM, EDIT_MENU_ITEM } from '../../utils/mutations';

const MenuForm = (props) => {
    const [state, dispatch] = useStoreContext();
    const { editMode, itemPreview } = state;
    const { index } = props;
    const [addMenuItem] = useMutation(ADD_MENU_ITEM);
    const [editMenuItem] = useMutation(EDIT_MENU_ITEM);

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

        // submit form in edit mode
        if (editMode) {
               try {
                // updates idb store
                idbPromise('menuItems', 'put', itemPreview);

                // sends graphql mutation
                const editResponse = await editMenuItem({
                    variables: {
                        menuItem: itemPreview
                    }
                });

                // turn off edit mode
                dispatch({
                    type: TOGGLE_EDIT_MODE,
                    editMode: false
                });
                
                return editResponse;
            } catch (e) {
                console.log(e)
            }

        // submit new menu item
        } else {
            try {
                const mutationResponse = await addMenuItem({ variables: {
                    menuItem: itemPreview
                }});
    
                return mutationResponse;
            } catch (e) {
                console.log(e)
            }
        }
    };

    return (
        <Accordion.Content active={state.activeIndex === index}>
            <Form onSubmit={handleFormSubmit}>
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
                    {/* <Form.Select 
                        fluid 
                        label='Course'
                        name='course'
                        placeholder='Select the Course' 
                        options={courses} 
                        onChange={handleChange} 
                    /> */}
                    <Form.Field>
                        <label htmlFor='form-course'>Course</label>
                        <select name='course' id='form-course' onChange={handleChange}>
                            <option value='' disabled hidden>Select the course</option>
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