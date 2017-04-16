/**
 * Created by phanmduong on 4/9/17.
 */
import React from'react';
import {connect} from 'react-redux';
import QRCodeComponent from '../components/QRCodeComponent.ios';
import * as attendanceStudentActions from '../actions/attendanceStudentActions';
import * as QRCodeActions from '../actions/QRCodeActions';
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux';

class QRCodeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.scannedQRCode = this.scannedQRCode.bind(this);
        this.popRouter = this.popRouter.bind(this);
    }

    componentWillMount(){
        this.props.QRCodeActions.beginScanQRCode();
    }

    scannedQRCode(studentCode){
        if (!this.props.isScanned) {
            this.props.QRCodeActions.scannedQRCode();
            this.props.attendanceStudentActions.scannedQRCode(studentCode);
            Actions.attendanceStudentCode();
        }
    }

    popRouter(){
        Actions.pop();
    }

    render() {
        return (
            <QRCodeComponent
                onScannerQRCode = {this.scannedQRCode}
                popRouter = {this.popRouter}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isScanned: state.qrCode.isScanned
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceStudentActions: bindActionCreators(attendanceStudentActions, dispatch),
        QRCodeActions: bindActionCreators(QRCodeActions, dispatch),

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(QRCodeContainer);