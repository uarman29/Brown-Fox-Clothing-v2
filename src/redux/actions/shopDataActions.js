import { DATA_FETCH_FAIL, DATA_FETCH_SUCCESS, START_DATA_FETCH } from "../types";
import { getShopData } from '../../firebase/firebase.utils';


export const signalStartShopDataFetch = () => 
{
    return {type: START_DATA_FETCH};
}

export const dataFetchSuccess = (data) =>
{
    return {
        type: DATA_FETCH_SUCCESS,
        payload: data
    };
}

export const dataFetchFail = (errorMessage) =>
{
    return {
        type: DATA_FETCH_FAIL,
        payload: errorMessage
    };
}

export const fetchShopData = () =>
{
    return async (dispatch) =>
    {
        dispatch(signalStartShopDataFetch());
        
        try
        {
            const shopData = await getShopData();
            dispatch(dataFetchSuccess(shopData));
        }
        catch(error)
        {
            dispatch(dataFetchFail(error.message));
        }
    };
}