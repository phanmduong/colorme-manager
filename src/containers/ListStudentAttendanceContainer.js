/**
 * Created by phanmduong on 5/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listStudentAttendanceActions from '../actions/listStudentAttendanceActions';
import ListStudentAttendanceComponent from '../components/ListStudentAttendanceComponent';

class ListStudentAttendanceContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onLoad = this.onLoad.bind(this);
  }

  componentWillMount() {
    this.onLoad();
  }

  onLoad() {
    const classID = this.props.classSelected.id;
    const lessonID = this.props.classSelected.lesson.class_lesson_id;
    this.props.listStudentAttendanceActions.loadDataListStudentAttendance(
      classID,
      lessonID,
      this.props.token,
    );
  }

  render() {
    return (
      <ListStudentAttendanceComponent
        isLoading={this.props.isLoading}
        error={this.props.error}
        listStudentClass={this.props.listStudentAttendanceData}
        onLoad={this.onLoad}
      />
    );
  }
}

ListStudentAttendanceContainer.navigationOptions = {
  title: 'Danh sách học viên',
};

function mapStateToProps(state) {
  console.log(state.currentClassStudy.selectedCurrentClassStudy);
  return {
    token: state.login.token,
    classSelected: state.currentClassStudy.selectedCurrentClassStudy,
    isLoading: state.listStudentAttendance.isLoading,
    listStudentAttendanceData:
      state.listStudentAttendance.listStudentAttendanceData,
    error: state.listStudentAttendance.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    listStudentAttendanceActions: bindActionCreators(
      listStudentAttendanceActions,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentAttendanceContainer);
