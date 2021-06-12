import React from 'react';
import {connect} from 'react-redux';
import * as workShiftRegisterAction from '../actions/workShiftRegisterActions.js';
import WorkShiftRegisterComponent from '../components/WorkShiftRegisterComponent';
import {bindActionCreators} from 'redux';
import * as baseActions from '../actions/baseActions';

class WorkShiftRegisterContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checkedDataBase: false,
      checkedDataWorkShiftRegister: false,
    };
  }

  componentWillMount = () => {
    this.loadBaseData();
  };

  componentWillReceiveProps = (nextProps) => {
    this.checkData(nextProps);
  };

  checkData = (props) => {
    if (props.baseData.length > 0 && !this.state.checkedDataBase) {
      this.setState({checkedDataBase: true});
      this.props.workShiftRegisterAction.selectedBaseId(props.baseData[0].id);
    }

    if (props.baseData.length > 0 && !this.state.checkedDataWorkShiftRegister) {
      this.setState({checkedDataWorkShiftRegister: true});
      this.loadDataWorkShiftRegister(
        false,
        props.startTime,
        props.endTime,
        props.baseData[0].id,
      );
    }
  };

  loadBaseData = () => {
    this.props.baseActions.loadDataBase(this.props.token, this.props.domain);
  };

  loadDataWorkShiftRegister = (refreshing, startTime, endTime, baseId) => {
    this.props.workShiftRegisterAction.loadWorkShift(
      refreshing,
      startTime,
      endTime,
      baseId,
      this.props.token,
      this.props.domain,
    );
  };

  onSelectBaseId = (baseId) => {
    this.props.workShiftRegisterAction.selectedBaseId(baseId);
    this.loadDataWorkShiftRegister(
      true,
      this.props.startTime,
      this.props.endTime,
      baseId,
    );
  };

  onSelectStartTime = (time) => {
    this.props.workShiftRegisterAction.selectedStartTime(time);
  };

  onSelectEndTime = (time) => {
    this.props.workShiftRegisterAction.selectedEndTime(time);
  };

  onRegister = (shiftId) => {
    this.props.workShiftRegisterAction.register(
      shiftId,
      this.props.token,
      this.props.domain,
    );
  };

  onUnregister = (shiftId) => {
    this.props.workShiftRegisterAction.unregister(
      shiftId,
      this.props.token,
      this.props.domain,
    );
  };

  onRefresh = () => {
    this.loadDataWorkShiftRegister(
      true,
      this.props.startTime,
      this.props.endTime,
      this.props.selectedBaseId,
    );
  };

  render() {
    return (
      <WorkShiftRegisterComponent
        {...this.props}
        onSelectBaseId={this.onSelectBaseId}
        onSelectStartTime={this.onSelectStartTime}
        onSelectEndTime={this.onSelectEndTime}
        onRefresh={this.onRefresh}
        onRegister={this.onRegister}
        onUnregister={this.onUnregister}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
    isLoadingWorkShiftRegister: state.workShiftRegister.isLoading,
    workShiftRegisterData: state.workShiftRegister.workShiftRegisterData,
    baseData: state.base.baseData,
    isLoadingBases: state.base.isLoading,
    selectedBaseId: state.workShiftRegister.selectedBaseId,
    errorBase: state.base.error,
    errorWorkShiftRegister: state.workShiftRegister.error,
    user: state.login.user,
    domain: state.login.domain,
    startTime: state.workShiftRegister.startTime,
    endTime: state.workShiftRegister.endTime,
    refreshing: state.workShiftRegister.refreshing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    baseActions: bindActionCreators(baseActions, dispatch),
    workShiftRegisterAction: bindActionCreators(
      workShiftRegisterAction,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkShiftRegisterContainer);
