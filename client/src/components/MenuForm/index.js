import React from 'react';
import { Accordion } from 'semantic-ui-react';

import { useStoreContext } from '../../utils/GlobalState';

const MenuForm = () => {
    const [state] = useStoreContext();

    return (
        <Accordion.Content active={state.activeIndex === 1}>
            TEST MENUFORM CONTENT
        </Accordion.Content>
    );
};

export default MenuForm;