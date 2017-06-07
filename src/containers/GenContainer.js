/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GenComponent from '../components/GenComponent';
import * as genActions from '../actions/genActions';
import * as drawerActions from '../actions/drawerActions';
import {Alert}from 'react-native';
import * as alert from '../constants/alert';

class GenContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectedItem = this.onSelectedItem.bind(this);
        this.popRouter = this.popRouter.bind(this);
        this.state = {
            imageCourse: ""
        }
    }

    componentWillMount(){
        this.props.genActions.loadDataGen(this.props.token);
        this.imageCourse();
    }

    onSelectedItem(genId){
        this.props.genActions.selectedGenId(genId);
    }

    popRouter(){
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.error) {
            Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
        }
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
            <GenComponent
                genData = {this.props.genData}
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
        isLoading: state.gen.isLoading,
        genData: state.gen.genData,
        error: state.gen.error,
        token: state.login.token,
        selectedGenId: state.gen.selectedGenId,
        courseId: state.course.selectedCourseId,
        course: state.course.courseData,
        drawerOpen: state.drawer.drawerOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        genActions: bindActionCreators(genActions, dispatch),
        drawerActions: bindActionCreators(drawerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GenContainer);