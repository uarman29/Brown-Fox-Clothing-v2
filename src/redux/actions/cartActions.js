import { firestore } from '../../firebase/firebase.utils';
import { ADD_ITEM_TO_CART, CLEAR_CART, CLEAR_ITEM_FROM_CART, FETCH_CART, REMOVE_ITEM_FROM_CART } from '../types';

export const fetchCart = () =>
{
    return async (dispatch, getState) =>
    {
        dispatch({
            type: FETCH_CART,
            payload: getState().user.currentUser.cart
        });
    };
}

const addItemToCartHelper = (cartItems, itemToAdd) =>
{
    let cartItemsCopy = {...cartItems};

    if(itemToAdd.id in cartItemsCopy)
    {
        cartItemsCopy[itemToAdd.id]["quantity"] =  cartItemsCopy[itemToAdd.id]["quantity"] + 1;
        return cartItemsCopy;
    }
    else
    {
        cartItemsCopy[itemToAdd.id] = ({...itemToAdd, quantity: 1});
        return cartItemsCopy;
    }
}

export const addCartItem = (item) =>
{
    return async (dispatch, getState) =>
    {
        const newCart = addItemToCartHelper(getState().cart, item);
        if(getState().user.currentUser !== null)
        {
            const userRef = firestore.doc(`users/${getState().user.currentUser.uid}`);
            try
            {
                await userRef.update("cart", newCart);
            }
            catch(error)
            {
                console.log("Error Adding to Cart", error.message);
            }
        }

        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: newCart
        });

    }
}


const removeItemFromCartHelper = (cartItems, itemToRemove) =>
{
    let cartItemsCopy = {...cartItems};

    if(itemToRemove.id in cartItemsCopy)
    {
        if(cartItemsCopy[itemToRemove.id]["quantity"] === 1)
        {
            delete cartItemsCopy[itemToRemove.id];
            return cartItemsCopy;
        }

        cartItemsCopy[itemToRemove.id]["quantity"] =  cartItemsCopy[itemToRemove.id]["quantity"] - 1;
    }

    return cartItemsCopy;
}

export const removeCartItem = (item) =>
{
    return async (dispatch, getState) =>
    {
        const newCart = removeItemFromCartHelper(getState().cart, item);
        if(getState().user.currentUser !== null)
        {
            const userRef = firestore.doc(`users/${getState().user.currentUser.uid}`);
            try
            {
                await userRef.update("cart", newCart);
            }
            catch(error)
            {
                console.log("Error Removing From Cart", error.message);
            }
        }

        dispatch({
            type: REMOVE_ITEM_FROM_CART,
            payload: newCart
        });

    }
}

export const clearItemFromCart = (item) =>
{
    return async (dispatch, getState) =>
    {
        let newCart = getState().cart;
        delete newCart[item.id];

        if(getState().user.currentUser !== null)
        {
            const userRef = firestore.doc(`users/${getState().user.currentUser.uid}`);
            try
            {
                await userRef.update("cart", newCart);
            }
            catch(error)
            {
                console.log("Error Clearing From Cart", error.message);
            }
        }

        dispatch({
            type: CLEAR_ITEM_FROM_CART,
            payload: newCart
        });

    }
}

export const clearCart = () =>
{
    return{
        type: CLEAR_CART
    };
}
