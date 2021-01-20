import { firestore } from '../../firebase/firebase.utils';
import { ADD_ITEM_TO_CART, CLEAR_CART, CLEAR_ITEM_FROM_CART, COMBINE_LOCAL_AND_USER_CARTS, FETCH_CART, REMOVE_ITEM_FROM_CART } from '../types';

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

const addItemToCartHelper = (cartItems, itemToAdd, quantity) =>
{
    let cartItemsCopy = {...cartItems};

    if(itemToAdd.id in cartItemsCopy)
    {
        cartItemsCopy[itemToAdd.id]["quantity"] =  parseFloat(cartItemsCopy[itemToAdd.id]["quantity"]) + parseFloat(quantity);
        return cartItemsCopy;
    }
    else
    {
        cartItemsCopy[itemToAdd.id] = ({...itemToAdd, quantity: parseFloat(quantity)});
        return cartItemsCopy;
    }
}

export const addCartItem = (item, quantity = 1) =>
{
    return async (dispatch, getState) =>
    {
        const newCart = addItemToCartHelper(getState().cart, item, quantity);
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
        let newCart = {...getState().cart};
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

export const clearCart = (clearSignedInCart = false) =>
{
    if(clearSignedInCart)
    {
        return async (dispatch, getState) =>
        {
            const newCart = {};

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
    else
    {
        return{
            type: CLEAR_CART
        };
    }
}

export const combineLocalAndUserCarts = () =>
{
    return async (dispatch, getState) =>
    {
        if(getState().user.currentUser !== null)
        {
            const userRef = firestore.doc(`users/${getState().user.currentUser.uid}`);
            try
            {
                const userSnap = await userRef.get();
                let userCart = userSnap.data().cart;
                let localCart = {...getState().cart};
                if(Object.keys(localCart).length === 0)
                {
                    dispatch({
                        type: COMBINE_LOCAL_AND_USER_CARTS,
                        payload: userCart
                    });
                    return;
                }
                
                Object.keys(localCart).forEach(localCartItemKey =>{
                    if(localCartItemKey in userCart)
                    {
                        userCart[localCartItemKey]["quantity"] =  parseFloat(userCart[localCartItemKey]["quantity"]) + 
                                                                    parseFloat(localCart[localCartItemKey]["quantity"]);
                    }
                    else
                    {
                        userCart[localCartItemKey] = {...localCart[localCartItemKey]};
                    }
                });
                
                await userRef.update("cart", userCart);

                dispatch({
                    type: COMBINE_LOCAL_AND_USER_CARTS,
                    payload: userCart
                });

            }
            catch(error)
            {
                dispatch({
                    type: COMBINE_LOCAL_AND_USER_CARTS,
                    payload: getState().user.currentUser.cart
                });

                console.log("Error Clearing Cart", error.message);
            }
        }
    }
}
