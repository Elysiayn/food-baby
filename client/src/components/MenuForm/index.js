import React from 'react';
import { Accordion } from 'semantic-ui-react';

import { UPDATE_CURRENT_MENU_ITEM } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { useEffect } from 'react';

const MenuForm = (props) => {
    const [state, dispatch] = useStoreContext();
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

    const handleChange = (event) => {
        dispatch({
            type: UPDATE_CURRENT_MENU_ITEM,
            test: event.target.value
        })
    }

    return (
        <Accordion.Content active={state.activeIndex === index}>
            {/* {renderMenu()} */}
            <textarea onChange={handleChange}>
            </textarea>
        </Accordion.Content>
    );
};

export default MenuForm;