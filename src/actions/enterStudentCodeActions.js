/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';

export function updateDataStudentCodeForm(studentCode) {
    return{
        type: types.UPDATE_FORM_ENTER_STUDENT_CODE,
        studentCodeForm: studentCode,
    };
}
