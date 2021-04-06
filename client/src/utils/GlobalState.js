import React, { createContext, useContext } from 'react';
import { useMenuReducer } from './reducers';

const StoreContext = createContext ();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useMenuReducer({
        cart: [],
        currentCourse: '',
        cartOpen: false,
        menuItems: []
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };