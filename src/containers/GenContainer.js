/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GenComponent from '../components/GenComponent';
import * as genActions from '../actions/genActions';
import {Alert}from 'react-native';
import * as alert from '../constants/alert';
import {Actions} from 'react-native-router-flux';

class GenContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectedItem = this.onSelectedItem.bind(this);
    }

    componentWillMount(){
        this.props.genActions.loadDataGen(this.props.token);
    }

    onSelectedItem(genId){
        this.props.genActions.selectedGenId(genId);
        Actions.lessonCourse();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.error) {
            Alert.alert('Thông báo', alert.LOAD_DATA_ERROR);
        }
    }

    render() {
        return (
            <GenComponent
                genData = {this.props.genData}
                isLoading = {this.props.isLoading}
                onSelectedItem = {this.onSelectedItem}
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
        selectedGenId: state.gen.selectedGenId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        genActions: bindActionCreators(genActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GenContainer);