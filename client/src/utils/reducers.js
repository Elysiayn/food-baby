import { useReducer } from "react";
import {
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART,
    UPDATE_CURRENT_COURSE,
    UPDATE_MENU_ITEMS
  } from "./actions";


export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
              ...state,
              cartOpen: true,
              cart: [...state.cart, action.menuItem]
            };
      
        case ADD_MULTIPLE_TO_CART:
            return {
              ...state,
              cartOpen: true,
              cart:[...state.cart, ...action.menuItems]
            };
      
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(menuItem => {
              return menuItem._id !== action._id
            });
      
            return{
              ...state,
              cartOpen: newState.length > 0,
              cart: newState
            };
      
        case UPDATE_CART_QUANTITY:
            return {
              ...state,
              cartOpen: true,
              cart: state.cart.map(menuItem=> {
                if (action._id === menuItem._id) {
                  menuItem.purchaseQuantity = action.purchaseQuantity;
                }
                return menuItem;
              })
            };
      
        case CLEAR_CART:
            return {
              ...state,
              cartOpen: false,
              cart:[]
            };
      
        case TOGGLE_CART:
            return {
              ...state,
              cartOpen: !state.cartOpen
            };

        case UPDATE_CURRENT_COURSE:
            return {
                ...state,
                currentCourse: action.currentCourse
            };
            
        case UPDATE_MENU_ITEMS:
            return {
              ...state,
              menuItems: [...action.menuItems]
            }
        default:
            return state;
    }
};
      
export function useMenuReducer(initialState) {
    return useReducer(reducer, initialState)
};