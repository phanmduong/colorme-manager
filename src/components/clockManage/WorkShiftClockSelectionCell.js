import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../styles';
import moment from 'moment';
import {convertTimeToSecond} from '../../helper';

class WorkShiftClockSelectionCell extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  isShiftLegit = (shift) => {
    if (shift.check_in_time && shift.check_out_time) {
      const check_in_time = convertTimeToSecond(shift.check_in_time);
      const check_out_time = convertTimeToSecond(shift.check_out_time);
      const start_time = convertTimeToSecond(shift.start_time);
      const end_time = convertTimeToSecond(shift.end_time);
      return check_in_time <= start_time && check_out_time >= end_time;
    }
    return false;
  };

  isEmployeeGoodStatus = (shifts) => {
    for (const shift of shifts) {
      if (!this.isShiftLegit(shift)) {
        return false;
      }
    }
    return true;
  };

  renderStatus = () => {
    const {selectedDate, work_shifts} = this.props;
    const currentTime = moment(new Date());
    const selectedTime = moment.unix(selectedDate);
    if (currentTime.isSame(selectedTime, 'd')) {
      return (
        <View style={styles.currentOrFutureStatusContainer}>
          <Text style={styles.statusText}>Đang diễn ra</Text>
        </View>
      );
    } else {
      if (currentTime.isBefore(selectedTime)) {
        return (
          <View style={styles.currentOrFutureStatusContainer}>
            <Text style={styles.statusText}>Sắp diễn ra</Text>
          </View>
        );
      } else {
        return (
          <View
            style={
              this.isEmployeeGoodStatus(work_shifts)
                ? styles.legitStatusContainer
                : styles.violatedStatusContainer
            }>
            <Text style={styles.statusText}>
              {this.isEmployeeGoodStatus(work_shifts)
                ? 'Không vi phạm'
                : 'Có vi phạm'}
            </Text>
          </View>
        );
      }
    }
  };

  render() {
    const {avatar_url, name, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.containerItem}>
          <View style={styles.containerPerson}>
            <Image source={{uri: avatar_url}} style={styles.avatar} />
            <Text style={{fontWeight: '600'}}>{name}</Text>
          </View>
          <View style={styles.statusContainer}>
            {this.renderStatus()}
            <Image
              source={require('../../../assets/img/icons8-more-than-100.png')}
              style={{width: 15, height: 15}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
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
    height: theme.mainAvatar.height,
    width: theme.mainAvatar.width,
    borderRadius: theme.mainAvatar.borderRadius,
    marginRight: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentOrFutureStatusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#999999',
    borderRadius: 6,
    marginRight: 10,
  },
  legitStatusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#69C655',
    borderRadius: 6,
    marginRight: 10,
  },
  violatedStatusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E53223',
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    color: 'white',
  },
};

export default WorkShiftClockSelectionCell;
