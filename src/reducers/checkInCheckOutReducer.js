/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function loginReducer(
  state = initialState.checkInCheckOut,
  action,
) {
  switch (action.type) {
    case types.BEGIN_CHECK_IN:
      return {
        isLoadingCheckIn: true,
        errorCheckIn: false,
        message: '',
        checkIn: {},
      };
    case types.CHECK_IN_SUCCESS:
      return {
        isLoadingCheckIn: false,
        errorCheckIn: false,
        message: action.message,
        checkIn: action.checkIn,
      };
    case types.CHECK_IN_ERROR:
      return {
        isLoadingCheckIn: false,
        errorCheckIn: true,
        message: action.message,
        checkIn: action.checkIn,
      };
    default:
      return state;
  }
}
