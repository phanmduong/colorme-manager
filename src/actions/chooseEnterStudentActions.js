/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';

export function selectedEnterStudentId(id) {
    return {
        type: types.SELECTED_ENTER_STUDENT_ID,
        selectedEnterStudentId: id
    }
}