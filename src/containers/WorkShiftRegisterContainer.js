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
        props.startTime,
        props.endTime,
        props.baseData[0].id,
      );
    }
  };

  loadBaseData = () => {
    this.props.baseActions.loadDataBase(this.props.token, this.props.domain);
  };

  loadDataWorkShiftRegister = (startTime, endTime, baseId) => {
    this.props.workShiftRegisterAction.loadWorkShift(
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
      this.props.startTime,
      this.props.endTime,
      baseId,
    );
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

  render() {
    return (
      <WorkShiftRegisterComponent
        workShiftRegisterData={this.props.workShiftRegisterData}
        isLoadingWorkShiftRegister={this.props.isLoadingWorkShiftRegister}
        genData={this.props.genData}
        baseData={this.props.baseData}
        onSelectBaseId={this.onSelectBaseId}
        errorWorkShiftRegister={this.props.errorWorkShiftRegister}
        user={this.props.user}
        avatar_url={this.props.user.avatar_url}
        onRefresh={() =>
          this.loadDataWorkShiftRegister(
            this.props.selectedBaseId,
            this.props.selectedGenId,
          )
        }
        onRegister={this.onRegister}
        onUnregister={this.onUnregister}
        {...this.props}
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
