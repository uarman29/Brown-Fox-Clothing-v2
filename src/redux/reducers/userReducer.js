import { SET_CURRENT_USER } from '../types' ;

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (user = INITIAL_STATE, action) =>
{
    switch(action.type)
    {
        case SET_CURRENT_USER:
            return {...user, currentUser: action.payload};
            
        default:
            return user;
    }
};

export default userReducer;