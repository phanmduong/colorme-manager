/**
 * Created by phanmduong on 4/5/17.
 */
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';


const rootReducer = combineReducers({
    login: loginReducer,
});
export default rootReducer;