import  {combineReducers} from 'redux';
import user_reducer from '../user/userReducer';
import channel_reducer from '../channel/channelReducer';
const rootReducer = combineReducers({
    user: user_reducer,
    channel: channel_reducer
})

export default rootReducer;