/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import DashboardComponent from '../components/DashboardComponent';
import {Image, Platform, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as alert from '../constants/alert';

class DashboardContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
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

  static navigationOptions = ({navigation}) => ({
    title: 'Quản lý',
    headerRight: (
      <TouchableOpacity onPress={() => this.clearAll(navigation)}>
        <Image
          source={require('../../assets/img/icons8-logout-rounded-up-100.png')}
          style={{width: 20, height: 20, right: 20}}
        />
      </TouchableOpacity>
    ),
  });

  render() {
    return <DashboardComponent {...this.props} />;
  }
}

export default DashboardContainer;
