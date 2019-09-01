/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import CheckInComponent from '../components/CheckInComponent';
import {Alert} from 'react-native';
import * as checkInCheckOutActions from '../actions/checkInCheckOutActions';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';

class CheckInContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onCheck = this.onCheck.bind(this);
    this.onExit = this.onExit.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
  });

  componentWillMount() {
    this.onCheck();
  }

  onCheck() {
    // console.log("push");
    // console.log(this.props.navigation.state.params.type);
    this.props.checkInCheckOutActions.loadCheck(
      this.props.token,
      this.props.navigation.state.params.type,
    );
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.isLoadingCheckIn !== this.props.isLoadingCheckIn && !nextProps.isLoadingCheckIn) {
    //     if (!nextProps.errorCheckIn) {
    //         Alert.alert("Thông báo", "Check in thành công");
    //     }
    // }
  }

  onExit() {
    this.props.navigation.navigate('TabDashboard');
  }

  render() {
    return (
      <CheckInComponent
        {...this.props}
        onCheck={this.onCheck}
        onExit={this.onExit}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoadingCheckIn: state.checkInCheckOut.isLoadingCheckIn,
    errorCheckIn: state.checkInCheckOut.errorCheckIn,
    message: state.checkInCheckOut.message,
    checkInData: state.checkInCheckOut.checkIn,
    token: state.login.token,
    user: state.login.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkInCheckOutActions: bindActionCreators(
      checkInCheckOutActions,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckInContainer);
