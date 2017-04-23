/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';

export function closeDrawer(){
    return {
        type: types.CLOSE_DRAWER,
    }
}

export function openDrawer(){
    return {
        type: types.OPEN_DRAWER,
    }
}

export function disableDrawer(){
    return {
        type: types.DISABLE_DRAWER,
    }
}

export function enableDrawer(){
    return {
        type: types.ENABLE_DRAWER,
    }
}
