import React from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../styles';
var {height, width} = Dimensions.get('window');

class WorkShiftRegisterHoursReviewModal extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  totalHoursReport = () => {
    let hoursMap = {};
    for (let i = 0; i < this.props.dates.length; i++) {
      for (let j = 0; j < this.props.dates[i].shifts.length; j++) {
        for (let k = 0; k < this.props.dates[i].shifts[j].users.length; k++) {
          if (this.props.dates[i].shifts[j].users[k].id in hoursMap) {
            let totalHours =
              hoursMap[this.props.dates[i].shifts[j].users[k].id].totalHours;
            totalHours++;
            hoursMap[this.props.dates[i].shifts[j].users[k].id] = {
              totalHours: totalHours,
              name: this.props.dates[i].shifts[j].users[k].name,
              avatar_url: this.props.dates[i].shifts[j].users[k].avatar_url,
            };
          } else {
            hoursMap[this.props.dates[i].shifts[j].users[k].id] = {
              totalHours: 1,
              name: this.props.dates[i].shifts[j].users[k].name,
              avatar_url: this.props.dates[i].shifts[j].users[k].avatar_url,
            };
          }
        }
      }
    }
    return hoursMap;
  };

  renderTotalHoursReport = () => {
    let totalHoursReport = this.totalHoursReport();
    let sortable = [];
    for (let key in totalHoursReport) {
      sortable.push(totalHoursReport[key]);
    }
    sortable.sort(function(a, b) {
      return a.totalHours - b.totalHours;
    });
    return sortable.map(value => (
      <View style={styles.containerItem}>
        <View style={styles.containerPerson}>
          <Image source={{uri: value.avatar_url}} style={styles.avatar} />
          <View>
            <Text style={{fontWeight: '600'}}>{value.name}</Text>
          </View>
        </View>
        <View style={styles.callBorder}>
          <Text style={{fontWeight: '600', color: 'white'}}>
            {value.totalHours}H/20H
          </Text>
        </View>
      </View>
    ));
  };

  render() {
    return (
      <Modal
        style={styles.fullModal}
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.closeModal}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}>
        <View style={styles.fullView}>
          <View style={styles.headerRow}>
            <View>
              <Text
                style={[styles.headerTitle, {fontWeight: '600', fontSize: 17}]}>
                Thống kê lịch làm việc tuần {this.props.weekIndex}
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={this.props.closeModal}>
              <Image
                source={require('../../../assets/img/closeIcon.png')}
                style={styles.closeIcon}
              />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView>{this.renderTotalHoursReport()}</ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = {
  fullModal: {
    marginVertical: height * 0.15,
  },
  fullView: {
    flexGrow: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  headerTitle: {
    fontSize: 15,
  },
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
    height: theme.shiftAvatar.height,
    width: theme.shiftAvatar.width,
    borderRadius: theme.shiftAvatar.borderRadius,
    marginRight: 10,
  },
  callBorder: {
    backgroundColor: '#00B241',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
};

export default WorkShiftRegisterHoursReviewModal;
