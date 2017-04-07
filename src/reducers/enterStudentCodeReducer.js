/**
 * Created by phanmduong on 4/7/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function enterStudentCodeReducer(state = initialState.enterStudentCode, action) {
    switch (action.type){
        case types.UPDATE_FORM_ENTER_STUDENT_CODE:
            return Object.assign({}, state, {
                studentCodeForm: action.studentCodeForm
            });
        case types.SELECT_BUTTON_ENTER_STUDENT_CODE:
            return Object.assign({}, state, {
                studentCode: action.studentCode
            });
        default:
            return state;
    }

}