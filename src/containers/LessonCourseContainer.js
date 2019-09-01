/**
 * Created by phanmduong on 4/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LessonCourseComponent from '../components/LessonCourseComponent';
import * as lessonCourseActions from '../actions/lessonCourseActions';
import * as drawerActions from '../actions/drawerActions';
import {Alert} from 'react-native';
import * as alert from '../constants/alert';

class LessonCourseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectedItem = this.onSelectedItem.bind(this);
    this.popRouter = this.popRouter.bind(this);
    this.state = {
      imageCourse: '',
    };
  }

  componentWillMount() {
    this.props.lessonCourseActions.loadDataLessonCourse(
      this.props.selectedCourseId,
      this.props.token,
    );
    this.imageCourse();
  }

  onSelectedItem(lessonCourseId, rowID) {
    this.props.lessonCourseActions.selectedLessonCourseId(rowID);
  }

  popRouter() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
    }
  }

  imageCourse() {
    this.props.course.map(course => {
      if (course.id === this.props.selectedCourseId) {
        return this.setState({imageCourse: course.icon_url});
      }
    });
  }

  render() {
    return (
      <LessonCourseComponent
        lessonCourseData={this.props.lessonCourseData}
        isLoading={this.props.isLoading}
        onSelectedItem={this.onSelectedItem}
        popRouter={this.popRouter}
        imageCourse={this.state.imageCourse}
        openDrawer={this.props.drawerActions.openDrawer}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.lessonCourse.isLoading,
    lessonCourseData: state.lessonCourse.lessonCourseData,
    error: state.lessonCourse.error,
    token: state.login.token,
    selectedLessonCourseId: state.lessonCourse.selectedLessonCourseId,
    selectedCourseId: state.course.selectedCourseId,
    course: state.course.courseData,
    drawerOpen: state.drawer.drawerOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    lessonCourseActions: bindActionCreators(lessonCourseActions, dispatch),
    drawerActions: bindActionCreators(drawerActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LessonCourseContainer);
