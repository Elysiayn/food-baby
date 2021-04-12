import React, { useEffect } from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

import { useStoreContext } from '../../utils/GlobalState';
import { formatName } from '../../utils/helpers';

const MenuPreview = () => {
    const [state] = useStoreContext();
    
    useEffect(() => {
        const previewArea = document.querySelector('.preview-area');
        const { itemPreview } = state;
        
        // renders if object is not empty
        if (Object.keys(itemPreview).length) {
            const itemName = itemPreview.name ? 
                itemPreview.name : 'Item Name'
            const itemPrice = itemPreview.price ? 
                `$${itemPreview.price}` : 'Set a price'
            const itemCourse = itemPreview.course ? 
                itemPreview.course : 'pick a course'
            const itemImage = itemPreview.image ?
                `<img src=${itemPreview.image} alt=${itemPreview.name} />` : 'Upload an image!'
            const itemDescription = itemPreview.description ? 
                itemPreview.description : 'Give your menu item a short description.'

            console.log(itemPreview.image)
            previewArea.innerHTML = `
                <h3>${formatName(itemName)}</h3>
                <div>
                    <span class="preview-price">${itemPrice}</span>, ${itemCourse}
                </div>
                <div class="preview-image">${itemImage}</div>
                <div class='preview-description'>${itemDescription}</div>
            `;
        }

    }, [state])

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