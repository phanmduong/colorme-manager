/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {View, Platform, Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import Swiper from 'react-native-swiper';
import TeachingClass from './TeachingClass';
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
class ListHistoryAttendanceTeaching extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeSlide: 0,
    };
  }

  renderClasses() {
    const {listAttendance} = this.props.store;
    const attendance = _.sortBy(
      listAttendance,
      attendance => attendance.lessons,
    ).reverse();
    return attendance.map((classData, index) => {
      return <TeachingClass classData={classData} key={index} />;
    });
  }

  get pagination() {
    const {listAttendance} = this.props.store;
    const attendance = _.sortBy(
      listAttendance,
      attendance => attendance.lessons,
    ).reverse();
    return (
      <Pagination
        dotsLength={attendance.length}
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
    const {attendances} = this.props.store;

    if (attendances.length > 0) {
      return (
        <View style={{flex: 1}}>
          {this.pagination}
          <Swiper
            height={heightSwiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={index => this.setState({activeSlide: index})}>
            {this.renderClasses()}
          </Swiper>
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
  textError: {
    color: '#d9534f',
    textAlign: 'center',
  },
};

export default ListHistoryAttendanceTeaching;
