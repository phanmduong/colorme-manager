/**
 * Created by phanmduong on 4/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ClassComponent from '../components/ClassComponent';
import * as classActions from '../actions/classActions';
import * as saveRegisterActions from '../actions/saveRegisterActions';
import * as genActions from '../actions/genActions';
import * as analyticsActions from '../actions/analyticsActions';
import * as staffActions from '../actions/staffActions';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

class ClassContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectedItem = this.onSelectedItem.bind(this);
    this.state = {
      checkedDataGen: false,
      checkedClasses: false,
    };
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <View style={styles.headerLeftContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'chevron-left'}
            size={33}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.name}>Lớp học</Text>
        </View>
      </View>
    ),
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('AddClass')}>
          <View style={styles.headerIconContainer}>
            <MatIcon name={'add-circle'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
      </View>
    ),
  });

  componentDidMount() {
    this.props.genActions.loadDataGen(this.props.token, this.props.domain);
    this.props.classActions.loadDataCourse(this.props.token, this.props.domain);
    this.props.classActions.loadBaseData(this.props.token, this.props.domain);
    this.props.classActions.loadRooms(this.props.token, this.props.domain);
    this.props.saveRegisterActions.loadProvinces(
      this.props.token,
      this.props.domain,
    );
    this.loadDataClass();
    this.loadStaff('');
    this.loadStatuses();
  }

  loadDataClass = () => {
    if (this.props.currentPage < this.props.totalPage) {
      this.props.classActions.loadDataClass(
        false,
        this.props.currentPage + 1,
        this.props.selectedCourseId,
        this.props.selectedBaseId,
        this.props.provinceId,
        this.props.roomId,
        this.props.teacherId,
        this.props.type,
        this.props.enrollStartTime,
        this.props.enrollEndTime,
        this.props.startTime,
        this.props.endTime,
        this.props.search,
        this.props.token,
        this.props.domain,
      );
    }
  };

  onRefresh = () => {
    this.props.classActions.refreshDataClass(
      this.props.selectedCourseId,
      this.props.selectedBaseId,
      this.props.provinceId,
      this.props.roomId,
      this.props.teacherId,
      this.props.type,
      this.props.enrollStartTime,
      this.props.enrollEndTime,
      this.props.startTime,
      this.props.endTime,
      this.props.search,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectedItem(classData) {
    this.props.classActions.selectedClassId(classData.id);
    this.props.navigation.navigate('ListStudentClass', {
      name: classData.name,
      avatar_url: classData.course && classData.course.icon_url,
    });
  }

  changeClassStatus = (classId) => {
    this.props.classActions.changeClassStatus(
      classId,
      this.props.token,
      this.props.domain,
    );
  };

  searchClass = (search) => {
    this.props.classActions.searchClass(
      this.props.selectedCourseId,
      this.props.selectedBaseId,
      this.props.provinceId,
      this.props.roomId,
      this.props.teacherId,
      this.props.type,
      this.props.enrollStartTime,
      this.props.enrollEndTime,
      this.props.startTime,
      this.props.endTime,
      search,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectGenId = (id) => {
    this.props.classActions.selectedGenId(id);
  };

  onSelectBaseId = (id) => {
    this.props.classActions.selectedBaseId(id);
  };

  onSelectCourseId = (id) => {
    this.props.classActions.selectedCourseId(id);
  };

  applyFilter = () => {
    this.searchClass(this.props.search);
  };

  onSelectStatusId = (id) => {
    this.props.classActions.selectedStatusId(id);
  };

  onSelectType = (id) => {
    this.props.classActions.selectedClassType(id);
  };

  onSelectProvinceId = (id) => {
    this.props.classActions.selectedProvinceId(id);
  };

  onSelectTeacherId = (id) => {
    this.props.classActions.selectedTeacherId(id);
  };

  loadStaff = (search) => {
    this.props.staffActions.getStaff(
      false,
      1,
      search,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectEnrollStartTime = (time) => {
    this.props.classActions.selectedEnrollStartTime(time);
  };

  onSelectEnrollEndTime = (time) => {
    this.props.classActions.selectedEnrollEndTime(time);
  };

  onSelectLessonStartTime = (time) => {
    this.props.classActions.selectedLessonStartTime(time);
  };

  onSelectLessonEndTime = (time) => {
    this.props.classActions.selectedLessonEndTime(time);
  };

  onSelectStartTime = (time) => {
    this.props.classActions.selectedStartTime(time);
  };

  onSelectEndTime = (time) => {
    this.props.classActions.selectedEndTime(time);
  };

  onSelectRoomId = (room) => {
    this.props.classActions.selectedRoomId(room);
  };

  loadStatuses = () => {
    this.props.classActions.loadStatuses(
      'classes',
      this.props.token,
      this.props.domain,
    );
  };

  onSelectClassStatus = (id) => {
    this.props.classActions.selectedClassStatus(id);
  };

  render() {
    return (
      <ClassComponent
        {...this.props}
        onSelectedItem={this.onSelectedItem}
        onRefresh={this.onRefresh}
        filter={this.applyFilter}
        changeClassStatus={this.changeClassStatus}
        loadDataClass={this.loadDataClass}
        searchClass={this.searchClass}
        onSelectBaseId={this.onSelectBaseId}
        onSelectCourseId={this.onSelectCourseId}
        onSelectGenId={this.onSelectGenId}
        onSelectStatusId={this.onSelectStatusId}
        onSelectType={this.onSelectType}
        onSelectProvinceId={this.onSelectProvinceId}
        onSelectTeacherId={this.onSelectTeacherId}
        loadStaff={this.loadStaff}
        onSelectEnrollStartTime={this.onSelectEnrollStartTime}
        onSelectEnrollEndTime={this.onSelectEnrollEndTime}
        onSelectLessonStartTime={this.onSelectLessonStartTime}
        onSelectLessonEndTime={this.onSelectLessonEndTime}
        onSelectStartTime={this.onSelectStartTime}
        onSelectEndTime={this.onSelectEndTime}
        onSelectClassStatus={this.onSelectClassStatus}
        onSelectRoomId={this.onSelectRoomId}
      />
    );
  }
}

const styles = {
  name: theme.header,
  headerLeftContainer: theme.headerNavigateLeftContainer,
  headerIconContainer: theme.headerIconContainer,
};

function mapStateToProps(state) {
  return {
    classData: state.class.classData,
    isLoadingClass: state.class.isLoading,
    errorLoadingClass: state.class.error,
    token: state.login.token,
    user: state.login.user,
    selectedClassId: state.class.selectedClassId,
    selectedGenId: state.class.selectedGenId,
    courseData: state.class.courseData,
    isLoadingCourse: state.class.isLoadingCourse,
    genData: state.gen.genData,
    isLoadingGen: state.gen.isLoading,
    errorLoadingGen: state.gen.error,
    baseData: state.class.baseData,
    isLoadingBase: state.class.isLoadingBase,
    errorLoadingBase: state.class.errorLoadingBase,
    currentGen: state.gen.currentGen,
    isRefreshing: state.class.isRefreshing,
    isLoadingProvinces: state.saveRegister.isLoadingProvinces,
    errorLoadingProvinces: state.saveRegister.errorLoadingProvinces,
    provinces: state.saveRegister.provinces,
    domain: state.login.domain,
    search: state.class.search,
    currentPage: state.class.currentPage,
    totalPage: state.class.totalPage,
    selectedBaseId: state.class.selectedBaseId,
    selectedCourseId: state.class.selectedCourseId,
    provinceId: state.class.provinceId,
    courseId: state.class.courseId,
    enrollStartTime: state.class.enrollStartTime,
    enrollEndTime: state.class.enrollEndTime,
    lessonStartTime: state.class.lessonStartTime,
    lessonEndTime: state.class.lessonEndTime,
    startTime: state.class.startTime,
    endTime: state.class.endTime,
    teacherId: state.class.teacherId,
    type: state.class.type,
    status: state.class.status,
    class_status: state.class.class_status,
    staff: state.staff.staff,
    isLoadingStaff: state.staff.isLoadingStaff,
    errorStaff: state.staff.errorStaff,
    statuses: state.class.statuses,
    isLoadingStatuses: state.class.isLoadingStatuses,
    errorStatuses: state.class.errorStatuses,
    roomId: state.class.roomId,
    rooms: state.class.rooms,
    isLoadingRooms: state.class.isLoadingRooms,
    errorRooms: state.class.errorRooms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    classActions: bindActionCreators(classActions, dispatch),
    genActions: bindActionCreators(genActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
    analyticsActions: bindActionCreators(analyticsActions, dispatch),
    staffActions: bindActionCreators(staffActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);
