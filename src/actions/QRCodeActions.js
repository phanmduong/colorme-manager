/**
 * Created by phanmduong on 4/5/17.
 */
import * as types from '../constants/actionTypes';

export function beginScanQRCode() {
  return {
    type: types.BEGIN_SCAN_QR_CODE,
    isScanned: false,
  };
}

export function scannedQRCode() {
  return {
    type: types.IS_SCANNED_QR_CODE,
    isScanned: true,
  };
}
