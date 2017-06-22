/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function collectMoneyReducer(state = initialState.collectMoney, action) {
    switch (action.type) {
        case types.BEGIN_DATA_STUDENT_LIST_COLLECT_MONEY_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_STUDENT_LIST_COLLECT_MONEY_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                studentListData: action.studentListData,
                nextCode: action.nextCode,
                nextWaitingCode: action.nextWaitingCode
            });
        case types.LOAD_DATA_STUDENT_LIST_COLLECT_MONEY_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        case types.UPDATE_FORM_SEARCH_STUDENT_LIST_COLLECT_MONEY:
            return Object.assign({}, state, {
                search: action.search,
                studentListData: action.studentListData,
            });
        case types.UPDATE_FORM_INFO_MONEY:
            return Object.assign({}, state, {
                formInfoMoney: action.formInfoMoney,
            });
        case types.SELECTED_STUDENT_OF_STUDENT_LIST_COLLECT_MONEY:
            return Object.assign({}, state, {
                studentSelected: action.studentSelected,
            });
        case types.BEGIN_UPDATE_MONEY_STUDENT_COLLECT_MONEY:
            return Object.assign({}, state, {
                isUpdatingData: action.isUpdatingData,
                errorUpdate: action.errorUpdate,
                messageErrorUpdate: action.messageErrorUpdate
            });
        case types.UPDATE_MONEY_STUDENT_COLLECT_MONEY_SUCCESSFUL:
            let studentListData = updateStudentListData(state.studentListData, action.registerData);
            return Object.assign({}, state, {
                isUpdatingData: action.isUpdatingData,
                errorUpdate: action.errorUpdate,
                studentListData: studentListData,
                nextCode: action.nextCode,
                nextWaitingCode: action.nextWaitingCode
            });
        case types.UPDATE_MONEY_STUDENT_COLLECT_MONEY_ERROR:
            return Object.assign({}, state, {
                isUpdatingData: action.isUpdatingData,
                errorUpdate: action.errorUpdate,
                messageErrorUpdate: action.messageErrorUpdate
            });
        default:
            return state;
    }

}

function updateStudentListData(studentListData, registerData) {
    if (studentListData) {
        return studentListData.map((student) => {
            let registers = student.registers.map((register) => {
                if (register.id === registerData.id) {
                    return {...register, ...registerData};
                }
                return register;
            });

            return {...student, registers: registers};
        });
    }
    return studentListData;
}