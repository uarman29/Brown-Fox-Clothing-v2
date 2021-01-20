import { ADD_ITEM_TO_CART, CLEAR_CART, CLEAR_ITEM_FROM_CART, COMBINE_LOCAL_AND_USER_CARTS, FETCH_CART, REMOVE_ITEM_FROM_CART } from "../types";

const INITIAL_STATE = {};

const cartReducer = (cart = INITIAL_STATE, action) =>
{
    switch(action.type)
    {
        case FETCH_CART:
            return action.payload;

        case CLEAR_CART:
            return INITIAL_STATE;

        case ADD_ITEM_TO_CART:
            return action.payload;
        
        case CLEAR_ITEM_FROM_CART:
            return action.payload;
        
        case REMOVE_ITEM_FROM_CART:
            return action.payload;
        
        case COMBINE_LOCAL_AND_USER_CARTS:
            return action.payload;
        default:
            return cart;
    }
}

export default cartReducer;