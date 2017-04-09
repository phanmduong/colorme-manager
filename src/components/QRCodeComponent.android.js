import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';

import BarcodeScanner from 'react-native-barcodescanner';

class QRCodeComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            torchMode: 'off',
            cameraType: 'back',
        };
    }

    render() {
        return (
            <BarcodeScanner
                onBarCodeRead={(result) => this.props.onScannerQRCode(result.data)}
                style={{flex: 1}}
                torchMode={this.state.torchMode}
                cameraType={this.state.cameraType}
            />
        );
    }
}

const styles = StyleSheet.create({});

export default QRCodeComponent;