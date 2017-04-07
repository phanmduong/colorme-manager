/**
 * Created by phanmduong on 4/7/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function chooseEnterStudentReducer(state = initialState.chooseEnterStudent, action) {
    switch (action.type){
        case types.SELECTED_ENTER_STUDENT_ID:
            return Object.assign({},state,{
                selectedEnterStudentId: action.selectedEnterStudentId
            });
        default:
            return state;
    }

}