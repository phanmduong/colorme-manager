/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ClassComponent from '../components/ClassComponent';
import * as classActions from '../actions/classActions';
import * as drawerActions from '../actions/drawerActions';
import {Alert}from 'react-native';
import * as alert from '../constants/alert';
import {Actions} from 'react-native-router-flux';

class ClassContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectedItem = this.onSelectedItem.bind(this);
        this.popRouter = this.popRouter.bind(this);
        this.state = {
            imageCourse: ""
        }
    }

    componentWillMount(){
        this.props.classActions
            .loadDataClass(this.props.baseId, this.props.courseId, this.props.genId, this.props.token);
        this.imageCourse();
    }

    onSelectedItem(classId){
        this.props.classActions.selectedClassId(classId);
        Actions.scanQRCode();

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.error) {
            Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
        }
    }

    popRouter(){
        Actions.pop();
    }

    imageCourse(){
        this.props.course.map((course) =>{
            if (course.id === this.props.courseId) {
                return this.setState({imageCourse: course.icon_url});
            }
        })
    }

    render() {
        return (
            <ClassComponent
                classData = {this.props.classData}
                isLoading = {this.props.isLoading}
                onSelectedItem = {this.onSelectedItem}
                popRouter = {this.popRouter}
                imageCourse = {this.state.imageCourse}
                openDrawer = {this.props.drawerActions.openDrawer}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.class.isLoading,
        classData: state.class.classData,
        error: state.class.error,
        token: state.login.token,
        selectedClassId: state.class.selectedClassId,
        baseId: state.base.selectedBaseId,
        courseId: state.course.selectedCourseId,
        genId: state.gen.selectedGenId,
        course: state.course.courseData,
        drawerOpen: state.drawer.drawerOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch),
        drawerActions: bindActionCreators(drawerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);