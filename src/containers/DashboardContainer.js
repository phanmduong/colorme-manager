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

  static async clearAll(navigation) {
    const keys = ['@ColorME:username', '@ColorME:password'];
    try {
      await AsyncStorage.multiRemove(keys);
      navigation.navigate('Login');
    } catch (error) {
      alert(error);
    }
  }

  componentDidMount() {
    this.store.loadList();
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Quản lý',
    headerRight: (
      <TouchableOpacity onPress={() => this.clearAll(navigation)}>
        <Image
          source={require('../../assets/img/icons8-logout-rounded-up-100.png')}
          style={{width: 20, height: 20, marginRight: 20}}
        />
      </TouchableOpacity>
    ),
  });

  render() {
    return <DashboardComponent store={this.store} {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);
