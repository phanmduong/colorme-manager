import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import TeachingScheduleComponent from '../components/TeachingScheduleComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import {bindActionCreators} from 'redux';
import * as teachingScheduleActions from '../actions/teachingScheduleActions';
import * as saveRegisterActions from '../actions/saveRegisterActions';
import * as baseActions from '../actions/baseActions';
import * as classActions from '../actions/classActions';
import * as staffActions from '../actions/staffActions';

function TeachingScheduleContainer(props) {
  useEffect(() => {
    loadSchedules();
    loadProvinces();
    loadDataBase();
    loadCourses();
    loadStaff('');
  }, []);

  function loadSchedules() {
    props.teachingScheduleActions.loadSchedules(
      props.baseId,
      props.courseId,
      props.teacherId,
      props.provinceId,
      props.type,
      props.startTime,
      props.endTime,
      props.token,
    );
  }

  function loadStaff(search) {
    props.staffActions.getStaff(false, 1, search, props.token);
  }

  function loadProvinces() {
    props.saveRegisterActions.loadProvinces(props.token);
  }

  function loadCourses() {
    props.saveRegisterActions.loadCourses(props.token);
  }

  function loadDataBase() {
    props.baseActions.loadDataBase(props.token);
  }

  function onSelectStartDate(date) {
    props.teachingScheduleActions.selectedStartDate(date);
  }

  function onSelectEndDate(date) {
    props.teachingScheduleActions.selectedEndDate(date);
  }

  function onSelectProvinceId(id) {
    props.teachingScheduleActions.selectedProvinceId(id);
  }

  function onSelectBaseId(id) {
    props.teachingScheduleActions.selectedBaseId(id);
  }

  function onSelectCourseId(id) {
    props.teachingScheduleActions.selectedCourseId(id);
  }

  function onSelectTeacherId(id) {
    props.teachingScheduleActions.selectedTeacherId(id);
  }

  function onSelectType(id) {
    props.teachingScheduleActions.selectedType(id);
  }

  function onSelectedItem(classData) {
    props.classActions.selectedClassId(classData.id);
    props.navigation.navigate('ListStudentClass', {
      name: classData.name,
      avatar_url: classData.course && classData.course.icon_url,
    });
  }

  return (
    <TeachingScheduleComponent
      {...props}
      onSelectEndDate={onSelectEndDate}
      onSelectStartDate={onSelectStartDate}
      onSelectProvinceId={onSelectProvinceId}
      loadSchedules={loadSchedules}
      onSelectBaseId={onSelectBaseId}
      onSelectCourseId={onSelectCourseId}
      onSelectClass={onSelectedItem}
      onSelectTeacherId={onSelectTeacherId}
      onSelectType={onSelectType}
      loadStaff={loadStaff}
    />
  );
}

TeachingScheduleContainer.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={styles.row}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Lịch dạy</Text>
        </View>
      </View>
    ),
  };
};

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  row: theme.row,
};

function mapStateToProps(state) {
  return {
    token: state.login.token,
    classes: state.teachingSchedule.classes,
    loading: state.teachingSchedule.loading,
    error: state.teachingSchedule.error,
    teacherId: state.teachingSchedule.teacherId,
    baseId: state.teachingSchedule.baseId,
    courseId: state.teachingSchedule.courseId,
    provinceId: state.teachingSchedule.provinceId,
    type: state.teachingSchedule.type,
    startTime: state.teachingSchedule.startTime,
    endTime: state.teachingSchedule.endTime,
    isLoadingProvinces: state.saveRegister.isLoadingProvinces,
    errorLoadingProvinces: state.saveRegister.errorLoadingProvinces,
    provinces: state.saveRegister.provinces,
    isLoadingBase: state.base.isLoading,
    errorLoadingBase: state.base.error,
    baseData: state.base.baseData,
    isLoadingCourses: state.saveRegister.isLoadingCourses,
    errorLoadingCourses: state.saveRegister.errorLoadingCourses,
    courses: state.saveRegister.courses,
    staff: state.staff.staff,
    isLoadingStaff: state.staff.isLoadingStaff,
    errorStaff: state.staff.errorStaff,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teachingScheduleActions: bindActionCreators(
      teachingScheduleActions,
      dispatch,
    ),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
    baseActions: bindActionCreators(baseActions, dispatch),
    classActions: bindActionCreators(classActions, dispatch),
    staffActions: bindActionCreators(staffActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeachingScheduleContainer);
