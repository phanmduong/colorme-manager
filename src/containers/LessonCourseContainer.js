/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LessonCourseComponent from '../components/LessonCourseComponent';
import * as lessonCourseActions from '../actions/lessonCourseActions';
import {Alert}from 'react-native';
import * as alert from '../constants/alert';
import {Actions} from 'react-native-router-flux';

class LessonCourseContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectedItem = this.onSelectedItem.bind(this);
        this.popRouter = this.popRouter.bind(this);
    }

    componentWillMount(){
        this.props.lessonCourseActions
            .loadDataLessonCourse(this.props.selectedCourseId, this.props.token);
    }

    onSelectedItem(lessonCourseId, rowID){
        this.props.lessonCourseActions.selectedLessonCourseId(rowID);
        Actions.classCourse();
    }

    popRouter(){
        Actions.pop();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.error) {
            Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
        }
    }

    render() {
        return (
            <LessonCourseComponent
                lessonCourseData = {this.props.lessonCourseData}
                isLoading = {this.props.isLoading}
                onSelectedItem = {this.onSelectedItem}
                popRouter = {this.popRouter}
                imageCourse = {this.props.course[this.props.selectedCourseId].icon_url}
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
        course: state.course.courseData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        lessonCourseActions: bindActionCreators(lessonCourseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonCourseContainer);