import * as actionTypes from '../actionsTypes/types';

export const setUser = (user) =>  {
    return {
        type: actionTypes.SET_USER,
        payload:{
            currentUser:user
        }
    }
} 

export const clearUser = () => {
    return {
        type:actionTypes.CLEAR_USER
    }
}