import { DATA_FETCH_FAIL, DATA_FETCH_SUCCESS, START_DATA_FETCH } from "../types"

const INITIAL_STATE = 
{
    data: {},
    isLoading: true,
    errorMessage: null
}

const shopDataReducer = (shop = INITIAL_STATE, action) =>
{
    switch(action.type)
    {
        case START_DATA_FETCH:
            return {...shop,  data: {}, isLoading: true, errorMessage: null};
        
        case DATA_FETCH_SUCCESS:
            return {...shop, data: action.payload, isLoading: false, errorMessage: null};
        
        case DATA_FETCH_FAIL:
            return {...shop, data:{}, isLoading: false, errorMessage: action.payload};
        
        default:
            return shop;
    }
}

export default shopDataReducer;