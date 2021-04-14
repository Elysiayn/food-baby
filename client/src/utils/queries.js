import gql from 'graphql-tag';

export const QUERY_ALL_COURSES = gql`
   { 
       course {
        _id
        name
    }
}
`;

export const QUERY_MENU_ITEM = gql`
    query menuItem($_id: ID!) {
        menuItem(_id: $_id) {
            _id
            name
            description
            image
            price
            course {
                name
            }
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
        image
        course {
            _id
            name
        }
    }
}
`;

export const QUERY_USER = gql`
    {
        user {
            _id
            firstName
            lastName
            role
            orders {
                _id
                purchaseDate
                menuItems {
                    _id
                    name
                    description
                    price
                    course {
                        _id
                        name
                    }
                }
            }
            favorites {
                _id
                name
                description
                price
                course {
                    _id
                    name
                }
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

