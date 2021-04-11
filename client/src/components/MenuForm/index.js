import React from 'react';
import { Accordion } from 'semantic-ui-react';

import { useStoreContext } from '../../utils/GlobalState';

const MenuForm = (props) => {
    const [state] = useStoreContext();
    const { index } = props;

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

    return (
        <Accordion.Content active={state.activeIndex === index}>
            {renderMenu()}
        </Accordion.Content>
    );
};

export default MenuForm;