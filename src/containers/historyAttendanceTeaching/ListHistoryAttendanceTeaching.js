/**
 * Created by phanmduong on 4/24/17.
 */
import React from 'react';
import {View, Text, Platform, Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import Swiper from 'react-native-swiper';
import TeachingClass from './TeachingClass';
import _ from 'lodash';

var {height, width} = Dimensions.get('window');

const heightSwiper = Platform.OS === 'ios' ? height - 165 : height - 180;

@observer
class ListHistoryAttendanceTeaching extends React.Component {
  constructor(props, context) {
    super(props, context);
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

  render() {
    const {attendances} = this.props.store;

    if (attendances.length > 0) {
      return (
        <Swiper height={heightSwiper} loop={false} showsPagination={false}>
          {this.renderClasses()}
        </Swiper>
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
