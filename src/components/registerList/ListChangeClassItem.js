import React from 'react';
import {
  Animated,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {Thumbnail} from 'native-base';
import theme from '../../styles';
import {getShortName} from '../../helper';
const {width} = Dimensions.get('window');

const maxWidthProcess = width / 4;

const ListChangeClassItem = ({
  name,
  study_time,
  address,
  avatar_url,
  total_paid,
  total_register,
  target,
  regis_target,
  teacher,
  teacher_assistant,
  changeClass,
  classId,
  registerId,
  type,
}) => {
  let tmpTotalPaid, tmpTotalRegister;
  tmpTotalPaid = total_paid < target ? total_paid : target;
  tmpTotalRegister =
    total_register < regis_target ? total_register : regis_target;

  const typeCard = () => (
    <View
      style={{
        ...styles.card,
        ...{
          backgroundColor: type === 'active' ? '#2ACC4C' : '#f3bc00',
        },
      }}>
      <Text style={styles.campaign}>
        {type === 'active' ? 'Hoạt động' : 'Chờ'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Thumbnail small source={{uri: avatar_url}} style={theme.mainAvatar} />
        <Text numberOfLines={1} style={styles.className}>
          {name}
        </Text>
      </View>
      <View style={styles.row}>
        <Thumbnail small style={theme.mainAvatar} />
        <View style={styles.infoContainer}>
          <View style={styles.containerSubTitle}>
            {teacher && (
              <View
                style={{
                  ...styles.card,
                  ...{
                    backgroundColor:
                      !teacher.color || teacher.color === ''
                        ? theme.processColor1
                        : '#' + teacher.color,
                    marginRight: 5,
                  },
                }}>
                <Text style={styles.saler}>{getShortName(teacher.name)}</Text>
              </View>
            )}
            {teacher_assistant && (
              <View
                style={{
                  ...styles.card,
                  ...{
                    backgroundColor:
                      !teacher_assistant.color || teacher_assistant.color === ''
                        ? theme.processColor1
                        : '#' + teacher_assistant.color,
                  },
                  marginRight: 5,
                }}>
                <Text style={styles.campaign}>
                  {teacher_assistant.name.trim()}
                </Text>
              </View>
            )}
            {type && typeCard()}
          </View>
          <View>
            {study_time ? (
              <Text
                numberOfLines={1}
                style={[styles.classInfoContainer, {paddingTop: 0}]}>
                {study_time}
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
                    width:
                      target > 0
                        ? (maxWidthProcess * tmpTotalPaid) / target
                        : 0,
                    backgroundColor: theme.successColor,
                  },
                ]}
              />
            </View>
            <Text style={styles.textProcess}>
              {total_paid}/{target} hoàn thành học phí
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
                      regis_target > 0
                        ? (maxWidthProcess * tmpTotalRegister) / regis_target
                        : 0,
                    backgroundColor: theme.processColor2,
                  },
                ]}
              />
            </View>
            <Text style={styles.textProcess}>
              {total_register}/{regis_target} đăng kí
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => changeClass(classId, registerId)}>
              <View style={styles.button}>
                <Text style={{fontSize: 16}}>Đổi sang lớp này</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginHorizontal: theme.mainHorizontal,
    paddingBottom: 20,
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
  className: {
    fontWeight: '600',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 15,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default ListChangeClassItem;
