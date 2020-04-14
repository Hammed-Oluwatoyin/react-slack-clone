import * as actionTypes from '../actionsTypes/types'


export const setCurrentChannel = channel =>{
    return{
        type:actionTypes.SET_CURRENT_CHANNEL,
        payload:{
            currentChannel:channel
        }
    }
}