/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {View, Platform, Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import Swiper from 'react-native-swiper';
import ShiftRegisterWeek from './ShiftRegisterWeek';
import _ from 'lodash';
import {Pagination} from 'react-native-snap-carousel';
import {isIphoneX} from 'react-native-iphone-x-helper';

var {height, width} = Dimensions.get('window');

const heightSwiper =
  Platform.OS === 'ios'
    ? isIphoneX()
      ? height - 305
      : height - 265
    : height - 180;

@observer
class ListHistoryAttendanceShift extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeSlide: 0,
    };
  }

  renderShiftRegister() {
    const {listShift} = this.props.store;
    const shifts = _.sortBy(listShift, shift => shift.week).reverse();
    return shifts.map((week, index) => {
      return <ShiftRegisterWeek weekData={week} key={index} />;
    });
  }

  get pagination() {
    const {listShift} = this.props.store;
    const shifts = _.sortBy(listShift, shift => shift.week).reverse();
    console.log(shifts.length);
    return (
      <Pagination
        dotsLength={shifts.length}
        activeDotIndex={this.state.activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#30C320',
        }}
        containerStyle={{paddingTop: 0, paddingBottom: 10}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    const {shifts} = this.props.store;

    if (shifts.length > 0) {
      return (
        <View style={{flex: 1}}>
          {this.pagination}
          <Swiper
            height={heightSwiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={index => this.setState({activeSlide: index})}>
            {this.renderShiftRegister()}
          </Swiper>
        </View>
      );
    }
    return <View />;
  }
}

export default ListHistoryAttendanceShift;
