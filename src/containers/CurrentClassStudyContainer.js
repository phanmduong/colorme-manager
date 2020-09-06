/**
 * Created by phanmduong on 4/25/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CurrentClassStudyComponent from '../components/CurrentClassStudyComponent';
import * as currentClassStudyActions from '../actions/currentClassStudyActions';
import * as classActions from '../actions/classActions';
import {NavigationActions} from 'react-navigation';
import moment from 'moment';
import * as saveRegisterActions from '../actions/saveRegisterActions';

class CurrentClassStudyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectedItem = this.onSelectedItem.bind(this);
  }

  componentWillMount() {
    this.props.classActions.loadDataCourse(this.props.token, this.props.domain);
    this.props.classActions.loadBaseData(this.props.token, this.props.domain);
    this.props.saveRegisterActions.loadProvinces(
      this.props.token,
      this.props.domain,
    );
    this.loadDataCurrentClassStudy(this.props.selectedDate);
  }

  loadDataCurrentClassStudy = (date) => {
    this.props.currentClassStudyActions.loadDataCurrentClassStudy(
      date,
      this.props.token,
      this.props.domain,
    );
  };

  componentWillUnmount = () => {
    this.onSelectDate(moment(new Date()).format('YYYY-MM-DD'));
  };

  onSelectedItem(classItem) {
    this.props.currentClassStudyActions.selectedCurrentClassStudy(classItem);
    this.props.classActions.selectedClassId(classItem.id);
    this.props.navigation.navigate('ListStudentClass');
  }

  openQrCode = (classItem) => {
    this.props.currentClassStudyActions.selectedCurrentClassStudy(classItem);
    this.props.navigation.navigate('QRCode');
  };

  openListAttendanceRegister = (classItem) => {
    this.props.currentClassStudyActions.selectedCurrentClassStudy(classItem);
    this.props.navigation.navigate('ListStudentAttendanceRegister', {
      classItem: classItem,
    });
  };

  onRefresh = () => {
    this.props.currentClassStudyActions.refreshDataCurrentClassStudy(
      this.props.selectedDate,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectDate = (date) => {
    this.props.currentClassStudyActions.onSelectDate(date);
  };

  render() {
    return (
      <CurrentClassStudyComponent
        {...this.props}
        error={this.props.error}
        classData={this.props.classData}
        isLoading={this.props.isLoading}
        onSelectedItem={this.onSelectedItem}
        openQrCode={this.openQrCode}
        onRefresh={this.onRefresh}
        avatar_url={this.props.avatar_url}
        onSelectDate={this.onSelectDate}
        loadDataCurrentClassStudy={this.loadDataCurrentClassStudy}
        courseData={this.props.courseData}
        isLoadingCourse={this.props.isLoadingCourse}
        baseData={this.props.baseData}
        isLoadingBase={this.props.isLoadingBase}
        isLoadingProvinces={this.props.isLoadingProvinces}
        provinces={this.props.provinces}
        openListAttendanceRegister={this.openListAttendanceRegister}
      />
    );
  }
}

CurrentClassStudyContainer.navigationOptions = {
  title: 'Danh sách lớp học',
};

function mapStateToProps(state) {
  return {
    isLoading: state.currentClassStudy.isLoading,
    refreshing: state.currentClassStudy.refreshing,
    classData: state.currentClassStudy.classData,
    error: state.currentClassStudy.error,
    token: state.login.token,
    avatar_url: state.login.user.avatar_url,
    selectedDate: state.currentClassStudy.selectedDate,
    courseData: state.class.courseData,
    isLoadingCourse: state.class.isLoadingCourse,
    baseData: state.class.baseData,
    isLoadingBase: state.class.isLoadingBase,
    errorLoadingBase: state.class.errorLoadingBase,
    isLoadingProvinces: state.saveRegister.isLoadingProvinces,
    errorLoadingProvinces: state.saveRegister.errorLoadingProvinces,
    provinces: state.saveRegister.provinces,
    domain: state.login.domain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currentClassStudyActions: bindActionCreators(
      currentClassStudyActions,
      dispatch,
    ),
    listStudentAttendanceScreen: () =>
      dispatch(
        NavigationActions.navigate({routeName: 'ListStudentAttendance'}),
      ),
    qrCodeScreen: () =>
      dispatch(NavigationActions.navigate({routeName: 'QRCode'})),
    classActions: bindActionCreators(classActions, dispatch),
    saveRegisterActions: bindActionCreators(saveRegisterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentClassStudyContainer);
