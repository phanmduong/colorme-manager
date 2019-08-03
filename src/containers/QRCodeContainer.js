/**
 * Created by phanmduong on 4/9/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import QRCodeComponent from '../components/QRCodeComponent';
import * as attendanceStudentActions from '../actions/attendanceStudentActions';
import * as QRCodeActions from '../actions/QRCodeActions';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';

class QRCodeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.scannedQRCode = this.scannedQRCode.bind(this);
    }

    componentWillMount() {
        this.props.QRCodeActions.beginScanQRCode();
        // this.scannedQRCode("CM26415");
    }

    scannedQRCode(studentCode) {
        if (!this.props.isScanned) {
            this.props.QRCodeActions.scannedQRCode();
            this.props.attendanceStudentActions.scannedQRCode(studentCode);
            // this.props.attendanceStudentScreen();
            this.props.navigation.navigate("AttendanceStudent")
        }
    }

    render() {
        if (this.props.isScanned) {
            return (<View/>);
        } else {
            return (
                <QRCodeComponent
                    onScannerQRCode={this.scannedQRCode}
                />
            );
        }
    }
}

QRCodeContainer.navigationOptions = {
    title: 'Quét QR code',
};

function mapStateToProps(state) {
    return {
        isScanned: state.qrCode.isScanned,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceStudentActions: bindActionCreators(attendanceStudentActions, dispatch),
        QRCodeActions: bindActionCreators(QRCodeActions, dispatch),
        attendanceStudentScreen: () =>
            dispatch(NavigationActions.navigate({routeName: 'AttendanceStudent'}))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QRCodeContainer);