/**
 * Created by phanmduong on 6/7/17.
 */
import {NavigationActions} from 'react-navigation';
import * as types from '../constants/actionTypes';

import {AppNavigator} from '../navigators/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

export default function navigatorReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case types.LOGIN:
            nextState = AppNavigator.router.getStateForAction(
                resetAction,
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

const resetAction = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [
        NavigationActions.navigate({routeName: 'Main'})
    ]
})