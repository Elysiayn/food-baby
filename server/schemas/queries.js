import gql from 'graphql-tag';

export const QUERY_ALL_COURSES = gql`
   { 
       course {
        _id
        name
    }
å}
`;

export const QUERY_MENU_ITEM = gql`
    query menuItem($_id: ID!) {
        menuItem(_id: $_id) {
            _id
            name
            description
            price
            course
            quantity
        }
    }
`;

export const QUERY_ALL_MENU_ITEMS = gql`
{    
    menuItems {
        _id
        name
        description
        price
        course
        quantity
    }
}
`;

export const QUERY_USER = gql`
    {
        user {
            firstName
            lastName
            orders {
                _id
                purchaseDate
                menuItems {
                    _id
                    name
                    description
                    price
                    course
                    quantity
                }
            }
            favorites {
                _id
                name
                description
                price
                course
            }
        }
    }
`;

export const QUERY_CHECKOUT = gql`
    query getCheckout($menuItems: [ID]!) {
        checkout(menuItems: $menuItems) {
            session
        }
    }
`;

