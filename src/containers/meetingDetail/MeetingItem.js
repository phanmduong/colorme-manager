/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react';
import moment from 'moment';
import {FORMAT_TIME_MYSQL} from '../../constants/constant';
import {getMeetingStatus} from '../../helper';
import ModalAbsentReason from './ModalAbsentReason';

@observer
class MeetingItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isModalReasonVisible: false,
    };
  }

  checkCanJoin = () => {
    const date = moment(this.props.datetime, FORMAT_TIME_MYSQL).format('X');
    const now = moment().unix();
    if (now <= date - 18000) {
      return true;
    }
    return false;
  };

  onAccept = () => {
    const {meetingId, store} = this.props;
    const {joinMeeting} = store;
    if (this.checkCanJoin()) {
      joinMeeting(meetingId, 'accept', '');
    } else {
      Alert.alert('Thông báo', 'Bạn phải đăng kí trước 5 tiếng');
    }
  };

  onCheckin = () => {
    const {meetingId, store} = this.props;
    const {checkInMeeting} = store;
    checkInMeeting(meetingId);
  };

  onReject = () => {
    if (this.checkCanJoin()) {
      this.toggle();
    } else {
      Alert.alert('Thông báo', 'Bạn phải đăng kí trước 5 tiếng');
    }
  };

  toggle = () => {
    this.setState({
      isModalReasonVisible: !this.state.isModalReasonVisible,
    });
  };

  render() {
    const {
      name,
      total_issues,
      date,
      month,
      hour,
      joined,
      participates,
      isNow,
      meetingId,
      history,
    } = this.props;
    return (
      <View style={style.container}>
        <ImageBackground
          source={require('../../../assets/meeting/background.png')}
          style={style.containerContent}
          imageStyle={{borderRadius: 10}}>
          <View style={style.row}>
            <View style={style.flex1}>
              <Text style={style.timeDate}>{date}</Text>
            </View>
            <View style={style.flex1}>
              <Text style={style.title}>{name}</Text>
            </View>
          </View>
          <View style={style.row}>
            <View style={style.flex1}>
              <Text style={style.timeMonth}>Tháng {month}</Text>
            </View>
            <View style={style.flex1}>
              <View style={style.row}>
                <Text style={style.issue}>{total_issues} vấn đề</Text>
              </View>
            </View>
          </View>
          <View style={style.row}>
            <View style={style.flex1}>
              <Text style={style.timeHour}>{hour}</Text>
            </View>
            <View style={style.flex1}>
              <TouchableOpacity
                onPress={() => this.props.openModalParticipate(participates)}>
                <View style={style.row}>
                  {participates.slice(0, 3).map((participate, index) => {
                    return (
                      <Image
                        key={index}
                        style={style.avatar}
                        source={{uri: participate.user.avatar_url}}
                      />
                    );
                  })}
                  {participates.length > 3 && (
                    <Text style={style.numberParticipate}>
                      +{participates.length - 3}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={style.containerAction}>
          {joined && joined.status != 'pending' ? (
            <View>
              {joined.status != 'reject' ? (
                isNow || history ? (
                  joined.status == 'check_in' ? (
                    <View style={style.contentAction}>
                      <Image
                        style={style.iconAction2}
                        source={getMeetingStatus('check_in').icon}
                      />
                      <Text style={style.textAction}>
                        {getMeetingStatus('check_in').text}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={this.onCheckin}>
                      <View style={style.contentAction}>
                        <Image
                          style={style.iconAction}
                          source={getMeetingStatus('check_in').icon}
                        />
                        <Text style={style.textAction}>Check in</Text>
                      </View>
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity onPress={this.onReject}>
                    <View style={style.contentAction}>
                      <Image
                        style={style.iconAction2}
                        source={getMeetingStatus('accept').icon}
                      />
                      <Text style={style.textAction}>
                        {getMeetingStatus('accept').text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity onPress={this.onAccept}>
                  <View style={style.contentAction}>
                    <Image
                      style={[style.iconAction2, {marginTop: 20}]}
                      source={getMeetingStatus('reject').icon}
                    />
                    <Text style={style.textAction}>
                      {getMeetingStatus('reject').text}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={this.onAccept}>
                <Image
                  style={style.iconAction}
                  source={getMeetingStatus('accept').icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onReject}>
                <Image
                  style={[style.iconAction, {marginTop: 20}]}
                  source={getMeetingStatus('reject').icon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <ModalAbsentReason
          store={this.props.store}
          isVisible={this.state.isModalReasonVisible}
          closeModal={() => {
            this.toggle();
          }}
          meetingId={meetingId}
        />
      </View>
    );
  }
}

const style = {
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  containerContent: {
    flex: 2,
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  containerAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTime: {
    flexDirection: 'column',
    flex: 1,
  },
  timeDate: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
  },
  timeMonth: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  timeHour: {
    color: 'white',
    fontSize: 12,
    marginVertical: 5,
  },
  contentTitle: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    textTransform: 'uppercase',
    flexWrap: 'wrap',
    flexDirection: 'row',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  issue: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 12,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  avatar: {
    width: 14,
    height: 14,
    marginRight: 5,
    borderRadius: 7,
  },
  numberParticipate: {
    borderRadius: 7,
    height: 14,
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 12,
    paddingHorizontal: 5,
  },
  iconAction: {
    width: 35,
    height: 35,
  },
  textAction: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
  },
  iconAction2: {
    width: 50,
    height: 50,
  },
  contentAction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default MeetingItem;
