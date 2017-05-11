/**
 * Created by phanmduong on 4/24/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ScrollView, RefreshControl}from 'react-native';
import {Text, Container, Content, Picker, Item} from 'native-base';
import ShiftRegisterComponent from '../components/ShiftRegisterComponent';
import * as baseActions from '../actions/baseActions';
import * as genActions from '../actions/genActions';
import * as shiftRegisterActions from '../actions/shiftRegisterActions';
import _ from 'lodash';

class ShiftRegisterContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.socket = this.props.socket;
        this.socket.on('colorme-channel:regis-shift', (data) => {
            console.log('register' + data);
        });
        this.socket.on('colorme-channel:remove-shift', (data) => {
            console.log('unregister' + data);
        })
        this.state = {
            isLoading: false,
            checkedDataBase: false,
            checkedDataGen: false,
            checkedDataShiftRegister: false,
            genData: []
        }
        this.onSelectBaseId = this.onSelectBaseId.bind(this);
        this.onSelectGenId = this.onSelectGenId.bind(this);
        this.loadDataShiftRegister = this.loadDataShiftRegister.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoadingBase && !nextProps.isLoadingGen) {
            this.setState({
                isLoading: false
            })
        } else {
            this.setState({
                isLoading: true
            })
        }

        if (nextProps.errorBase || nextProps.errorGen || nextProps.errorShiftRegister) {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false
            })
        }

        if (!nextProps.isLoadingGen) {
            var genData = _.sortBy(nextProps.genData, [function (o) {
                return parseInt(o.name);
            }]);
            genData = _.reverse(genData);
            this.setState({
                genData: genData
            })
        }

        this.checkData(nextProps);

    }

    checkData(props){
        if (props.baseData.length > 0 && !this.state.checkedDataBase){
            this.setState({checkedDataBase: true});
            this.props.shiftRegisterActions.selectedBaseId(props.baseData[0].id);
        }

        if (props.genData.length > 0 && !this.state.checkedDataGen){
            this.setState({checkedDataGen: true});
            var genData = _.sortBy(props.genData, [function (o) {
                return parseInt(o.name);
            }]);
            genData = _.reverse(genData);
            this.setState({
                genData: genData
            })
            this.props.shiftRegisterActions.selectedGenId(genData[0].id);
        }

        if (props.genData.length > 0 && props.baseData.length > 0 && !this.state.checkedDataShiftRegister) {
            this.setState({checkedDataShiftRegister: true});
            this.props.shiftRegisterActions
                .loadDataShiftRegister(props.baseData[0].id, props.genData[0].id, this.props.token);
        }
    }

    loadData() {
        if (!this.props.baseData || this.props.baseData.length <= 0) {
            this.props.baseActions.loadDataBase(this.props.token);
        }
        if (!this.props.genData || this.props.genData.length <= 0) {
            this.props.genActions.loadDataGen(this.props.token);
        }
        this.checkData(this.props);
    }

    loadDataShiftRegister() {
        this.props.shiftRegisterActions
            .loadDataShiftRegister(this.props.selectedBaseId, this.props.selectedGenId, this.props.token);
    }

    onSelectBaseId(baseId) {
        this.props.shiftRegisterActions.selectedBaseId(baseId);
        this.loadDataShiftRegister();
    }

    onSelectGenId(genId) {
        this.props.shiftRegisterActions.selectedGenId(genId);
        this.loadDataShiftRegister();
    }

    render() {
        return (
            <ShiftRegisterComponent
                isLoading={this.state.isLoading}
                isLoadingShiftRegister={this.props.isLoadingShiftRegister}
                error={this.state.error}
                genData={this.state.genData}
                baseData={this.props.baseData}
                shiftRegisterData={this.props.shiftRegisterData}
                selectedBaseId={this.props.selectedBaseId}
                selectedGenId={this.props.selectedGenId}
                onSelectBaseId={this.onSelectBaseId}
                onSelectGenId={this.onSelectGenId}
                loadDataShiftRegister={this.loadDataShiftRegister}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoadingBase: state.base.isLoading,
        baseData: state.base.baseData,
        errorBase: state.base.error,
        token: state.login.token,
        isLoadingGen: state.gen.isLoading,
        genData: state.gen.genData,
        errorGen: state.gen.error,
        isLoadingShiftRegister: state.shiftRegister.isLoading,
        shiftRegisterData: state.shiftRegister.shiftRegisterData,
        errorShiftRegister: state.shiftRegister.error,
        selectedBaseId: state.shiftRegister.selectedBaseId,
        selectedGenId: state.shiftRegister.selectedGenId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseActions: bindActionCreators(baseActions, dispatch),
        genActions: bindActionCreators(genActions, dispatch),
        shiftRegisterActions: bindActionCreators(shiftRegisterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftRegisterContainer);