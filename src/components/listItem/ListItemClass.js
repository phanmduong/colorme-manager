import React from 'react';
import {
  Dimensions,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Animated,
  Switch,
  Alert,
  View,
  Text,
} from 'react-native';
import {Thumbnail} from 'native-base';
import theme from '../../styles';
import {getShortName, isEmptyInput, localeDay} from '../../helper';
import moment from 'moment';
var {height, width} = Dimensions.get('window');
import * as Progress from 'react-native-progress/';

var maxWidthProcess = width / 4;

class ListItemClass extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      classStatus: this.props.classStatus === 1,
    };
  }

  toggleSwitch = () => {
    this.setState({classStatus: !this.state.classStatus});
    this.props.changeClassStatus(this.props.classId);
  };

  content() {
    const {
      nameClass,
      avatar,
      teach,
      assist,
      classId,
      classData,
      selectedGenId,
      selectedBaseId,
      teachers,
      teaching_assistants,
      date_start,
      description,
      schedule,
      base,
      target,
      register_target,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Thumbnail small source={{uri: avatar}} style={theme.mainAvatar} />
          <Text numberOfLines={1} style={styles.nameClass}>
            {nameClass}
          </Text>
          {this.props.user.role === 2 ? (
            <Switch
              value={this.state.classStatus}
              onValueChange={this.toggleSwitch}
            />
          ) : null}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Thumbnail small style={theme.mainAvatar} />
          <View style={styles.infoContainer}>
            <View style={styles.containerSubTitle}>
              {teach && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !teach.color || teach.color === ''
                          ? theme.processColor1
                          : teach.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.saler}>{getShortName(teach.name)}</Text>
                </View>
              )}
              {assist && (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !assist.color || assist.color === ''
                          ? theme.processColor1
                          : assist.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.campaign}>{assist.name.trim()}</Text>
                </View>
              )}
              {teachers.map((teacher) => (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !teacher.color || teacher.color === ''
                          ? theme.processColor1
                          : teacher.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.saler}>{getShortName(teacher.name)}</Text>
                </View>
              ))}
              {teaching_assistants.map((teacher) => (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !teacher.color || teacher.color === ''
                          ? theme.processColor1
                          : teacher.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.saler}>{getShortName(teacher.name)}</Text>
                </View>
              ))}
            </View>
            <View>
              {description ? (
                <Text
                  numberOfLines={1}
                  style={[styles.classInfoContainer, {paddingTop: 0}]}>
                  {description}
                </Text>
              ) : null}
              {schedule?.study_sessions &&
                schedule.study_sessions.map((session) => (
                  <Text numberOfLines={1} style={styles.classInfoContainer}>
                    {localeDay(session.weekday)}:{' '}
                    {moment
                      .unix(session.start_time)
                      .utcOffset('+0700')
                      .format('HH:mm')}{' '}
                    -{' '}
                    {moment
                      .unix(session.end_time)
                      .utcOffset('+0700')
                      .format('HH:mm')}
                  </Text>
                ))}
              {date_start ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  Khải giảng:{' '}
                  {moment.unix(date_start).format('dddd DD/MM/YYYY')}
                </Text>
              ) : null}
              {base?.name ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {base.name}
                </Text>
              ) : null}
            </View>
            {target && (
              <View style={styles.processAndText}>
                <Progress.Bar
                  progress={
                    target.target > 0
                      ? target.current_target / target.target
                      : 0
                  }
                  unfilledColor={'#F6F6F6'}
                  color={theme.successColor}
                  borderWidth={0}
                />
                <Text style={styles.textProcess}>
                  {target.current_target}/{target.target} đã đóng tiền
                </Text>
              </View>
            )}
            {register_target && (
              <View style={styles.processAndText}>
                <Progress.Bar
                  progress={
                    register_target.target > 0
                      ? register_target.current_target / register_target.target
                      : 0
                  }
                  unfilledColor={'#F6F6F6'}
                  color={theme.processColor2}
                  borderWidth={0}
                />
                <Text style={styles.textProcess}>
                  {register_target.current_target}/{register_target.target} đăng
                  kí
                </Text>
              </View>
            )}

            {/*TODO*/}

            {/*<View style={styles.buttonContainer}>*/}
            {/*  <TouchableOpacity*/}
            {/*    onPress={() =>*/}
            {/*      this.props.navigation.navigate('SaveRegister', {*/}
            {/*        classId: classId,*/}
            {/*      })*/}
            {/*    }>*/}
            {/*    <View style={styles.button}>*/}
            {/*      <Text style={{fontSize: 16}}>Thêm học viên</Text>*/}
            {/*    </View>*/}
            {/*  </TouchableOpacity>*/}
            {/*  <TouchableOpacity*/}
            {/*    onPress={() =>*/}
            {/*      this.props.navigation.navigate('EditClass', {*/}
            {/*        classData: classData,*/}
            {/*        selectedGenId: selectedGenId,*/}
            {/*        selectedBaseId: selectedBaseId,*/}
            {/*      })*/}
            {/*    }>*/}
            {/*    <View style={[{marginLeft: 10}, styles.button]}>*/}
            {/*      <Text style={{fontSize: 16}}>Sửa</Text>*/}
            {/*    </View>*/}
            {/*  </TouchableOpacity>*/}
            {/*</View>*/}
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.props.onPress(this.props.classData)}>
            {this.content()}
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableNativeFeedback
            onPress={() => this.props.onPress(this.props.classData)}>
            {this.content()}
          </TouchableNativeFeedback>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    marginHorizontal: theme.mainHorizontal,
    paddingTop: 20,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  classInfoContainer: {
    paddingTop: 5,
    flex: 1,
    flexWrap: 'wrap',
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
  button: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  containerContentProcess: {
    paddingTop: 5,
  },
  containerProcess: {
    marginVertical: 5,
    backgroundColor: theme.secondColorOpacity,
    width: maxWidthProcess,
  },
  process: {
    borderRadius: 5,
    height: 5,
    backgroundColor: theme.secondColor,
  },
  processAndText: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textProcess: {
    marginLeft: 15,
  },
  containerSubTitle: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  nameClass: {
    fontWeight: '600',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 15,
    fontSize: 18,
  },
};

export default ListItemClass;
