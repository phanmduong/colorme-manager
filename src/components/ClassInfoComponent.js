import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import theme from '../styles';
import Spinkit from 'react-native-spinkit';
import InfoRow from './common/InfoRow';
import {CLASS_STATUS_FILTER} from '../constants/constant';
const {width} = Dimensions.get('window');

const ClassInfoComponent = ({loadClassInfo, ...props}) => {
  if (props.loadingClassInfo) {
    return (
      <View style={styles.container}>
        <Spinkit
          isVisible
          color={theme.mainColor}
          type="Wave"
          size={width / 8}
        />
      </View>
    );
  } else {
    const type = CLASS_STATUS_FILTER.find(
      (filter) => filter.value === props.classInfo.type,
    ).name;
    return (
      <ScrollView
        style={{marginHorizontal: theme.mainHorizontal}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={props.loadingClassInfo}
            onRefresh={loadClassInfo}
          />
        }>
        <View style={styles.mainInfoContainer}>
          {props.classInfo.course ? (
            <Image
              source={{uri: props.classInfo.course.icon_url}}
              style={theme.largeAvatar}
            />
          ) : (
            <Image
              source={require('../../assets/img/icons8-male-user-96.png')}
              style={theme.largeAvatar}
            />
          )}
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16}}>{props.classInfo.name}</Text>
          </View>
        </View>
        <InfoRow
          title={'Giảng viên'}
          value={props.classInfo.teacher && props.classInfo.teacher.name}
        />
        <InfoRow
          title={'Trợ giảng'}
          value={
            props.classInfo.teacher_assistant &&
            props.classInfo.teacher_assistant.name
          }
        />
        <InfoRow title={'Lịch học'} value={props.classInfo.study_time} />
        <InfoRow title={'Mô tả'} value={props.classInfo.description} />
        <InfoRow
          title={'Chỉ tiêu đăng kí'}
          value={props.classInfo.regis_target}
        />
        <InfoRow title={'Chỉ tiêu nộp tiền'} value={props.classInfo.target} />
        <InfoRow
          title={'Ngày khai giảng'}
          value={props.classInfo.datestart_vi}
        />
        <InfoRow title={'Ngày bế giảng'} value={props.classInfo.date_end_vi} />
        <InfoRow
          title={'Ngày bắt đầu tuyển sinh'}
          value={props.classInfo.enroll_start_date_vi}
        />
        <InfoRow
          title={'Ngày kết thúc tuyển sinh'}
          value={props.classInfo.enroll_end_date_vi}
        />
        <InfoRow title={'Trạng thái'} value={type} />
        <InfoRow
          title={'Môn học'}
          value={props.classInfo.course && props.classInfo.course.name}
        />
        <InfoRow
          title={'Khóa'}
          value={props.classInfo.gen && props.classInfo.gen.name}
        />
      </ScrollView>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainInfoContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
};

export default ClassInfoComponent;
