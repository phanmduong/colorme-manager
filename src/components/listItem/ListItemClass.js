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
import {getShortName} from '../../helper';
var {height, width} = Dimensions.get('window');

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
    if (this.props.errorClassStatus) {
      Alert.alert('Thông báo', 'Có lỗi xảy ra');
    }
  };

  content() {
    var {
      nameClass,
      studyTime,
      address,
      avatar,
      totalPaid,
      totalRegisters,
      paidTarget,
      registerTarget,
      teach,
      assist,
      classId,
      courseId,
      baseId,
      classData,
      selectedGenId,
      selectedBaseId,
    } = this.props;
    var tmpTotalPaid, tmpTotalRegister;
    tmpTotalPaid = totalPaid < paidTarget ? totalPaid : paidTarget;
    tmpTotalRegister =
      totalRegisters < registerTarget ? totalRegisters : registerTarget;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Thumbnail small source={{uri: avatar}} />
          <Text
            numberOfLines={1}
            style={{
              fontWeight: '600',
              flex: 1,
              flexWrap: 'wrap',
              marginLeft: 15,
              fontSize: 18,
            }}>
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
          <Thumbnail small />
          <View style={styles.infoContainer}>
            <View style={styles.containerSubTitle}>
              {teach ? (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !teach.color || teach.color === ''
                          ? theme.processColor1
                          : '#' + teach.color,
                      marginRight: 5,
                    },
                  }}>
                  <Text style={styles.saler}>{getShortName(teach.name)}</Text>
                </View>
              ) : (
                <View />
              )}
              {assist ? (
                <View
                  style={{
                    ...styles.card,
                    ...{
                      backgroundColor:
                        !assist.color || assist.color === ''
                          ? theme.processColor1
                          : '#' + assist.color,
                    },
                  }}>
                  <Text style={styles.campaign}>{assist.name.trim()}</Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {studyTime ? (
                <Text
                  numberOfLines={1}
                  style={[styles.classInfoContainer, {paddingTop: 0}]}>
                  {studyTime}
                </Text>
              ) : null}
              {address ? (
                <Text numberOfLines={1} style={styles.classInfoContainer}>
                  {address}
                </Text>
              ) : null}
            </View>
            <View style={styles.processAndText}>
              <View
                style={{
                  ...styles.process,
                  ...styles.containerProcess,
                  ...{
                    backgroundColor: '#F6F6F6',
                  },
                }}>
                <Animated.View
                  style={[
                    styles.process,
                    styles.bar,
                    {
                      width: (maxWidthProcess * tmpTotalPaid) / paidTarget,
                      backgroundColor: theme.successColor,
                    },
                  ]}
                />
              </View>
              <Text style={styles.textProcess}>
                {totalPaid}/{paidTarget} hoàn thành học phí
              </Text>
            </View>
            <View style={styles.processAndText}>
              <View
                style={{
                  ...styles.process,
                  ...styles.containerProcess,
                  ...{
                    backgroundColor: '#F6F6F6',
                  },
                }}>
                <Animated.View
                  style={[
                    styles.process,
                    {
                      width:
                        (maxWidthProcess * tmpTotalRegister) / registerTarget,
                      backgroundColor: theme.processColor2,
                    },
                  ]}
                />
              </View>
              <Text style={styles.textProcess}>
                {totalRegisters}/{registerTarget} đăng kí
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SaveRegister', {
                    classId: classId,
                    courseId: courseId,
                    baseId: baseId,
                  })
                }>
                <View style={styles.button}>
                  <Text style={{fontSize: 16}}>Thêm học viên</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('EditClass', {
                    classData: classData,
                    selectedGenId: selectedGenId,
                    selectedBaseId: selectedBaseId,
                  })
                }>
                <View style={[{marginLeft: 10}, styles.button]}>
                  <Text style={{fontSize: 16}}>Sửa</Text>
                </View>
              </TouchableOpacity>
            </View>
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
            onPress={() => this.props.onPress(this.props.classId)}>
            {this.content()}
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableNativeFeedback
            onPress={() => this.props.onPress(this.props.classId)}>
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
    marginHorizontal: 16,
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
  },
};

export default ListItemClass;
