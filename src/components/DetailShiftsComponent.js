/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import ShiftRegisterWeek from '../components/detailShifts/ShiftRegisterWeek';
import Spinkit from 'react-native-spinkit';
import theme from '../styles';
var {height, width} = Dimensions.get('window');

class DetailShiftsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderShiftRegister() {
    return <ShiftRegisterWeek weekData={this.props.detailShifts} />;
  }

  render() {
    if (this.props.detailShifts.length > 0) {
      return !this.props.isLoadingDetailShifts ? (
        <View style={{flex: 1}}>
          <Text style={{fontSize: 17, fontWeight: '600', marginLeft: 10}}>
            Lịch làm việc tuần {this.props.weekIndex}
          </Text>
          <View style={styles.containerItem}>
            <View style={styles.containerPerson}>
              <Image
                source={{uri: this.props.avatar_url}}
                style={styles.avatar}
              />
              <View>
                <Text style={{fontWeight: '600'}}>{this.props.name}</Text>
              </View>
            </View>
            <View style={styles.callBorder}>
              <Text style={{fontWeight: '600', color: 'white'}}>
                {this.props.totalHours}H/20H
              </Text>
            </View>
          </View>
          {this.renderShiftRegister()}
        </View>
      ) : (
        <View style={styles.container}>
          <Spinkit
            isVisible
            color={theme.mainColor}
            type="Wave"
            size={width / 8}
          />
        </View>
      );
    }
    return <View />;
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  containerPerson: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 25,
    width: 25,
    borderRadius: 18,
    marginRight: 10,
  },
  callBorder: {
    backgroundColor: '#00B241',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
};

export default DetailShiftsComponent;
