/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function genReducer(state = initialState.drawer, action) {
  switch (action.type) {
    case types.CLOSE_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: false,
      });
    case types.OPEN_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: true,
      });
    case types.DISABLE_DRAWER:
      return Object.assign({}, state, {
        drawerDisable: true,
      });
    case types.ENABLE_DRAWER:
      return Object.assign({}, state, {
        drawerDisable: false,
      });
    default:
      return state;
  }
}
