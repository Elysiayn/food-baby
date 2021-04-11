import React, { useEffect } from 'react';

import { useStoreContext } from '../../utils/GlobalState';

const MenuPreview = () => {
    const [state, dispatch] = useStoreContext();
    
    useEffect(() => {
        const display = document.querySelector('.test-display');
        display.textContent = state.test
    }, [state, dispatch])

    return (
        <div className='test-display'>
            
        </div>
    );
};

export default MenuPreview;