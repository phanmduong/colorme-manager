/**
 * Created by phanmduong on 4/7/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function QRCodeReducer(state = initialState.qrcode, action) {
    switch (action.type){
        case types.BEGIN_SCAN_QR_CODE:
            return Object.assign({},state,{
                isScanned: action.isScanned
            });
        case types.IS_SCANNED_QR_CODE:
            return Object.assign({},state,{
                isScanned: action.isScanned
            });
        default:
            return state;
    }

}