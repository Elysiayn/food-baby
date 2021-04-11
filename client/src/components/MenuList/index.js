import React from 'react';
import { Accordion } from 'semantic-ui-react';

import { useStoreContext } from '../../utils/GlobalState';

const MenuList = () => {
    const [state] = useStoreContext();

    return (
        <Accordion.Content active={state.activeIndex === 0}>
        MENULIST TEST CONTENT
        </Accordion.Content>
    );
};

export default MenuList;