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
import {displayUnixDate} from '../helper';
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
              source={{uri: props.classInfo.course?.icon_url}}
              style={theme.largeAvatar}
            />
          ) : (
            <Image
              source={require('../../assets/img/icons8-male-user-96.png')}
              style={theme.largeAvatar}
            />
          )}
          <Text style={styles.title}>{props.classInfo.name}</Text>
          <Text style={styles.subTitle}>{props.classInfo.course?.name}</Text>
          <Text style={styles.subTitle}>
            {props.classInfo.base?.name + ' - ' + props.classInfo.base?.address}
          </Text>
          <Text style={styles.subTitle}>{props.classInfo.room?.name}</Text>
        </View>
        {props.classInfo.teachers?.map((teacher) => (
          <InfoRow title={'Giảng viên'} value={teacher.name} />
        ))}
        {props.classInfo.teaching_assistants?.map((assist) => (
          <InfoRow title={'Trợ giảng'} value={assist.name} />
        ))}
        <InfoRow title={'Lịch học'} value={props.classInfo.schedule?.name} />
        <InfoRow
          title={'Mục tiêu đóng tiền'}
          value={`${props.classInfo.register_target?.current_target}/${props.classInfo.register_target?.target}`}
        />
        <InfoRow
          title={'Đã đóng tiền'}
          value={`${props.classInfo.target?.current_target}/${props.classInfo.target?.target}`}
        />
        <InfoRow title={'Ngày bắt đầu'} value={props.classInfo.datestart} />
        <InfoRow
          title={'Thời gian bắt đầu tuyển sinh'}
          value={displayUnixDate(props.classInfo.enroll_start_date)}
        />
        <InfoRow
          title={'Thời gian kết thúc tuyển sinh'}
          value={displayUnixDate(props.classInfo.enroll_end_date)}
        />
        <InfoRow title={'Môn học'} value={props.classInfo.course?.name} />
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 25,
  },
  subTitle: {
    fontSize: 16,
    marginTop: 5,
  },
};

export default ClassInfoComponent;
