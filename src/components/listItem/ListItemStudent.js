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
import Call from '../common/Call';
import {Thumbnail} from 'native-base';
import {dotNumber, getShortName} from '../../helper';
import CallRegisterModal from '../infoStudent/CallRegisterModal';
import SubmitMoneyModal from '../infoStudent/SubmitMoneyModal';
import * as Progress from 'react-native-progress';

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
      return (accum += currentValue.status ? 1 : 0);
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
      name,
      avatar,
      money,
      phone,
      saler,
      campaign,
      status,
      email,
      classInfo,
      studentId,
      next_code,
      next_waiting_code,
      registerId,
      register_status,
      source,
    } = this.props;
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.row}>
            <View style={{position: 'relative'}}>
              <Thumbnail
                small
                source={{uri: avatar}}
                style={theme.mainAvatar}
              />
            </View>
            <Text numberOfLines={1} style={styles.className}>
              {name}
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
            <View style={styles.containerSubTitle}>
              {saler && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !saler.color || saler.color === ''
                          ? theme.processColor1
                          : '#' + saler.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.saler}>{getShortName(saler.name)}</Text>
                </View>
              )}
              {campaign && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !campaign.color || campaign.color === ''
                          ? theme.processColor1
                          : '#' + campaign.color,
                    },
                  }}>
                  <Text style={styles.campaign}>{campaign.name.trim()}</Text>
                </View>
              )}
              {register_status && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !register_status.color || register_status.color === ''
                          ? theme.processColor1
                          : register_status.color,
                    },
                  }}>
                  <Text style={styles.campaign}>
                    {register_status.name.trim()}
                  </Text>
                </View>
              )}
              {source && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !source.color || source.color === ''
                          ? theme.processColor1
                          : '#' + source.color,
                    },
                  }}>
                  <Text style={styles.campaign}>{source.name.trim()}</Text>
                </View>
              )}
            </View>
            <View>
              {phone ? <Call url={'tel:' + phone} phone={phone} /> : null}
              {email ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {email}
                </Text>
              ) : null}
            </View>
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
                {this.getAttendanceInfo().total_attendances} buổi
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              {/*<TouchableOpacity*/}
              {/*  onPress={() => {*/}
              {/*    Linking.openURL(`tel:${phone}`);*/}
              {/*    this.toggleCallModal();*/}
              {/*  }}>*/}
              {/*  <View style={styles.button}>*/}
              {/*    <Text style={{fontSize: 16}}>Gọi điện</Text>*/}
              {/*  </View>*/}
              {/*</TouchableOpacity>*/}
              {!status ? (
                <TouchableOpacity
                    // onPress={() => this.toggleMoneyModal()}
                >
                  <View style={styles.button}>
                    <Text style={{fontSize: 16}}>Nộp học phí</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                    // onPress={() => this.toggleMoneyModal()}
                >
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
            isVisible={this.state.callModalVisible}
            onSwipeComplete={this.toggleCallModal}
            imageSource={avatar}
            email={email}
            phone={phone}
            changeCallStatus={this.props.changeCallStatus}
            student_id={studentId}
            token={this.props.token}
            errorChangeCallStatus={this.props.errorChangeCallStatus}
          />
          <SubmitMoneyModal
            isVisible={this.state.moneyModalVisible}
            onSwipeComplete={this.toggleMoneyModal}
            avatar_url={avatar}
            classAva={classInfo.icon_url}
            name={name}
            next_code={next_code}
            next_waiting_code={next_waiting_code}
            token={this.props.token}
            submitMoney={this.props.submitMoney}
            register_id={registerId}
            errorSubmitMoney={this.props.errorSubmitMoney}
            room={classInfo.room.name}
            base={classInfo.base.address}
            className={classInfo.name}
            study_time={classInfo.study_time}
            description={classInfo.description}
            type={classInfo.type}
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
              this.props.setStudentId(this.props.studentId);
              this.props.navigation.navigate('InfoStudent', {
                studentId: this.props.studentId,
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
              this.props.setStudentId(this.props.studentId);
              this.props.navigation.navigate('InfoStudent', {
                studentId: this.props.studentId,
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
  containerExpand: {
    marginLeft: 55,
    paddingTop: 5,
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontWeight: '900',
    fontSize: Platform.isPad ? 18 : 13,
    marginRight: 5,
  },
  subTitle: {
    color: '#7d7d7d',
    fontSize: 12,
  },
  icon: {
    fontSize: 20,
    color: theme.colorTitle,
  },
  line: {
    height: 1,
    backgroundColor: theme.borderColor,
    marginRight: 20,
    marginLeft: 75,
  },
  email: {
    color: theme.colorSubTitle,
    marginTop: 5,
    fontSize: Platform.isPad ? 18 : 13,
  },
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCall: {
    position: 'absolute',
    top: 25,
    left: 25,
    height: 12,
    width: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'white',
  },

  listItemContainer: {
    marginHorizontal: theme.mainHorizontal,
    marginVertical: 10,
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
  containerSubTitle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  card: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saler: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  campaign: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
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
  },
  collectedButton: {
    backgroundColor: '#C50000',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  classInfoContainer: {
    paddingTop: 5,
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
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
