/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as checkInCheckOutApi from '../apis/checkInCheckOutApi';
import {NetworkInfo} from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';
import async from 'async';
import {Alert, NativeModules, Platform} from 'react-native';

let watchID;

const ignoreDevices = ['104cd46e55b546c6', '40f8929c0eb03dfe'];
const LONGITUDE = 105.80119400;
const LATITUDE = 21.02290900;

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
                    let countCheckLocation = 0;
                    let called = false;
                    if (Platform.OS == 'ios') {
                        watchID = navigator.geolocation.watchPosition((position) => {
                                if (countCheckLocation === 0) {
                                    device.long = position.coords.longitude;
                                    device.lat = position.coords.latitude;
                                    callback(null);
                                    called = true;
                                }
                                countCheckLocation++;

                            },
                            (error) => {
                                if (ignoreDevices.indexOf(device.device_id) > 0) {
                                    device.long = LONGITUDE;
                                    device.lat = LATITUDE;
                                    callback(null);
                                    called = true;
                                }

                                if (error.code === 1) {
                                    Alert.alert("Thông báo", "Kiểm tra định vị trên thiết bị của bạn");
                                }
                                if (!called)
                                    callback("Không thể tìm vị trí " + JSON.stringify(error) + device.device_id);
                            },
                        );
                    } else {

                        let location = NativeModules.RNLocationModule;
                        location.getLocation((lat, long) => {
                            if (lat == null || long == null) {
                                Alert.alert("Thông báo", "Kiểm tra định vị trên thiết bị của bạn");
                                callback("Không thể tìm vị trí ");
                                return;
                            }
                            if (countCheckLocation === 0) {
                                device.long = long;
                                device.lat = lat;
                                callback(null);
                            }
                            countCheckLocation++;
                        });
                    }


                },
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
                    if (watchID) {
                        navigator.geolocation.clearWatch(watchID);
                    }
                    console.log(device);
                    if (type === 'checkin') {
                        checkInCheckOutApi.checkin(device, token).then(function (res) {
                            // console.log(device);
                            Alert.alert("Thông báo", "Hãy đọc nội dung thông báo");
                            callback(null, res);
                        }).catch(error => {
                            Alert.alert("Thông báo",
                                JSON.stringify(device) + ", token" + token
                            );
                            callback("Có lỗi xảy ra thử lại");
                        })
                    }
                    else {
                        checkInCheckOutApi.checkout(device, token).then(function (res) {
                            // console.log(device);
                            Alert.alert("Thông báo", "Hãy đọc nội dung thông báo");
                            callback(null, res);
                        }).catch(error => {
                            Alert.alert("Thông báo",
                                JSON.stringify(device) + ", token" + token
                            );
                            callback("Có lỗi xảy ra thử lại");

                        })
                    }
                }
            ],

            function (err, result) {
                if (watchID) {
                    navigator.geolocation.clearWatch(watchID);
                }
                if (err || result.data.status === 0) {
                    dispatch({
                        type: types.CHECK_IN_ERROR,
                        message: result && result.data && result.data.data ? result.data.data.message : err,
                        checkIn: result && result.data && result.data.data ? result.data.data.check_in : {}
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