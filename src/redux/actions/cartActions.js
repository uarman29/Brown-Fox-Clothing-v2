import { firestore } from '../../firebase/firebase.util';
import { ADD_ITEM_TO_CART } from '../types';

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
    var cartItemsCopy = {...cartItems};

    if(itemToAdd.id in cartItemsCopy)
        return cartItemsCopy[itemToAdd.id]["quantity"] =  cartItemsCopy[itemToAdd.id]["quantity"] + 1;
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

/*
const removeItemFromCartHelper = (cartItems, itemToRemove) =>
{
    const existingItem = cartItems.find(item => item.id === itemToRemove.id);

    if(existingItem && existingItem.quantity === 1)
    {
        return cartItems.filter(item => item.id !== itemToRemove.id);
    }
    else if(existingItem)
    {
        return cartItems.map(item => item.id === itemToRemove.id ? {...item, quantity: item.quantity - 1} : item);
    }

    return cartItems;
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
            type: REMOVE_ITEM,
            payload: newCart
        });

    }
}

export const clearItemFromCart = (item) =>
{
    return async (dispatch, getState) =>
    {
        const newCart = getState().cart.filter(selectedItem => selectedItem.id !== item.id);

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
    return async (dispatch, getState) =>
    {
        const newCart = [];

        if(getState().user.currentUser !== null)
        {
            const userRef = firestore.doc(`users/${getState().user.currentUser.uid}`);
            try
            {
                await userRef.update("cart", newCart);
            }
            catch(error)
            {
                console.log("Error Clearing Cart", error.message);
            }
        }

        dispatch({
            type: CLEAR_CART
        });

    }
}
*/