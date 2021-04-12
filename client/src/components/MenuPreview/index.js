import React, { useEffect } from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

import { useStoreContext } from '../../utils/GlobalState';
import { formatName } from '../../utils/helpers';

const MenuPreview = () => {
    const [state, dispatch] = useStoreContext();
    
    useEffect(() => {
        const previewArea = document.querySelector('.preview-area');
        const { itemPreview } = state;
        
        // renders if object is not empty
        if (Object.keys(itemPreview).length) {
            const itemName = itemPreview.name ? 
                itemPreview.name : 'Item Name'
            const itemPrice = itemPreview.price ? 
                `$${itemPreview.price}` : 'Set a price.'
            const itemCourse = itemPreview.course ? 
                itemPreview.course : 'Pick a course'
            const itemDescription = itemPreview.description ? 
                itemPreview.description : 'Give your menu item a short description.'

            previewArea.innerHTML = `
                <h3>${formatName(itemName)}</h3>
                <div>
                    <span class="preview-price">${itemPrice}</span>, ${itemCourse}
                </div>
                <div class='preview-description'>${itemDescription}</div>
            `;
        }

    }, [state, dispatch])

    return (
        <div className='preview-area'>
            <Segment placeholder className='menu-placeholder'>
                <Header icon>
                    <Icon name='utensils' />
                    Preview your new menu item here.
                </Header>
            </Segment>
        </div>
    );
};

export default MenuPreview;