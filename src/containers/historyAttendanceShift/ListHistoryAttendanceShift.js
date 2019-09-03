/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {View, Platform, Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import Swiper from 'react-native-swiper';
import ShiftRegisterWeek from './ShiftRegisterWeek';
import _ from 'lodash';

var {height, width} = Dimensions.get('window');

const heightSwiper = Platform.OS === 'ios' ? height - 165 : height - 180;

@observer
class ListHistoryAttendanceShift extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderShiftRegister() {
    const {listShift} = this.props.store;
    const shifts = _.sortBy(listShift, shift => shift.week).reverse();
    return shifts.map((week, index) => {
      return <ShiftRegisterWeek weekData={week} key={index} />;
    });
  }

  render() {
    const {shifts} = this.props.store;

    if (shifts.length > 0) {
      return (
        <Swiper height={heightSwiper} loop={false} showsPagination={false}>
          {this.renderShiftRegister()}
        </Swiper>
      );
    }
    return <View />;
  }
}

export default ListHistoryAttendanceShift;
