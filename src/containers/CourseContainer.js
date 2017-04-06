/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CourseComponent from '../components/CourseComponent';
import * as courseActions from '../actions/courseActions';
import {Alert}from 'react-native';
import * as alert from '../constants/alert';

class CourseContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectedItem = this.onSelectedItem.bind(this);
    }

    componentWillMount(){
        this.props.courseActions.loadDataCourse(this.props.token);
    }

    onSelectedItem(courseId){
        this.props.courseActions.selectedCourseId(courseId);
    }

    render() {
        if (this.props.error) {
            Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
        }

        return (
            <CourseComponent
                courseData = {this.props.courseData}
                isLoading = {this.props.isLoading}
                onSelectedItem = {this.onSelectedItem}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.course.isLoading,
        courseData: state.course.courseData,
        error: state.course.error,
        token: state.login.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        courseActions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);