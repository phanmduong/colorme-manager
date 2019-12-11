/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import DashboardComponent from '../components/DashboardComponent';
import {Image, Platform, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as alert from '../constants/alert';
import MeetingStore from './meeting/MeetingStore';
import {connect} from 'react-redux';

class DashboardContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = new MeetingStore(props.token);
  }

  componentDidMount() {
    this.store.loadList();
  }

  render() {
    return <DashboardComponent store={this.store} {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    avatar_url: state.login.user.avatar_url,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);
