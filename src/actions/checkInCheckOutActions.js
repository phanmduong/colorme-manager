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

export function loadCheck(token, type) {
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
                        if (ssid && ssid != 'error' && ssid.indexOf("ssid") == -1) {
                            device.wifiName = ssid;
                            callback(null);
                        } else {
                            callback("Kiểm tra kết nối mạng");
                        }
                    });

                },
                function (callback) {
                    NetworkInfo.getBSSID(bssid => {
                        if (bssid && bssid != 'error' && bssid.indexOf("bssid") == -1) {
                            device.mac = bssid;
                            callback(null);
                        } else {
                            callback("Kiểm tra kết nối mạng");
                        }
                    });
                },
                function (callback) {
                    let countCheckLocation = 0;
                    watchID = navigator.geolocation.watchPosition((position) => {
                            if (countCheckLocation === 0) {
                                device.long = position.coords.longitude;
                                device.lat = position.coords.latitude;
                                callback(null);
                            }
                            countCheckLocation++;

                        },
                        (error) => {
                                if (error.code === 1) {
                                    Alert.alert("Thông báo", "Kiểm tra định vị trên thiết bị của bạn");
                                }
                                callback("Không thể tìm vị trí " + JSON.stringify(error));

                        },
                    );
                },
                function (callback) {
                    navigator.geolocation.clearWatch(watchID);
                    console.log(device);
                    if (type === 'checkin') {
                        checkInCheckOutApi.checkin(device, token).then(function (res) {
                            // console.log(device);
                            callback(null, res);
                        }).catch(error => {
                            callback("Có lỗi xảy ra thử lại");

                        })
                    }
                    else {
                        checkInCheckOutApi.checkout(device, token).then(function (res) {
                            // console.log(device);
                            callback(null, res);
                        }).catch(error => {
                            callback("Có lỗi xảy ra thử lại");

                        })
                    }
                }
            ],

            function (err, result) {
                navigator.geolocation.clearWatch(watchID);
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
            }
        );
    }
}