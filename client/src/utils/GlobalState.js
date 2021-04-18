import React, { createContext, useContext } from 'react';
import { useMenuReducer } from './reducers';

const StoreContext = createContext ();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useMenuReducer({
        activeIndex: '',
        allCourses: [],
        cart: [],
        cartOpen: false,
        editMode: false,
        itemPreview: {},
        menuItems: [],
        user: {}
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };