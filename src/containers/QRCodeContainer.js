/**
 * Created by phanmduong on 4/9/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import QRCodeComponent from '../components/QRCodeComponent';
import * as attendanceStudentActions from '../actions/attendanceStudentActions';
import * as QRCodeActions from '../actions/QRCodeActions';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../styles";

class QRCodeContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.scannedQRCode = this.scannedQRCode.bind(this);
  }

  componentWillMount() {
    this.props.QRCodeActions.beginScanQRCode();
    // this.scannedQRCode("CM26415");
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Quét QR code</Text>
        </View>
      </View>
    ),
  });

  scannedQRCode(studentCode) {
    if (!this.props.isScanned) {
      this.props.QRCodeActions.scannedQRCode();
      this.props.attendanceStudentActions.scannedQRCode(studentCode);
      // this.props.attendanceStudentScreen();
      this.props.navigation.navigate('AttendanceStudent');
    }
  }

  render() {
    if (this.props.isScanned) {
      return <View />;
    } else {
      return <QRCodeComponent onScannerQRCode={this.scannedQRCode} />;
    }
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
};

function mapStateToProps(state) {
  return {
    isScanned: state.qrCode.isScanned,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attendanceStudentActions: bindActionCreators(
      attendanceStudentActions,
      dispatch,
    ),
    QRCodeActions: bindActionCreators(QRCodeActions, dispatch),
    attendanceStudentScreen: () =>
      dispatch(NavigationActions.navigate({routeName: 'AttendanceStudent'})),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QRCodeContainer);
