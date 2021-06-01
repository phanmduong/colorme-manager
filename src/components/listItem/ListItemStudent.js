import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking,
} from 'react-native';
import theme from '../../styles';
import {Thumbnail} from 'native-base';
import {dotNumber} from '../../helper';
import CallRegisterModal from '../infoStudent/CallRegisterModal';
import SubmitMoneyModal from '../infoStudent/SubmitMoneyModal';
import * as Progress from 'react-native-progress';
import moment from 'moment';

class ListItemStudent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      callModalVisible: false,
      moneyModalVisible: false,
    };
  }

  toggleCallModal = () => {
    this.setState({callModalVisible: !this.state.callModalVisible});
  };

  toggleMoneyModal = () => {
    this.setState({moneyModalVisible: !this.state.moneyModalVisible});
  };

  getAttendanceInfo = () => {
    const attended = this.props.attendances.reduce((accum, currentValue) => {
      return (accum += currentValue.hw_status ? 1 : 0);
    }, 0);
    return {attended, total_attendances: this.props.attendances.length};
  };

  getAttendancePercentage = () => {
    const attendanceInfo = this.getAttendanceInfo();
    if (attendanceInfo.total_attendances <= 0) {
      return 0;
    } else {
      return attendanceInfo.attended / attendanceInfo.total_attendances;
    }
  };

  content() {
    const {
      money,
      paidTime,
      classInfo,
      registerId,
      code,
      receivedBook,
      user,
    } = this.props;
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.row}>
            <View style={{position: 'relative'}}>
              <Thumbnail
                small
                source={{uri: user.avatar_url}}
                style={theme.mainAvatar}
              />
            </View>
            <Text numberOfLines={1} style={styles.className}>
              {user.name}
            </Text>
          </View>
          <Image
            source={require('../../../assets/img/icons8-more-than-100.png')}
            style={{width: 15, height: 15}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.classAva} />
          <View style={styles.infoContainer}>
            <View style={styles.progressContainer}>
              <Progress.Bar
                width={120}
                height={4}
                progress={this.getAttendancePercentage()}
                color={'#32CA41'}
                unfilledColor={'#E0E0E0'}
                borderColor={'white'}
                borderRadius={10}
              />
              <Text style={styles.attendanceText}>
                {this.getAttendanceInfo().attended}/
                {this.getAttendanceInfo().total_attendances} bài tập
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${user.phone}`);
                  this.toggleCallModal();
                }}>
                <View style={styles.button}>
                  <Text style={{fontSize: 16}}>Gọi điện</Text>
                </View>
              </TouchableOpacity>
              {!paidTime ? (
                <TouchableOpacity onPress={() => this.toggleMoneyModal()}>
                  <View style={styles.button}>
                    <Text style={{fontSize: 16}}>Nộp học phí</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => this.toggleMoneyModal()}>
                  <View style={styles.collectedButton}>
                    <Text style={{fontSize: 16, color: 'white'}}>
                      {dotNumber(money)} vnđ
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <CallRegisterModal
            {...this.props}
            isVisible={this.state.callModalVisible}
            onSwipeComplete={this.toggleCallModal}
            avatar_url={user.avatar_url}
            email={user.email}
            phone={user.phone}
            changeCallStatus={this.props.changeCallStatus}
            studentId={user.id}
          />
          <SubmitMoneyModal
            {...this.props}
            isVisible={this.state.moneyModalVisible}
            onSwipeComplete={this.toggleMoneyModal}
            avatar_url={user.avatar_url}
            name={user.name}
            submitMoney={this.props.submitMoney}
            registerId={registerId}
            errorSubmitMoney={this.props.errorSubmitMoney}
            classItem={classInfo}
            code={code}
            receivedBook={receivedBook && moment(receivedBook).unix()}
          />
        </View>
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.setStudentId(this.props.user.id);
              this.props.navigation.navigate('InfoStudent', {
                studentId: this.props.user.id,
              });
            }}>
            <View style={styles.containerAll}>{this.content()}</View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableNativeFeedback
            onPress={() => {
              this.props.setStudentId(this.props.user.id);
              this.props.navigation.navigate('InfoStudent', {
                studentId: this.props.user.id,
              });
            }}>
            <View style={styles.containerAll}>{this.content()}</View>
          </TouchableNativeFeedback>
        </View>
      );
    }
  }
}

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerAll: {
    paddingHorizontal: theme.mainHorizontal,
    paddingVertical: 16,
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classAva: {
    width: 37,
    height: 37,
    borderRadius: 19,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 10,
  },
  collectedButton: {
    backgroundColor: '#C50000',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  progressContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendanceText: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default ListItemStudent;
