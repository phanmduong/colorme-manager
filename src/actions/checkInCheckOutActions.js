/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as checkInCheckOutApi from '../apis/checkInCheckOutApi';
import {NetworkInfo} from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';
import {
    Platform
} from 'react-native';
import async from 'async';
import {Alert} from 'react-native';

let watchID;

export function checkIn(token) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHECK_IN
        });
        let device = {
            device_id: DeviceInfo.getUniqueID()
        };
        async.waterfall([
            function (callback) {
                NetworkInfo.getSSID(ssid => {
                    if (ssid && ssid != 'error') {
                        device.wifiName = ssid;
                        callback(null);
                    } else {
                        callback("Kiểm tra kết nối mạng");
                    }
                });

            },
            function (callback) {
                NetworkInfo.getBSSID(bssid => {
                    if (bssid && bssid != 'error') {
                        device.mac = bssid;
                        callback(null);
                    } else {
                        callback("Kiểm tra kết nối mạng");
                    }
                });
            },
            function (callback) {
                watchID = navigator.geolocation.watchPosition((position) => {
                        device.long = position.coords.longitude;
                        device.lat = position.coords.latitude;
                        callback(null);
                    },
                    (error) => {
                        callback("Không thể tìm vị trí" + JSON.stringify(error));
                    },
                );
            },
            function (callback) {
                checkInCheckOutApi.checkin(device, token).then(function (res) {
                    console.log(device);
                    callback(null, res);
                }).catch(error => {
                    let res = {
                        data: {
                            message: "Có lỗi xảy ra thử lại",
                        }
                    };
                    callback("Có lỗi xảy ra thử lại", res);

                })
            }
        ], function (err, result) {
            console.log(result);
            if (err || result.data.status === 0) {
                dispatch({
                    type: types.CHECK_IN_ERROR,
                    message: result && result.data ? result.data.data.message : err,
                    checkIn: result && result.data ? result.data.data.check_in : {}
                });
            } else {
                dispatch({
                    type: types.CHECK_IN_SUCCESS,
                    message: result.data.data.message,
                    checkIn: result.data.data.check_in
                });
            }
        });
    }
}